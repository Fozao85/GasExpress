# Git Workflow

## Branching Strategy

```
main (production)
  └── develop (integration)
        ├── feature/sprint-XX-YYY
        ├── bugfix/description
        └── release/v1.0.0
```

## Branch Naming

| Type | Format | Example |
|------|--------|---------|
| Feature | `feature/sprint-XX-description` | `feature/sprint-03-cart-apis` |
| Bugfix | `bugfix/description` | `bugfix/payment-amount-rounding` |
| Hotfix | `hotfix/description` | `hotfix/login-crash` |
| Release | `release/vX.Y.Z` | `release/v1.0.0` |

## Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]
[optional footer]
```

### Types
- `feat` — New feature
- `fix` — Bug fix
- `refactor` — Code change without feature/fix
- `test` — Adding or updating tests
- `docs` — Documentation only
- `chore` — Build, CI, dependencies
- `style` — Formatting only (no logic change)

### Examples
```
feat(cart): add quantity update endpoint
fix(payment): handle webhook timeout gracefully
test(order): add stock reservation integration test
docs(api): update order response contract
```

## Workflow

1. Branch from `develop` for features/bugfixes
2. Keep PRs small (< 400 lines)
3. Write descriptive PR title matching commit convention
4. Request review from at least one other developer
5. Squash-merge to `develop`
6. Release branches merge to `main` and tag with version

## PR Checklist
- [ ] Code follows coding standards
- [ ] Tests added/updated
- [ ] Lint and type check pass
- [ ] API documentation updated if needed
- [ ] No secrets committed
