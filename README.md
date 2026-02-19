# Daily JS Learning Automation

This repository automates daily JavaScript activity by appending topic comments to `daily-log.txt`, creating commits, and pushing to GitHub.

## Core Scripts
- `setup-fresh.js`: Fresh setup for a new repository (new history).
- `setup-dev.js`: Setup while keeping existing history.
- `daily-automation.js`: Main automation runner.
- `setup-schedule.js`: Configure Windows Task Scheduler for daily runs.
- `setup-git-alias.js`: Configure `git today` alias.
- `run-task-now.js`: Run automation immediately.
- `check-status.js`: Check scheduled task and log status.
- `activity-plan.js`: Generate a 30-day issue/PR/review plan and optional daily reminder schedule.

## Quick Start
```bash
git clone https://github.com/qasimmirza96/Daily_improvement_code_JS.git
cd Daily_improvement_code_JS
node setup-fresh.js
```

## Daily Usage
```bash
# default commit count
node daily-automation.js

# custom count
node daily-automation.js 10

# git alias (after setup)
git today
git today 10
```

## 30-Day Activity Planner
```bash
# generate full plan
node activity-plan.js

# generate today task file
node activity-plan.js --today

# windows: schedule daily planner reminder
node activity-plan.js --schedule --time 08:30
```

## Notes
- Automation appends entries only to `daily-log.txt`.
- It does not generate new `day*.js` files.
- Ensure Git credentials and remote are configured before first push.