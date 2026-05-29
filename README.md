# 🚀 Playwright End-to-End Automation Framework

## 📖 Overview
This repository contains a scalable End-to-End (E2E) UI Automation Framework built using **Playwright**, **JavaScript**, and **Cucumber (BDD)**. It is designed to test modern web applications across multiple browsers with high speed and reliability.

The framework adheres to industry best practices, including the **Page Object Model (POM)** design pattern, comprehensive **Allure & HTML Reporting**, state management for login bypass, and seamless integration with **Jenkins** and **GitHub** for CI/CD pipelines.

---

## ✨ Key Features
* **Page Object Model (POM):** Clean separation of UI locators, actions, and test assertions to maximize reusability and minimize maintenance.
* **Behavior-Driven Development (BDD):** Integration with Cucumber to write tests in plain English (`.feature` files) using Gherkin syntax.
* **Advanced Reporting:** Generates both native Cucumber HTML reports (`cucumber-format.html`) and rich, interactive **Allure Reports** with screenshots and traces attached on failure.
* **Session Management:** Utilizes Playwright's `state.json` to save authentication states, bypassing repetitive login screens to drastically speed up execution.
* **Cross-Browser Testing:** Configured (`playwright.config.js`) to run seamlessly across Chromium, Firefox, WebKit, and mobile emulators.
* **CI/CD Ready:** Fully structured for automated execution via Jenkins and GitHub integrations.

---

## 🗂️ Project Architecture

```text
├── .github/
│   └── workflows/           # GitHub Actions pipeline configurations
├── features/                # Cucumber Gherkin feature files (*.feature)
├── Pageobjects/             # Page Object Model (POM) classes (e.g., POM1_LoginPage.js)
├── Step_definitions/        # Cucumber step definition mappings (steps.js)
├── Support/                 # Cucumber hooks for setup/teardown (hooks.js)
├── tests/                   # Vanilla Playwright test scripts (*.spec.js)
├── test-results/            # Auto-generated artifacts (screenshots, traces, videos)
├── allure-results/          # Raw JSON data generated for Allure reports
├── cucumber-format.html     # Auto-generated Cucumber HTML report
├── package.json             # Project metadata, dependencies, and execution scripts
├── playwright.config.js     # Primary Playwright configuration file
└── state.json               # Saved browser storage state for Auth bypass
```

## 🛠️ Setup & Installation

1. Clone the repository
```bash
git clone https://github.com/Abhishek-Githu-home/Playwright_Project.git
```

2. Install Node Dependencies:
```bash
npm install
```
3. Install Playwright Browsers:Bash
```bash

npx playwright install --with-deps
```


**🏃‍♂️ Test Execution Commands:**
```bash
This framework uses custom NPM scripts (defined in package.json) to streamline execution across different environments.
Running Playwright Tests (tests/ directory)

npx playwright test  ##Runs all standard .spec.js tests headlessly.
npx playwright test --headed  ##Runs tests with the browser UI visible.
npx playwright test --project="chromium" ##Runs tests specifically on Google Chrome / Chromium.


```
**Running Cucumber BDD Tests (features/ directory):**
```bash


npm run test-regression ##Runs scenarios tagged with @Regression and generates the HTML report.
npx cucumber-js --tags "@Smoke" ##Runs specific tags manually.
```
**🧩 Page Object Model (POM) Implementation:**
```bash

This framework abstracts UI interaction into dedicated classes found in the Pageobjects/ folder.
Example 
Workflow:
Locators & Actions: 
Defined inside POM_LoginPage.js (e.g., this.username = page.locator('#user')).

Step Definitions: The Cucumber steps.js file instantiates the POM class and calls its methods (e.g., await loginPage.enterCredentials()).
Assertions: Handled cleanly after the POM performs the necessary UI actions.
```
📊 **Report Generation:**
```bash

The framework is configured to generate two types of reports:
1. Cucumber HTML ReportGenerated automatically after running the Cucumber suite. It creates a lightweight, easily shareable file in the root directory.
   File: cucumber-format.html
2. Allure Reports (Deep Analytics)Allure provides historical data, pie charts, and attached failure screenshots.


#Step 1: Run the tests (generates raw data in /allure-results)
npm run test-allure 

# Step 2: Generate the HTML report
npx allure generate ./allure-results --clean

# Step 3: Open the interactive report in your browser
npx allure open ./allure-report
```

⚙️ **CI/CD Integration:**
```bash
Jenkins Implementation
This project is built to execute seamlessly on Jenkins via a declarative pipeline (Jenkinsfile) or Freestyle project.
Prerequisites: Jenkins server with the NodeJS Plugin installed.
Execution Steps configured in Jenkins:  Checkout from GitHub.Execute Windows Batch / Shell 
command: npm install && npx playwright install
Execute tests: npm run test-regression
Post-Build Actions: Jenkins automatically publishes the Allure Report using the Jenkins Allure Plugin.
```
**GitHub Integration:**
```bash
Version Control: All code is pushed to feature branches, reviewed via Pull Requests (PRs), and merged into main.
GitHub Actions: (If configured in .github/workflows) Tests can automatically trigger on every PR or push to the main branch to ensure code health before merging.
Gists: Reusable configurations (like custom hooks or Playwright utilities) can be backed up as GitHub Gists for team sharing.
```
