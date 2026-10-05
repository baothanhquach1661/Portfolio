---
title: "NailToolInventory"
tagline: "Inventory management for a small distributor"
summary: "Multi-location stock, transfers with clear states, and a full audit trail, deployed to Azure with automatic rollback."
stack: ["C#", "ASP.NET Core MVC (.NET 10)", "EF Core", "Azure SQL", "xUnit", "GitHub Actions", "Azure"]
status: "Live on Azure"
order: 1
repo: "https://github.com/baothanhquach1661/NailToolInventory"
---

## The problem

In the small distribution businesses I've worked with, the same inventory problems kept coming up:

- Stock information was scattered across Excel sheets, Shopify, and separate apps, with nothing keeping them in sync.
- Counts drifted away from what was actually on the shelf, with no record of who changed a number or when.
- Transfers between warehouses weren't recorded, so stock seemed to disappear in transit.
- Orders for one location often had to be filled from another warehouse, slowing delivery.
- Best sellers ran out before anyone reordered, while slow movers piled up.
- Marketplace listings such as Amazon kept selling items that were already gone.
- Products with expiry dates, like gel and polish, sat in stock until they expired.

## How the system addresses it

- **One source of truth for every location.** On-hand, reserved, and available quantities are tracked per location, so staff can see at a glance where an item is and move it before an order is delayed.
- **Every change is recorded.** Receipts, issues, physical-count adjustments, and transfers are logged with who made them, when, and the quantity before and after, so any discrepancy can be traced.
- **Transfers have clear states.** Draft, In Transit, Completed, and Cancelled: stock leaves the source only when it ships and arrives only when it's received, so nothing disappears in between.
- **Reorder levels flag low stock** before best sellers run out.
- **Admin and Staff roles** control who can move stock, enforced on the server.

## Key design decision

The system keeps both a current balance for fast lookups and an immutable history of every stock movement. Each change and its history entry are saved in a single database transaction, so the balance and the history can never disagree.

## Testing and delivery

Unit tests enforce the core stock rules: stock can't be issued beyond what's on hand, inactive products can't be moved, and physical counts can't go negative. GitHub Actions runs the tests on every pull request. Merges to main deploy automatically to Azure using secretless OIDC authentication, with health checks and automatic rollback.

## A problem I solved

The first production deployment returned HTTP 500. The deployment script detected the failure and automatically restored the previous version. Using Windows Event Viewer, I traced it to a SQL connection timeout (error -2): Azure SQL was still waking from idle while the app started up. I fixed it by extending the connection timeout and retrying that specific error, and the next deployment succeeded.

## Results

Piloted at a friend's nail supply store, where checking stock became quick and easy. With one accurate source of stock numbers, keeping marketplace listings up to date became much simpler. The app is live on Azure.

## What's next

Automatic stock sync with marketplaces such as Amazon to prevent overselling, lot numbers and expiry dates (FEFO), concurrency checks so simultaneous updates can't overwrite each other, and tests covering multi-location transfers.

*I used AI coding assistants to help write the code. I set the requirements from real store operations, reviewed and ran every change, and tested the app with a working store.*