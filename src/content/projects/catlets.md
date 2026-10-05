---
title: "CatLens"
tagline: "Product master data review for Shopify"
summary: "Imports a Shopify inventory export, finds missing and duplicate SKUs, and flags suspicious quantities, without ever touching the live store."
stack: ["C#", "ASP.NET Core MVC (.NET 10)", "EF Core", "PostgreSQL 17", "Docker", "CsvHelper"]
status: "V1 complete"
order: 2
repo: "https://github.com/baothanhquach1661/catlens"
---

## The problem

Inventory systems are only as reliable as the product data underneath them. In a Shopify catalog with many product variants stocked across multiple locations, small data errors cause real operational problems. A variant without a SKU can't be matched to stock in other systems. Two variants sharing one SKU mix up inventory between products. An extra zero typed into a quantity inflates stock on paper. Finding these by scrolling through Shopify Admin is slow, and it's easy to miss things.

## How it works

Import a Shopify inventory CSV, store a snapshot in PostgreSQL, run review rules, and export reports.

- **Missing SKUs:** variants whose SKU is blank after trimming whitespace.
- **Duplicate SKUs:** the same SKU assigned to more than one variant, compared case-insensitively.
- **High inventory:** quantities above a configurable threshold, flagged for a person to verify rather than treated as errors.
- **Reports:** each review exports as a CSV that opens cleanly in Excel.

## Key design decisions

- **Safe imports.** The whole file is validated before anything is written, and the old snapshot is replaced inside a single database transaction. If an import fails, the previous data stays intact.
- **Read-only by design.** CatLens never writes back to Shopify and needs no access token or customer data, so it can't damage the live store. It supports human decisions instead of correcting data automatically.

## Status

Tested with real Shopify export files; the V1 workflow runs end to end.

## What's next

Automated tests for the review rules, read-only sync through the Shopify Admin API, import history to compare snapshots over time, and dead-stock reporting.

*I used AI coding assistants to help write the code. I set the requirements from real catalog work, reviewed and ran every change, and tested it with real export files.*