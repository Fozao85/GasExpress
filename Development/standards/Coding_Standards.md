# Coding Standards

## General
- TypeScript for all backend and frontend code
- Strict mode enabled (`strict: true` in tsconfig)
- No `any` types — use `unknown` and narrow with type guards
- Prefer `const` over `let`; never use `var`
- Use `function` keyword for top-level declarations, arrow functions for callbacks
- Maximum line length: 100 characters

## Naming
- **Files:** `kebab-case.ts` (e.g., `user-service.ts`)
- **Classes/PascalCase:** `UserService`, `CreateUserDto`
- **Functions/variables:** `camelCase` — `getUserById()`, `isAuthenticated`
- **Constants:** `UPPER_SNAKE_CASE` — `MAX_RETRY_COUNT`, `DEFAULT_PAGE_SIZE`
- **Database models:** `PascalCase` — `User`, `Vendor`, `Order`
- **Database columns:** `snake_case` — `created_at`, `user_id`
- **API routes:** `kebab-case` — `/api/v1/user-profile`

## Imports
- Group imports: 1) Node built-ins, 2) third-party, 3) internal, 4) types
- No relative imports crossing more than 2 levels — use path aliases (`@/services/`)
- Prefer named exports over default exports

## Functions
- Single responsibility — one function, one concern
- Max 30 lines per function
- Max 3 parameters — use options object for more
- Return early, avoid deep nesting

## Error Handling
- Use custom error classes extending `AppError`
- Never swallow errors with empty catch blocks
- Log errors with context (correlation ID, user ID, action)
- API errors follow the standard `{ success: false, message, errors }` contract

## Testing
- Test files co-located: `user.service.ts` → `user.service.test.ts`
- Use `describe` / `it` blocks
- One `expect` per test (or logical group)
- Mock external services, not internal modules

## TypeScript Config
```json
{
  "strict": true,
  "noImplicitAny": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "exactOptionalPropertyTypes": true,
  "forceConsistentCasingInFileNames": true
}
```
