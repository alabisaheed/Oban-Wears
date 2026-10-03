// Loads KEY=value lines from .env.local into process.env (local scripts only).
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(file)) {
  fs.readFileSync(file, "utf8").split(/\r?\n/).forEach((line) => {
    const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
    if (!match || process.env[match[1]] !== undefined) return;
    let value = match[2];
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    process.env[match[1]] = value;
  });
}
