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
  const xmlPath = path.join(repoPath, 'daily-task.xml');
  
  if (!fs.existsSync(scriptPath)) {
    log('❌ Error: daily-automation.js not found', 'red');
    log('Please run this from the repository directory.\n', 'yellow');
    process.exit(1);
  }
  
  log('📋 Setting up daily automation...\n', 'cyan');
  
  const batchContent = `@echo off
cd /d "${repoPath}"
node daily-automation.js >> daily-log.txt 2>&1`;
  
  fs.writeFileSync(batchPath, batchContent);
  log('✅ Created batch file for scheduled task', 'green');
  
  const taskXml = `<?xml version="1.0" encoding="UTF-16"?>
<Task version="1.2" xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task">
  <RegistrationInfo>
    <Description>Daily JavaScript Learning Automation - Creates commits daily</Description>
  </RegistrationInfo>
  <Triggers>
    <CalendarTrigger>
      <StartBoundary>2024-01-01T09:00:00</StartBoundary>
      <Enabled>true</Enabled>
      <ScheduleByDay>
        <DaysInterval>1</DaysInterval>
      </ScheduleByDay>
    </CalendarTrigger>
  </Triggers>
  <Principals>
    <Principal>
      <LogonType>InteractiveToken</LogonType>
      <RunLevel>LeastPrivilege</RunLevel>
    </Principal>
  </Principals>
  <Settings>
    <MultipleInstancesPolicy>IgnoreNew</MultipleInstancesPolicy>
    <DisallowStartIfOnBatteries>false</DisallowStartIfOnBatteries>
    <StopIfGoingOnBatteries>false</StopIfGoingOnBatteries>
    <AllowHardTerminate>true</AllowHardTerminate>
    <StartWhenAvailable>true</StartWhenAvailable>
    <RunOnlyIfNetworkAvailable>true</RunOnlyIfNetworkAvailable>
    <IdleSettings>
      <StopOnIdleEnd>false</StopOnIdleEnd>
      <RestartOnIdle>false</RestartOnIdle>
    </IdleSettings>
    <AllowStartOnDemand>true</AllowStartOnDemand>
    <Enabled>true</Enabled>
    <Hidden>false</Hidden>
    <RunOnlyIfIdle>false</RunOnlyIfIdle>
    <WakeToRun>false</WakeToRun>
    <ExecutionTimeLimit>PT2H</ExecutionTimeLimit>
    <Priority>7</Priority>
  </Settings>
  <Actions>
    <Exec>
      <Command>${batchPath.replace(/\\/g, '\\\\')}</Command>
    </Exec>
  </Actions>
</Task>`;
  
  fs.writeFileSync(xmlPath, taskXml);
  
  try {
    const taskName = 'DailyJSLearning';
    
    try {
      execSync(`schtasks /Delete /TN "${taskName}" /F`, { stdio: 'ignore' });
    } catch (e) {}
    
    execSync(`schtasks /Create /TN "${taskName}" /XML "${xmlPath}" /F`);
    
    log('✅ Created Windows scheduled task', 'green');
    log(`   Task Name: ${taskName}`, 'blue');
    log(`   Schedule: Daily at 09:00 AM`, 'blue');
    log(`   Script: ${batchPath}`, 'blue');
    log(`   ⚡ Runs missed tasks when computer starts`, 'yellow');
    
  } catch (error) {
    log('❌ Failed to create scheduled task', 'red');
    log('\nManual setup instructions:', 'yellow');
    log('1. Open Task Scheduler (taskschd.msc)', 'reset');
    log('2. Create Basic Task', 'reset');
    log('3. Name: DailyJSLearning', 'reset');
    log('4. Trigger: Daily at 9:00 AM', 'reset');
    log(`5. Action: Start a program - ${batchPath}`, 'reset');
    log('6. Settings: Check "Run task as soon as possible after a scheduled start is missed"', 'reset');
    process.exit(1);
  }
  
  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  log('🎉 Daily automation is now scheduled!', 'green');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');
  
  log('📋 What happens next:', 'cyan');
  log('✅ Script runs automatically every day at 9:00 AM', 'green');
  log('✅ If computer is off, runs when you turn it on', 'green');
  log('✅ Creates 50 commits with JavaScript topics', 'green');
  log('✅ Pushes to your GitHub repository', 'green');
  log('✅ Logs saved to daily-log.txt', 'green');
  
  log('\n💡 Useful commands:', 'yellow');
  log('View scheduled tasks: schtasks /Query /TN DailyJSLearning /V', 'blue');
  log('Run task now: schtasks /Run /TN DailyJSLearning', 'blue');
  log('Delete task: schtasks /Delete /TN DailyJSLearning /F', 'blue');
  log('View logs: type daily-log.txt', 'blue');
  
  log('\n👋 Setup complete! Your daily commits will run automatically.\n', 'cyan');
}

setupDailySchedule();