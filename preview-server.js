// Simple local HTTP server for Oban Wears preview
// Serves static files from the current directory
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5050;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png':  'image/png',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.webp': 'image/webp',
  '.ico':  'image/x-icon',
  '.heic': 'image/heic',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.mp4':  'video/mp4',
  '.csv':  'text/csv',
};

const server = http.createServer((req, res) => {
  // Decode URL and strip query string
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  
  // Default to index.html
  if (urlPath === '/' || urlPath === '') urlPath = '/index.html';

  const filePath = path.join(ROOT, urlPath);

  // Security: prevent directory traversal
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      // Try appending .html
      const htmlPath = filePath + '.html';
      fs.stat(htmlPath, (err2, stat2) => {
        if (err2 || !stat2.isFile()) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('<h2>404 - File not found</h2><p>' + urlPath + '</p>');
        } else {
          serveFile(htmlPath, res);
        }
      });
      return;
    }
    serveFile(filePath, res);
  });
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME[ext] || 'application/octet-stream';
  const stream = fs.createReadStream(filePath);
  res.writeHead(200, { 'Content-Type': mime });
  stream.pipe(res);
  stream.on('error', () => {
    res.writeHead(500);
    res.end('Server error');
  });
}

server.listen(PORT, () => {
  console.log('======================================================');
  console.log('  Oban Wears Preview Server is RUNNING');
  console.log('======================================================');
  console.log('');
  console.log('  Website:        http://localhost:' + PORT);
  console.log('  Shop:           http://localhost:' + PORT + '/shop.html');
  console.log('  Admin:          http://localhost:' + PORT + '/admin.html');
  console.log('');
  console.log('  Press Ctrl+C to stop the server.');
  console.log('======================================================');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error('Port ' + PORT + ' is already in use. Close the other process and try again.');
  } else {
    console.error('Server error:', err.message);
  }
  process.exit(1);
});
