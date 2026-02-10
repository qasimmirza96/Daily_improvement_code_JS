const fs = require('fs');
const readline = require('readline');
const { execSync } = require('child_process');
const path = require('path');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  red: '\x1b[31m'
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function setup() {
  log('\n🚀 Welcome to Daily JS Learning Automation Setup!\n', 'bright');
  log('This script will configure the automation for YOUR OWN repository.\n', 'cyan');
  
  log('⚠️  IMPORTANT: This will create a fresh repository with NO previous history.', 'yellow');
  log('All commits will be in YOUR name and go to YOUR GitHub repository.\n', 'yellow');
  
  const confirm = await question(`${colors.blue}Do you want to continue? (y/n): ${colors.reset}`);
  if (confirm.toLowerCase() !== 'y') {
    log('\n👋 Setup cancelled.\n', 'cyan');
    rl.close();
    return;
  }
  
  // Get GitHub repository URL
  log('\n📦 First, create a NEW empty repository on GitHub.', 'cyan');
  const repoUrl = await question(`${colors.blue}Enter your NEW GitHub repository URL (e.g., https://github.com/username/my-daily-js.git): ${colors.reset}`);
  
  // Get local path
  const currentPath = process.cwd();
  log(`\n📁 Current directory: ${currentPath}`, 'yellow');
  const useCurrentPath = await question(`${colors.blue}Use this directory? (y/n): ${colors.reset}`);
  
  let repoPath;
  if (useCurrentPath.toLowerCase() === 'y') {
    repoPath = currentPath;
  } else {
    repoPath = await question(`${colors.blue}Enter the full path where you want to store the repository: ${colors.reset}`);
  }
  
  // Get Git user info
  log('\n👤 Git Configuration:', 'magenta');
  const gitName = await question(`${colors.blue}Enter your Git username: ${colors.reset}`);
  const gitEmail = await question(`${colors.blue}Enter your Git email: ${colors.reset}`);
  
  log('\n⚙️  Setting up your automation...\n', 'cyan');
  
  // Remove old git history and start fresh
  try {
    log('🗑️  Removing old git history...', 'yellow');
    const gitDir = path.join(repoPath, '.git');
    if (fs.existsSync(gitDir)) {
      fs.rmSync(gitDir, { recursive: true, force: true });
    }
    log('✅ Old history removed', 'green');
  } catch (error) {
    log('⚠️  Could not remove old history: ' + error.message, 'yellow');
  }
  
  // Initialize new git repository
  try {
    execSync('git init', { cwd: repoPath });
    log('✅ Initialized new Git repository', 'green');
  } catch (error) {
    log('❌ Failed to initialize Git repository', 'red');
    rl.close();
    return;
  }
  
  // Configure Git
  try {
    execSync(`git config user.name "${gitName}"`, { cwd: repoPath });
    execSync(`git config user.email "${gitEmail}"`, { cwd: repoPath });
    log('✅ Configured Git user information', 'green');
  } catch (error) {
    log('⚠️  Git configuration failed', 'yellow');
  }
  
  // Add remote
  try {
    execSync(`git remote add origin ${repoUrl}`, { cwd: repoPath });
    log('✅ Added Git remote URL', 'green');
  } catch (error) {
    log('⚠️  Could not add remote URL', 'yellow');
  }
  
  // Update daily-automation.js
  const automationPath = path.join(repoPath, 'daily-automation.js');
  let automationContent = fs.readFileSync(automationPath, 'utf8');
  automationContent = automationContent.replace(
    /const repoPath = '.*';/,
    `const repoPath = '${repoPath.replace(/\\/g, '\\\\')}';`
  );
  fs.writeFileSync(automationPath, automationContent);
  log('✅ Updated daily-automation.js with your path', 'green');
  
  // Create initial commit
  try {
    execSync('git add .', { cwd: repoPath });
    execSync('git commit -m "Initial commit: Daily JS Learning Automation"', { cwd: repoPath });
    log('✅ Created initial commit', 'green');
  } catch (error) {
    log('⚠️  Could not create initial commit', 'yellow');
  }
  
  // Push to GitHub
  try {
    log('\n📤 Pushing to GitHub...', 'cyan');
    execSync('git branch -M main', { cwd: repoPath });
    execSync('git push -u origin main', { cwd: repoPath });
    log('✅ Pushed to GitHub', 'green');
  } catch (error) {
    log('⚠️  Could not push to GitHub. You may need to do this manually: git push -u origin main', 'yellow');
  }
  
  // Create batch file for Windows
  if (process.platform === 'win32') {
    const batchPath = path.join(require('os').homedir(), 'run-daily-js.bat');
    const batchContent = `@echo off\ncd /d "${repoPath}"\nnode daily-automation.js\npause`;
    fs.writeFileSync(batchPath, batchContent);
    log(`✅ Created batch file at: ${batchPath}`, 'green');
  }
  
  log('\n🎉 Setup Complete!\n', 'bright');
  log('📋 What happened:', 'cyan');
  log('✅ Removed old commit history', 'green');
  log('✅ Created fresh Git repository in YOUR name', 'green');
  log('✅ Connected to YOUR GitHub repository', 'green');
  log('✅ Made initial commit', 'green');
  log('\n📋 Next Steps:', 'cyan');
  log('1. Run the automation: node daily-automation.js', 'reset');
  log('2. Check YOUR GitHub repository for the commits', 'reset');
  if (process.platform === 'win32') {
    log(`3. Run from anywhere: ${path.join(require('os').homedir(), 'run-daily-js.bat')}`, 'reset');
  }
  log('\n💡 Tip: The automation creates commits with JavaScript learning topics in YOUR name.\n', 'yellow');
  
  const runNow = await question(`${colors.blue}Would you like to run the automation now? (y/n): ${colors.reset}`);
  if (runNow.toLowerCase() === 'y') {
    log('\n🚀 Running automation...\n', 'green');
    rl.close();
    require('./daily-automation.js');
  } else {
    log('\n👋 Setup complete! Run "node daily-automation.js" when ready.\n', 'cyan');
    rl.close();
  }
}

setup().catch(error => {
  log('❌ Setup failed: ' + error.message, 'red');
  rl.close();
  process.exit(1);
});