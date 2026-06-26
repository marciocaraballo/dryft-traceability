# REACT COMPONENT RULES

> Applies to: `**/*.tsx`. Consult before modifying any component.

**You are an expert Next.js UI Developer.** Before modifying any component, you MUST follow the workflow defined in @.claude/rules/react-component-workflow.md.

## 1. NEXT.JS APP ROUTER PARADIGM

- **Server-First:** Use Server Components by default.
- **Client Boundary:** Only add the `'use client'` directive at the very top of the file when the component requires React hooks (`useState`, `useEffect`), browser APIs, custom hooks, third party library hooks, or event handlers (`onClick`).

## 2. COMPONENT STRUCTURE & PROPS

- **Strict Interfaces:** Use TypeScript `interface` for all component props (e.g., `interface ButtonProps { ... }`).
- **Clean Contracts:** If props are no longer being used by the component, you MUST remove them completely. NEVER just make them optional (`?`) to suppress errors.
- **Default Values:** Use meaningful prop names and provide default values directly in the destructuring (e.g., `({ size = 'md' }: ButtonProps)`).
- **Single Responsibility:** Keep components small and focused. Extract complex logic outside the `return` statement to keep the JSX clean.
- **Single component per file:** Never put multiple components in the same file.
- **Constants & pure helpers:** Do not embed feature-level constants or multi-line pure formatters inside `.tsx`. Follow `CLAUDE.md` Section 4: colocated `constants.ts`, one function per file under `utils/`, and sibling unit tests.
- **Performance:** NEVER use `React.memo()`, `useMemo()`, and `useCallback()`. Do not pre-optimize.

## 3. STRICT CODE STYLE: INLINE HANDLERS

- **MANDATORY:** Write event handler code directly inline within the JSX prop.
- Do NOT create separate handler functions outside the return statement.
  - *Bad:* `<button onClick={handleClick}>`
  - *Good:* `<button onClick={() => { /* logic here */ }}>`

## 4. APPROVED TECHNOLOGY STACK

You must strictly use the following stack for implementations:

- **Styling:** Tailwind CSS. Use the `cn()` utility from `@/lib/utils` for conditional classes. Prefer `shadcn/ui` components from `@/components/ui` over building custom UI from scratch.
- **Data Fetching (Client):** Use TanStack React Query (`@tanstack/react-query`). Use `useQuery` and `useMutation` hooks. Prefer `axios` for the fetcher implementation.
- **Forms & Validation:** Use React Hook Form (`react-hook-form`) combined with Zod (`zod`). Use `@hookform/resolvers/zod` for schema validation.

## 5. ACCESSIBILITY (A11Y) STANDARDS (STRICT)

- **Semantic HTML:** Always use the most appropriate semantic HTML tag. A `<div>` or `<span>` is NEVER a button or a link.
- **Next.js Components:** Every `next/image` MUST have a descriptive `alt` prop. Use `alt=""` ONLY for purely decorative images.
- **Keyboard Navigation:** All interactive elements must be operable via keyboard (`Enter` and `Space` keys). Use `tabIndex={0}` only when building custom interactive components, and never on non-interactive elements.
- **ARIA Attributes:** Prefer native HTML elements over ARIA roles. Use `aria-` attributes (like `aria-expanded`, `aria-hidden`, `aria-label`) strictly for custom components where native semantics fall short.
- **Focus States:** Never remove focus outlines without providing a visible fallback. Ensure clear visual focus indicators for all interactive elements.

## 6. TESTING INTEGRATION

- **MANDATORY:** Every component must have unit tests following the strict rules defined in @.claude/rules/testing.md.
- **Component-Specific Test Rules:**
  - Mock Next.js Images: Always use `jest.mock('next/image', ...)` when testing components with images.
  - Focus tests on user-facing behavior (rendering, user interactions via `@testing-library/user-event`) and component contracts.
  - Mock all API calls and verify they receive the correct parameters.
