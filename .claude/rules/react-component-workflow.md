# REACT COMPONENT WORKFLOW & STANDARDS

> Applies to: `**/*.tsx` (excluding `*.test.tsx`).

**You are an expert React/Next.js Developer.** When creating or modifying a React component, you MUST follow this strict step-by-step workflow. Do not skip steps. Your goal is to write clean, typed, and testable code without overloading the context window.

## STEP 1: ANALYSIS & PLANNING

- Read the requirements and analyze the existing component or file structure.
- Identify required props, state, and external data fetching (e.g., React Query).
- If the logic is complex, explicitly state your plan before writing code.

## STEP 2: COMPONENT STRUCTURE & TYPING

- **Functional Components:** Match `CLAUDE.md`: NEVER use the `function` keyword. Use arrow functions assigned to `const` with named exports (e.g. `export const ComponentName = (props: ComponentNameProps) => { ... }`).
- **Strict Typing:** ALWAYS define an explicit `interface` for props named `[ComponentName]Props`. NEVER use `any`.
- **Exports:** Prefer named exports over default exports (unless required by Next.js routing).
- **No FC:** NEVER use `React.FC` or `FC`. Let the return type be inferred or explicitly type it as `JSX.Element`.
- **Shared constants & pure logic:** When adding limits, formatters, or other pure helpers for this feature, follow `CLAUDE.md` Section 4 (`constants.ts` + colocated `utils/*.ts` + tests), not inline definitions in the component file.

## STEP 3: LOGIC SEPARATION (CUSTOM HOOKS)

- Keep components focused on presentation and UI wiring.
- If a component has complex state, API calls, or React Query mutations/queries, **extract that logic into a custom hook** (e.g., `hooks/use[Feature].ts`).
- When using React Query, ensure the component properly handles and renders the `isPending` (loading skeletons) and `isError` (fallback UI) states.

## STEP 4: STYLING & ACCESSIBILITY

- Use the project's standard styling approach (e.g., Tailwind CSS utility classes). See @.claude/rules/css-styling.md.
- Ensure semantic HTML (use `<button>` for actions, `<a>` for navigation).
- Always include `aria-labels` for icon-only buttons or complex interactive elements.

## STEP 5: THE COSMETIC BYPASS & TEST-DRIVEN COMPLETION

Before proceeding with tests, evaluate the exact nature of your changes:

1. **THE COSMETIC EXCEPTION (READ FIRST):** If your modifications are STRICTLY limited to styling, CSS, or Tailwind `className` strings (ZERO changes to state, props, hooks, DOM node types, or business logic), you MUST SKIP all testing steps and terminal executions. Simply state: *"Cosmetic changes applied. Tests skipped."* and conclude the task.
2. **Logic/DOM Changes (Tests Required):** If you modified any logic, props, or DOM structure, you CANNOT consider the modification complete without tests. Proceed to the next points.
3. **Iterative Creation:** Do NOT generate a massive test file in the same response as the component implementation.
4. **Smoke Test First:** Provide the component code and just ONE basic rendering test in the corresponding `.test.tsx` file to prove it works.
5. **Prompt the User:** Stop immediately and ask the user: *"El componente está listo y el test base pasa. ¿Quieres que continúe agregando el resto de los tests paso a paso?"*
6. **Execution:** Strictly follow the anti-bloat execution rules defined in @.claude/rules/testing.md (e.g., using `DEBUG_PRINT_LIMIT=50 npm run test:changed -- --silent`).
