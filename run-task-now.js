const { execSync } = require('child_process');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

log('\n🚀 Running scheduled task now...\n', 'cyan');

try {
  execSync('schtasks /Run /TN DailyJSLearning', { stdio: 'inherit' });
  log('\n✅ Task started successfully!', 'green');
  log('💡 Check daily-log.txt for output: node check-status.js\n', 'yellow');
} catch (error) {
  log('\n❌ Failed to run task', 'red');
  log('Make sure the task is set up: node setup-schedule.js\n', 'yellow');
}