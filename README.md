# Playwright AI-Generated E2E Framework

## Project Overview
This repository contains an automated End-to-End (E2E) testing framework developed as part of the SDET course. 

**Target Application:** [Swag Labs (SauceDemo)](https://www.saucedemo.com/) - a standard e-commerce platform for testing UI interactions, authentication, and checkout flows.

**Tech Stack:** TypeScript, Playwright, Faker.js, GitHub Actions.

## Course Progress & Implementation Details

This framework was built iteratively, utilizing AI as a pair-programming assistant to implement the practical requirements of the course modules:

### Step 1. Setting up your framework
* Initialized a new Playwright project with strict TypeScript configurations.
* Designed a scalable Page Object Model (POM) architecture.
* Created the foundational `BasePage` class to encapsulate common Playwright actions and logging.
* Configured `playwright.config.ts` to use `data-test` attributes for robust, role-based element selection.

### Step 2. Writing the base test
* Implemented core Page Objects: `LoginPage`, `InventoryPage`, `CheckoutPage`, and `SidebarPage`.
* Developed a comprehensive suite of 12+ automated tests covering positive and negative scenarios (e.g., successful login, locked-out user, cart management, complete checkout flow).
* Utilized the "Golden Files" pattern with AI to ensure new test files maintained a consistent coding style and strict typings.

### Step 3. Refactoring and Advanced testing
* **Refactoring (DRY):** Merged repetitive cart actions into a single `manageCartItem` method. Extracted common authentication steps into an `AuthHelper` utility.
* **Dynamic Data:** Integrated `@faker-js/faker` to generate random user data (names, postal codes) for the checkout process.
* **Boundary Value Testing:** Implemented data-driven tests using parameterized loops to validate the checkout form against maximum length strings, special characters, and minimum length inputs.

### Step 4.CI/CD Pipeline Integration
* Created a GitHub Actions workflow (`.github/workflows/playwright.yml`).
* Configured the pipeline to automatically install dependencies, download browsers, and execute the full test suite on every `push` and `pull_request` to the main branch.
* Set up artifact uploads to retain Playwright HTML reports for debugging failed pipeline runs.

## Setup and Installation

```bash
npm install
npx playwright install

### Run tests
npx playwright test
npx playwright show-report