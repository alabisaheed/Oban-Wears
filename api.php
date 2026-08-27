<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Admin-Email, X-Admin-Password");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

define('DATA_DIR', __DIR__ . '/data/');
define('UPLOAD_DIR', __DIR__ . '/assets/uploads/');

if (!is_dir(DATA_DIR)) {
    mkdir(DATA_DIR, 0755, true);
}
if (!is_dir(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0755, true);
}

// Initialize SQLite database connection
try {
    $db = new PDO("sqlite:" . DATA_DIR . "oban.db");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Enable Write-Ahead Logging for maximum concurrency performance
    $db->exec("PRAGMA journal_mode=WAL");
    
    // Create the schema
    $db->exec("CREATE TABLE IF NOT EXISTS oban_store (
        key_name TEXT PRIMARY KEY,
        json_data TEXT,
        version_tag TEXT
    )");
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
    exit;
}

// Map key to filename (kept for compatibility validation)
$allowedKeys = [
    'oban-products',
    'oban-orders',
    'oban-blog-articles',
    'oban-staff-members',
    'oban-staff-passwords',
    'oban-vendors',
    'oban-purchase-orders',
    'oban-bills',
    'oban-payments',
    'oban-subscribers',
    'oban-version'
];

// Helper: Check admin credentials
function isAdminAuthenticated($db) {
    $email = $_SERVER['HTTP_X_ADMIN_EMAIL'] ?? '';
    $password = $_SERVER['HTTP_X_ADMIN_PASSWORD'] ?? '';
    if (empty($email) || empty($password)) {
        return false;
    }
    
    try {
        $stmt = $db->prepare("SELECT json_data FROM oban_store WHERE key_name = 'oban-staff-passwords'");
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$row) {
            // Fallback: If no passwords record exists yet, allow initial admin creation
            return $email === 'admin@obanwears.com' && $password === 'ObanAdmin2026';
        }
        $passwords = json_decode($row['json_data'], true);
        if (!is_array($passwords)) {
            return false;
        }
        return isset($passwords[$email]) && $passwords[$email] === $password;
    } catch (PDOException $e) {
        return false;
    }
}

// Handle Image Upload Action
$action = $_GET['action'] ?? '';
if ($action === 'upload') {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
        exit;
    }
    if (!isAdminAuthenticated($db)) {
        http_response_code(401);
        echo json_encode(["error" => "Unauthorized access"]);
        exit;
    }
    
    $input = json_decode(file_get_contents('php://input'), true);
    $base64Data = $input['image'] ?? '';
    if (empty($base64Data)) {
        http_response_code(400);
        echo json_encode(["error" => "Missing image data"]);
        exit;
    }
    
    $parts = explode(',', $base64Data);
    $data = base64_decode($parts[count($parts) - 1]);
    if ($data === false) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid base64 data"]);
        exit;
    }
    
    $ext = 'jpg';
    if (strpos($parts[0], 'image/png') !== false) {
        $ext = 'png';
    } elseif (strpos($parts[0], 'image/webp') !== false) {
        $ext = 'webp';
    }
    
    $filename = 'img_' . uniqid() . '_' . time() . '.' . $ext;
    $targetPath = UPLOAD_DIR . $filename;
    
    if (file_put_contents($targetPath, $data) !== false) {
        chmod($targetPath, 0644);
        echo json_encode([
            "success" => true,
            "url" => "assets/uploads/" . $filename
        ]);
        exit;
    }
    
    http_response_code(500);
    echo json_encode(["error" => "Failed to save image"]);
    exit;
}

// Handle standard database CRUD keys
$key = $_GET['key'] ?? '';
if (!in_array($key, $allowedKeys)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid or missing key"]);
    exit;
}

// Authentication rules for standard keys
$requiresAuth = false;
$isWrite = $_SERVER['REQUEST_METHOD'] === 'POST';

if ($key === 'oban-staff-members' || $key === 'oban-staff-passwords' || $key === 'oban-vendors' || $key === 'oban-purchase-orders' || $key === 'oban-bills' || $key === 'oban-payments') {
    $requiresAuth = true;
} elseif ($key === 'oban-orders') {
    $requiresAuth = !$isWrite; // public checkout write, admin read
} elseif ($key === 'oban-products' || $key === 'oban-blog-articles') {
    $requiresAuth = $isWrite; // public read, admin write
} elseif ($key === 'oban-subscribers') {
    $requiresAuth = !$isWrite; // public join write, admin read
}

if ($requiresAuth && !isAdminAuthenticated($db)) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized access"]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($key === 'oban-version') {
        try {
            $stmt = $db->query("SELECT key_name, version_tag FROM oban_store");
            $versions = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $versions[$row['key_name']] = $row['version_tag'];
            }
            echo json_encode($versions);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Query failed: " . $e->getMessage()]);
        }
        exit;
    }
    
    try {
        $stmt = $db->prepare("SELECT json_data FROM oban_store WHERE key_name = ?");
        $stmt->execute([$key]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$row) {
            echo json_encode(null);
        } else {
            echo $row['json_data'];
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Query failed: " . $e->getMessage()]);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    json_decode($input);
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid JSON payload"]);
        exit;
    }
    
    try {
        $db->beginTransaction();
        
        $newVersion = time() . '_' . rand(1000, 9999);
        
        // Save the key value with atomic database locks
        $stmt = $db->prepare("REPLACE INTO oban_store (key_name, json_data, version_tag) VALUES (?, ?, ?)");
        $stmt->execute([$key, $input, $newVersion]);
        
        // Also update the version_tag of oban-version itself to invalidate cache on clients
        if ($key !== 'oban-version') {
            $stmtVer = $db->prepare("REPLACE INTO oban_store (key_name, json_data, version_tag) VALUES ('oban-version', '{}', ?)");
            $stmtVer->execute([$newVersion]);
        }
        
        $db->commit();
        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        if ($db->inTransaction()) {
            $db->rollBack();
        }
        http_response_code(500);
        echo json_encode(["error" => "Save failed: " . $e->getMessage()]);
    }
    exit;
}
