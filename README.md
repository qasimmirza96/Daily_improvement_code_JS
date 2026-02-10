# Daily JS Learning

This repository is a simple daily JavaScript learning log. Each run creates
small, single-topic files and commits them to build a consistent practice
habit over time.

## What this project does

- Generates 10 daily JavaScript topic files
- Creates 10 separate Git commits for each topic
- Pushes each commit individually to GitHub
- Keeps a history of small, focused learning notes

## Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/qasimmirza96/Daily_improvement_code_JS.git
cd Daily_improvement_code_JS
```

### 2. Run the setup script
```bash
node setup-dev.js
```

The interactive setup will ask for:
- Your GitHub repository URL
- Local repository path
- Git username and email

### 3. Run the automation
```bash
node daily-automation.js
```

Or use the git alias:
```bash
git today
```

## How it works

The automation script creates 10 files with unique timestamps:

```
day20251231_1_172429.js
day20251231_2_172430.js
...
day20251231_10_172438.js
```

Each file contains a different JavaScript learning concept:
- Hoisting
- Event Loop
- Closures
- Prototypes
- Promises
- Arrow Functions
- Destructuring
- Template Literals
- Spread Operator
- Async/Await

## Features

✅ 10 separate commits per run
✅ Each commit pushed individually
✅ Detailed terminal logging
✅ Can run from anywhere on your system
✅ GitHub Actions for automatic daily runs

## Setup for Other Developers

See [SETUP.md](SETUP.md) for detailed setup instructions.

## Run Options

**From project directory:**
```bash
node daily-automation.js
```

**Using git alias (from anywhere):**
```bash
git today          # Creates 50 commits (default)
git today 10       # Creates 10 commits
git today 100      # Creates 100 commits
```

**From anywhere (Windows):**
```bash
c:\Users\User\run-daily-js.bat
```

**GitHub Actions:**
- Runs automatically at 9 AM UTC daily
- Manual trigger: Actions tab → Run workflow

## Purpose

This project is meant to encourage consistent, incremental JavaScript
learning through small daily commits.

