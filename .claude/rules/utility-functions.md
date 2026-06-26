# UTILITY FUNCTIONS & HELPERS RULES

> Applies to: `**/{utils,lib,helpers}/**/*.ts`.

**You are an expert TypeScript developer.** These rules apply to all pure logic files, helpers, and utilities.

**Global requirement:** `CLAUDE.md` Section 4 (*Feature-scoped constants & pure utilities*) is **always** in effect. When you extract logic from components, use colocated `constants.ts` plus `utils/` as described there; this file defines how each utility file is shaped and tested.

## 1. STRUCTURE AND ARCHITECTURE

- **Single Responsibility:** Each utility function must be in its own file, named exactly after the function (e.g., `formatCurrency.ts`).
- **Colocation:** Keep utility functions in a `utils`, `lib`, or `helpers` folder as close as possible to where they are used. For feature UI code, prefer a sibling `utils/` folder and `constants.ts` next to that feature (see `CLAUDE.md` Section 4).
- **Constants:** Shared numeric limits and feature tokens that are not functions belong in `constants.ts` at that same feature boundary, not inside individual `utils/*.ts` files (unless a single constant is truly private to one module and never reused).
- **Pure Functions:** Functions MUST be pure. They must not have side effects, must not rely on global state, and must always return the same output for the same input.
- **Dependency Injection:** If a function needs access to component props, state, or external context, it MUST receive those values as explicit parameters.

## 2. IMMUTABILITY (MANDATORY)

- **Never mutate arguments.** If you are working with objects or arrays (e.g., sorting a list of transactions or updating a data structure), always return a *new* copy of the object or array.
- Use spread operators `...`, `map()`, `filter()`, or `reduce()` instead of `push()`, `pop()`, or mutating indexes directly.

## 3. TYPESCRIPT & EXPORTS

- **Arrow Functions:** As defined globally, ALWAYS use arrow functions assigned to `const` variables.
- **Explicit Return Types:** Utility functions MUST have explicit return types. Do not rely on TypeScript inference for the return value of complex data transformations.
  - *Bad:* `const calculateYield = (price: number, dividend: number) => { ... }`
  - *Good:* `const calculateYield = (price: number, dividend: number): number => { ... }`
- **JSDoc:** Document complex functions with JSDoc (`/** ... */`), explaining the parameters and the expected return value.

## 4. ERROR HANDLING

- Fail fast and predictably. If an input is invalid, throw a clear, descriptive `Error` or return a predictable failure type (like a discriminated union or `null` if explicitly typed), rather than failing silently or returning `NaN`.

## 5. TESTING REQUIREMENTS

- **MANDATORY:** Each utility function must have a corresponding test file (`functionName.test.ts`) that strictly adheres to @.claude/rules/testing.md.
- Tests must cover all possible input cases:
  - `null` and `undefined` values.
  - Empty and non-empty arrays/objects.
  - Type boundary edge cases (e.g., `0`, negative numbers, extremely large numbers).
  - Field combinations and missing optional properties.

**Completion checklist:** When working with utility functions, you must also satisfy the global project completion checklist (tests pass, linting passes) before considering the task complete.
