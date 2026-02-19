const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PLAN_DAYS = 30;
const PLAN_FILE = 'activity-plan-30-days.md';
const TODAY_FILE = 'today-activity-task.md';
const STATE_FILE = '.activity-plan-state.json';
const TASK_NAME = 'DailyJSActivityPlan';

const issueTracks = [
  'bug fix',
  'feature request',
  'docs improvement',
  'test coverage gap',
  'refactor target',
  'developer experience'
];

const prTracks = [
  'small feature',
  'refactor',
  'docs + examples',
  'test improvements',
  'ci/workflow update',
  'code quality cleanup'
];

const reviewTracks = [
  'naming and readability',
  'edge cases and error handling',
  'test quality and coverage',
  'security and input validation',
  'performance and complexity',
  'maintainability and structure'
];

const projectTracks = [
  'ship one small user-facing improvement',
  'reduce one recurring bug class',
  'improve setup and onboarding docs',
  'add missing tests to core flow',
  'clean up duplicated logic',
  'improve automation reliability'
];

function pad(num) {
  return String(num).padStart(2, '0');
}

function formatDateISO(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function parseDateISO(value) {
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;
  const date = new Date(year, month - 1, day);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function diffDays(a, b) {
  const ms = b.setHours(0, 0, 0, 0) - a.setHours(0, 0, 0, 0);
  return Math.floor(ms / (24 * 60 * 60 * 1000));
}

function getDayPlan(index, date) {
  const dayNumber = index + 1;
  const issueTrack = issueTracks[index % issueTracks.length];
  const prTrack = prTracks[(index + 1) % prTracks.length];
  const reviewTrack = reviewTracks[(index + 2) % reviewTracks.length];
  const projectTrack = projectTracks[(index + 3) % projectTracks.length];
  const reviewCount = index % 2 === 0 ? 2 : 1;
  const weeklyCheckpoint = dayNumber % 7 === 0;

  return {
    dayNumber,
    dateISO: formatDateISO(date),
    issueTask: `Open or update 1 issue focused on ${issueTrack}.`,
    prTask: `Open 1 PR focused on ${prTrack} (small, shippable scope).`,
    reviewTask: `Review ${reviewCount} PR(s) with focus on ${reviewTrack}.`,
    projectTask: `Project work block: ${projectTrack}.`,
    weeklyTask: weeklyCheckpoint
      ? 'Weekly checkpoint: close stale items, summarize wins, and plan next week.'
      : ''
  };
}

function generatePlan(startDate) {
  const lines = [];
  lines.push('# 30-Day GitHub Activity Plan');
  lines.push('');
  lines.push(`Start date: ${formatDateISO(startDate)}`);
  lines.push(`Duration: ${PLAN_DAYS} days`);
  lines.push('');
  lines.push('Use this plan to build meaningful activity with issues, PRs, reviews, and real project progress.');
  lines.push('');

  for (let i = 0; i < PLAN_DAYS; i++) {
    const date = addDays(startDate, i);
    const item = getDayPlan(i, date);
    lines.push(`## Day ${item.dayNumber} - ${item.dateISO}`);
    lines.push(`- [ ] ${item.issueTask}`);
    lines.push(`- [ ] ${item.prTask}`);
    lines.push(`- [ ] ${item.reviewTask}`);
    lines.push(`- [ ] ${item.projectTask}`);
    if (item.weeklyTask) {
      lines.push(`- [ ] ${item.weeklyTask}`);
    }
    lines.push('');
  }

  fs.writeFileSync(path.join(process.cwd(), PLAN_FILE), `${lines.join('\n')}\n`, 'utf8');
}

function loadState(today) {
  const statePath = path.join(process.cwd(), STATE_FILE);
  if (!fs.existsSync(statePath)) {
    const state = { startDate: formatDateISO(today) };
    fs.writeFileSync(statePath, JSON.stringify(state, null, 2), 'utf8');
    return state;
  }

  try {
    const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
    if (!state.startDate || !parseDateISO(state.startDate)) {
      throw new Error('Invalid state file');
    }
    return state;
  } catch (error) {
    const state = { startDate: formatDateISO(today) };
    fs.writeFileSync(statePath, JSON.stringify(state, null, 2), 'utf8');
    return state;
  }
}

function writeTodayTask(today) {
  const state = loadState(today);
  let start = parseDateISO(state.startDate);
  let offset = diffDays(new Date(start), new Date(today));

  if (offset < 0 || offset >= PLAN_DAYS) {
    start = new Date(today);
    state.startDate = formatDateISO(start);
    fs.writeFileSync(path.join(process.cwd(), STATE_FILE), JSON.stringify(state, null, 2), 'utf8');
    offset = 0;
  }

  generatePlan(start);

  const plan = getDayPlan(offset, today);
  const lines = [];
  lines.push(`# Today Activity Task - ${plan.dateISO}`);
  lines.push('');
  lines.push(`Day ${plan.dayNumber} of ${PLAN_DAYS}`);
  lines.push('');
  lines.push(`- [ ] ${plan.issueTask}`);
  lines.push(`- [ ] ${plan.prTask}`);
  lines.push(`- [ ] ${plan.reviewTask}`);
  lines.push(`- [ ] ${plan.projectTask}`);
  if (plan.weeklyTask) {
    lines.push(`- [ ] ${plan.weeklyTask}`);
  }
  lines.push('');
  lines.push('Suggested commands:');
  lines.push('- `git checkout -b feat/day-task`');
  lines.push('- `git add . && git commit -m "Complete today activity plan"`');
  lines.push('- `git push -u origin feat/day-task`');

  fs.writeFileSync(path.join(process.cwd(), TODAY_FILE), `${lines.join('\n')}\n`, 'utf8');
  console.log(`Updated ${TODAY_FILE} and ${PLAN_FILE}`);
}

function scheduleDailyReminder(time = '08:30') {
  if (process.platform !== 'win32') {
    throw new Error('Automatic scheduler setup in this script supports Windows only.');
  }

  if (!/^\d{2}:\d{2}$/.test(time)) {
    throw new Error('Time must be HH:MM (24-hour format), e.g. 08:30');
  }

  const scriptPath = path.join(process.cwd(), 'activity-plan.js').replace(/\\/g, '/');
  const nodePath = process.execPath.replace(/\\/g, '/');
  const taskRun = `\\"${nodePath}\\" \\"${scriptPath}\\" --today`;
  const cmd = `schtasks /Create /TN ${TASK_NAME} /SC DAILY /ST ${time} /F /TR "${taskRun}"`;
  execSync(cmd, { stdio: 'inherit' });
  console.log(`Scheduled task '${TASK_NAME}' at ${time} daily.`);
}

function run() {
  const args = process.argv.slice(2);
  const today = new Date();

  const startArgIndex = args.indexOf('--start');
  const startDate = startArgIndex >= 0 && args[startArgIndex + 1]
    ? parseDateISO(args[startArgIndex + 1])
    : today;

  if (startArgIndex >= 0 && !startDate) {
    throw new Error('Invalid start date. Use YYYY-MM-DD, e.g. --start 2026-02-19');
  }

  if (args.includes('--today')) {
    writeTodayTask(today);
    return;
  }

  if (args.includes('--schedule')) {
    const timeArgIndex = args.indexOf('--time');
    const time = timeArgIndex >= 0 && args[timeArgIndex + 1] ? args[timeArgIndex + 1] : '08:30';
    scheduleDailyReminder(time);
    return;
  }

  generatePlan(startDate);
  console.log(`Generated ${PLAN_FILE}`);
  console.log('Optional: run `node activity-plan.js --schedule --time 08:30` for daily reminders (Windows).');
}

run();
