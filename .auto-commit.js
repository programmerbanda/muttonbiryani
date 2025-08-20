const fs = require("fs");
const { execSync } = require("child_process");

const FILE_NAME = "log.txt"; // File to write to
const INTERVAL = 2 * 60 * 1000; // 2 minutes

function writeToFile() {
  const now = new Date().toISOString();
  const message = `Automated update at ${now}\n`;
  fs.appendFileSync(FILE_NAME, message);
  console.log(`📄 Wrote to ${FILE_NAME}: ${message.trim()}`);
}

function commitAndPush() {
  try {
    execSync("git add .");
    const commitMsg = `Auto commit at ${new Date().toISOString()}`;
    execSync(`git commit -m "${commitMsg}"`);
    execSync("git push origin main"); // Change "main" if your branch is different
    console.log("🚀 Changes pushed to GitHub\n");
  } catch (err) {
    console.error("❌ Git push failed:", err.message);
  }
}

function startAutomation() {
  console.log("🔁 Starting Git auto-push every 2 minutes...\n");
  writeToFile();
  commitAndPush();

  setInterval(() => {
    writeToFile();
    commitAndPush();
  }, INTERVAL);
}

startAutomation();
