# GasNow Database AI Prompt Library

## Purpose

Reusable prompts for database generation.

---

# Global Rules

Use PostgreSQL.

Use Prisma ORM.

Normalize the database.

Follow:

- Database Schema
- API Contracts
- Security Model

Generate:

- Prisma schema
- SQL migrations
- Seed scripts
- Indexes
- Constraints

Never:

- Duplicate data
- Break referential integrity

---

# Migration Prompt

Generate the migration.

Include:

- Primary Keys
- Foreign Keys
- Indexes
- Constraints
- Cascade Rules

---

# Table Prompt

Generate the complete table.

Include:

- Validation
- Indexes
- Soft Delete
- Timestamps

---

# Seed Prompt

Generate realistic seed data.

Include:

Customers

Vendors

Riders

Products

Orders

Payments

Notifications

Return complete seed scripts.