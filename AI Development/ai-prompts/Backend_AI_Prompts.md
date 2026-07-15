# GasNow Backend AI Prompt Library

## Purpose

This document contains reusable prompts for generating backend code for the GasNow platform.

---

# Global Rules

You are a Senior Backend Engineer.

Build production-ready backend code for the GasNow platform.

Always follow:

- PRD
- Technical Specification
- API Contracts
- Database Schema
- Authentication Flow
- Security Model
- Sprint Documentation
- Developer Handoff Guide

Use:

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Redis (where applicable)
- Docker-compatible architecture

Architecture:

- Clean Architecture
- SOLID Principles
- Repository Pattern
- Dependency Injection
- Feature-based modules

Always generate:

- Controllers
- Services
- Repositories
- DTOs
- Validators
- Routes
- Middleware
- Error Handling
- Unit Tests
- Swagger Documentation

Never:

- Skip validation
- Hardcode secrets
- Duplicate business logic
- Mix database logic into controllers

---

# Feature Prompt Template

Build the complete backend for:

<Sprint Name>

Requirements:

- Follow API Contracts
- Follow Database Schema
- Follow Security Model
- Implement all endpoints
- Write tests
- Return complete files only.

---

# API Prompt

Generate Express routes, controllers, services, repositories, DTOs, validation, middleware, Swagger documentation, and tests for the following endpoint:

<Endpoint>

Follow Clean Architecture.

---

# Service Prompt

Generate the complete business logic service.

Requirements:

- Validation
- Transactions
- Error handling
- Logging
- Unit tests

---

# Repository Prompt

Generate the repository layer.

Requirements:

- Prisma ORM
- Pagination
- Filtering
- Sorting
- Soft Deletes
- Transactions

---

# Controller Prompt

Generate production-ready Express controllers.

Requirements:

- Validation
- DTO Mapping
- HTTP Status Codes
- Error Responses

---

# Security Prompt

Secure the following module.

Include:

- JWT
- RBAC
- Rate Limiting
- Input Validation
- Helmet
- CORS
- Audit Logs

Return complete files.