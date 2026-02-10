const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  bright: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function setupDailySchedule() {
  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  log('⏰ Daily JS Learning - Schedule Setup', 'bright');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');
  
  const repoPath = process.cwd();
  const scriptPath = path.join(repoPath, 'daily-automation.js');
  const batchPath = path.join(repoPath, 'run-daily-scheduled.bat');
  
  // Check if script exists
  if (!fs.existsSync(scriptPath)) {
    log('❌ Error: daily-automation.js not found', 'red');
    log('Please run this from the repository directory.\n', 'yellow');
    process.exit(1);
  }
  
  log('📋 Setting up daily automation...\n', 'cyan');
  
  // Create batch file for scheduled task
  const batchContent = `@echo off
cd /d "${repoPath}"
node daily-automation.js >> daily-log.txt 2>&1`;
  
  fs.writeFileSync(batchPath, batchContent);
  log('✅ Created batch file for scheduled task', 'green');
  
  // Create Windows Task Scheduler task
  try {
    const taskName = 'DailyJSLearning';
    const time = '09:00'; // 9 AM daily
    
    // Delete existing task if it exists
    try {
      execSync(`schtasks /Delete /TN "${taskName}" /F`, { stdio: 'ignore' });
    } catch (e) {
      // Task doesn't exist, that's fine
    }
    
    // Create new scheduled task
    const createTaskCmd = `schtasks /Create /TN "${taskName}" /TR "\\"${batchPath}\\"" /SC DAILY /ST ${time} /F`;
    execSync(createTaskCmd);
    
    log('✅ Created Windows scheduled task', 'green');
    log(`   Task Name: ${taskName}`, 'blue');
    log(`   Schedule: Daily at ${time}`, 'blue');
    log(`   Script: ${batchPath}`, 'blue');
    
  } catch (error) {
    log('❌ Failed to create scheduled task', 'red');
    log('\nManual setup instructions:', 'yellow');
    log('1. Open Task Scheduler (taskschd.msc)', 'reset');
    log('2. Create Basic Task', 'reset');
    log('3. Name: DailyJSLearning', 'reset');
    log('4. Trigger: Daily at 9:00 AM', 'reset');
    log(`5. Action: Start a program - ${batchPath}`, 'reset');
    process.exit(1);
  }
  
  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  log('🎉 Daily automation is now scheduled!', 'green');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');
  
  log('📋 What happens next:', 'cyan');
  log('✅ Script will run automatically every day at 9:00 AM', 'green');
  log('✅ Creates 50 commits with JavaScript topics', 'green');
  log('✅ Pushes to your GitHub repository', 'green');
  log('✅ Logs saved to daily-log.txt', 'green');
  
  log('\n💡 Useful commands:', 'yellow');
  log('View scheduled tasks: schtasks /Query /TN DailyJSLearning', 'blue');
  log('Run task now: schtasks /Run /TN DailyJSLearning', 'blue');
  log('Delete task: schtasks /Delete /TN DailyJSLearning /F', 'blue');
  log('View logs: type daily-log.txt', 'blue');
  
  log('\n👋 Setup complete! Your daily commits will run automatically.\n', 'cyan');
}

setupDailySchedule();