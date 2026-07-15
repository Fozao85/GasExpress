# Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/) specification.

## Format

```
<type>(<scope>): <short description>

[optional body with details]

[optional footer: BREAKING CHANGE or issue references]
```

## Types

| Type | When to use |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `test` | Adding or correcting tests |
| `docs` | Documentation only changes |
| `chore` | Build process, CI, dependency updates |
| `style` | Formatting, missing semicolons (no logic change) |
| `perf` | Performance improvement |
| `ci` | CI configuration changes |

## Scope

The scope should be the module, service, or area affected:

- `auth`, `cart`, `order`, `payment`, `tracking`, `vendor`, `rider`, `admin`
- `api`, `db`, `frontend`, `backend`
- `ci`, `deps`, `config`

## Examples

```
feat(order): add stock reservation on order creation
fix(payment): handle webhook signature verification timeout
refactor(cart): extract pricing logic into service
test(rider): add job rejection auto-reassign tests
docs(api): update payment initiate response contract
chore(deps): upgrade prisma to 5.10
ci: add deployment pipeline for staging
```

## Rules

- Use the imperative mood ("add" not "added" or "adds")
- First line max 72 characters
- Body wraps at 72 characters
- Footer for breaking changes: `BREAKING CHANGE: <description>`
- Reference issues: `Closes #123`, `Refs #456`
