const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

// Helper function to execute commands
function runCommand(command, cwd) {
  try {
    console.log(`${colors.yellow}Running: ${command}${colors.reset}`);
    execSync(command, { cwd, stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`${colors.red}Failed to execute: ${command}${colors.reset}`);
    return false;
  }
}

// Create downloads directory if it doesn't exist
function createDownloadsDir() {
  const downloadsDir = path.join(__dirname, 'backend', 'downloads');
  if (!fs.existsSync(downloadsDir)) {
    console.log(`${colors.yellow}Creating downloads directory...${colors.reset}`);
    fs.mkdirSync(downloadsDir, { recursive: true });
  }
}

// Main setup function
async function setup() {
  console.log(`${colors.bright}${colors.cyan}=== Setting up TikDown ====${colors.reset}\n`);
  
  // Install frontend dependencies
  console.log(`${colors.bright}${colors.cyan}Installing frontend dependencies...${colors.reset}`);
  if (!runCommand('npm install', path.join(__dirname, 'frontend'))) {
    console.error(`${colors.red}Failed to install frontend dependencies.${colors.reset}`);
    return;
  }
  
  // Install backend dependencies
  console.log(`\n${colors.bright}${colors.cyan}Installing backend dependencies...${colors.reset}`);
  if (!runCommand('npm install', path.join(__dirname, 'backend'))) {
    console.error(`${colors.red}Failed to install backend dependencies.${colors.reset}`);
    return;
  }
  
  // Create downloads directory
  createDownloadsDir();
  
  // Install Python dependencies
  console.log(`\n${colors.bright}${colors.cyan}Setting up Python dependencies...${colors.reset}`);
  runCommand('python scripts/setup.py', path.join(__dirname, 'backend'));
  
  console.log(`\n${colors.bright}${colors.green}Setup completed successfully!${colors.reset}`);
  console.log(`\n${colors.bright}${colors.cyan}To start the application:${colors.reset}`);
  console.log(`${colors.yellow}1. Start the backend: ${colors.reset}cd backend && npm run dev`);
  console.log(`${colors.yellow}2. Start the frontend: ${colors.reset}cd frontend && npm start`);
}

// Run setup
setup().catch(error => {
  console.error(`${colors.red}Setup failed: ${error}${colors.reset}`);
});