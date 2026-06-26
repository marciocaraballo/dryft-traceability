# TESTING RULES & STANDARDS

> Applies to: `**/*.test.{ts,tsx}`.

**You are an expert QA and Test Engineer.** These rules apply to **every** test file in the project. Your goal is to write robust, isolated, and maintainable tests WITHOUT bloating the context window, writing meaningless assertions, or bypassing accessibility.

## 1. ANTI-BLOAT & EXECUTION RULES (CRITICAL)

- **No Mass Generation:** NEVER generate an entire test suite (multiple `it` blocks) in a single output step. Write tests iteratively (one by one) using strict Test-Driven Development (TDD) to avoid cascading Jest failures that bloat the context window.
- **Avoid Race Conditions:** ALWAYS create and save the test file with basic imports and mocks BEFORE executing any terminal commands. Never run Jest on a non-existent file.
- **Silent Execution:** Whenever you need to run tests in the terminal to verify your work, you MUST limit the DOM output and silence warnings to save context tokens. Always use exactly this command:
  `DEBUG_PRINT_LIMIT=50 npm run test:changed -- --silent`

## 2. MEANINGFUL TESTING & AVOIDING TRIVIALITIES (CRITICAL)

Your goal is to test component BEHAVIOR, not static implementation details.

- **The Single Smoke Test:** You are allowed EXACTLY ONE basic render test (e.g., `it('renders successfully')`) per component to ensure it doesn't crash on mount.
- **No Static Attribute Testing (STRICTLY FORBIDDEN):** NEVER write tests to verify hardcoded text, placeholders, CSS classes, labels, or static props.
- **No React Boilerplate Testing:** Do not write tests just to verify that a prop was passed to a child component or that React state initializes correctly. Assume React works.
- **Focus on Business Logic & Interactions:** Your tests MUST focus on what the component *does* (e.g., form submissions, conditional logic, side effects).
- **Logging utils:** never add test scenarios that check if they get called correctly.

## 3. THE GOLDEN RULE: ONE ASSERTION PER TEST

**MANDATORY:** Each test case (`it` or `test`) MUST have only ONE `expect` or assertion.

- *Why?* It isolates failures and makes test logs immediately actionable.
- If you need to test multiple things, write multiple `it` blocks.

## 4. STRICT MOCKING STRATEGY (NO PROVIDERS & NO UI MOCKS)

- **Top-Level Mocks:** Place all `jest.mock()` calls at the VERY TOP of the test file, BEFORE any `import` statements.
- **React Query:** You are STRICTLY FORBIDDEN from using `QueryClient` or `QueryClientProvider` in tests. Treat it as an external boundary. ALWAYS `jest.mock('@tanstack/react-query')` directly.
- **Isolate Logic, NOT UI:** Mock ALL imported utilities, hooks, and external libraries. However, you are **STRICTLY FORBIDDEN from mocking internal presentational UI components** (e.g., Inputs, Buttons, standard wrappers). Allow React Testing Library to deep-render them to test real DOM interactions.
- **The Shared Mock Variable Pattern:** ALWAYS define a top-level shared mock variable after imports. NEVER use inline casts with leading semicolons like `;(fn as jest.Mock).mockReturnValue(...)`.

## 5. COMPONENT TESTING & ACCESSIBILITY (REACT TESTING LIBRARY)

- **The `getByRole` Mandate (CRITICAL):** You MUST prioritize `getByRole` (ideally with the `name` option) over ALL other queries.
  - *Good:* `screen.getByRole('textbox', { name: /search by deal name/i })`
  - *Good:* `screen.getByRole('button', { name: /clear/i })`
- **Fallback Queries:** You may ONLY use `getByLabelText`, `getByPlaceholderText`, or `getByText` if `getByRole` is technically impossible due to complex DOM structures.
- **NO `data-testid`:** You are STRICTLY FORBIDDEN from adding or using `data-testid` attributes in both tests and component code.
- **User Events:** You MUST use `@testing-library/user-event` (e.g., `await user.type(input, 'text{Enter}')`) over `fireEvent` to simulate real browser interactions. Do not manually trigger `.submit()` on forms.
- **NO CSS Checks:** NEVER test anything related to CSS, styling, or Tailwind classes.

## 6. NAMING & STRUCTURE

- Use descriptive test names that explain exactly what is being tested and the expected outcome.
- Follow the Arrange-Act-Assert (AAA) pattern implicitly in your test structure.

## 7. PATHS & IMPORTS (ABSOLUTE ALIASES ONLY)

- **MANDATORY:** You must ALWAYS use absolute path aliases (e.g., `@/components/...`, `@/utils/...`) for both `import` statements AND `jest.mock()` definitions.
- You are STRICTLY FORBIDDEN from using relative paths (e.g., `../../../../utils`) as it wastes reasoning tokens and causes resolution errors.
