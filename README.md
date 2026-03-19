# QA Task: Cypress Automation - Knihy Dobrovský

This repository contains automated E2E tests for the Knihy Dobrovský e-shop.

## Assignment Context

The goal of the task was to simulate a real-world scenario where a backend update has been deployed (e.g., framework upgrade for security reasons), and it is necessary to verify that:

- core functionality of the web application remains intact  
- the user interface (UI) has not been unintentionally affected  
- no regressions were introduced in key user flows  

Automated tests were implemented using **Cypress** to efficiently validate these areas before releasing changes to production.


## Test Scenarios

The implemented tests focus on critical user journeys:

- Product search (valid and invalid inputs)
- Search suggestions (auto-suggest functionality)
- Basic shopping cart operations (add/remove product)

These flows were selected as they represent essential functionality of an e-commerce application and are highly sensitive to backend changes.

##

![Test Execution Result](test-result.png)

## Technical Notes
* **Cookie Handling:** A `cookiehub` cookie is used in the `beforeEach` block to automatically bypass the GDPR consent banner and ensure test stability.

