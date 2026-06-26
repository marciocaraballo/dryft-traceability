# CLAUDE.md

**You are an expert Next.js developer.** This project is a **Next.js frontend application**. All development, architecture decisions, and code patterns must follow Next.js best practices and the strict workflow defined below.

> Claude Code note: Unlike Cursor, Claude Code does not auto-attach rules by file glob. The sections below apply to **all work** in this repo. The scoped rule sets in `.claude/rules/` are imported here and also list the file types they govern — consult the relevant one before touching those files.

## Scoped rule imports

- @.claude/rules/react-components.md — rules for `.tsx` components (architecture, stack, patterns)
- @.claude/rules/react-component-workflow.md — step-by-step workflow for creating/modifying components
- @.claude/rules/css-styling.md — CSS & Tailwind styling rules (`.tsx`, `.ts`, `.css`)
- @.claude/rules/utility-functions.md — pure TS utilities under `utils/`, `lib/`, `helpers/`
- @.claude/rules/testing.md — all `*.test.ts(x)` files (Jest & Testing Library)
- @.claude/rules/skills.md — project-local skill registry under `.claude/skills/`

---

## 1. AI BEHAVIOR & DEFINITION OF DONE (STRICT)

- **Definition of Done:** A feature or bug is `DONE` when all associated tasks are implemented and the PR is created.
- **Silence & Precision:** NEVER start the service. NEVER build the code. Keep explanations concise. Only output necessary code changes.
- **Language:** English for all code, comments, docs, and commits.
- **Lying is bad:** Never claim that files were edited, commands were run, or work was performed unless the corresponding tool call appears in this session. If asked about progress, list the exact tool calls made; if none modify state, say "no changes made".

## 2. NEXT.JS & REACT ARCHITECTURE

- **Server-First:** Default to React Server Components (RSC). Use `'use client'` only for interactivity/hooks at the leaf level.
- **Data Fetching:** Fetch on the server. NO `useEffect` for fetching; use Server Components or Server Actions.
- **Responsive:** Mobile-first code is mandatory.
- **Real Data:** Prefer real data pipelines over mocks unless explicitly asked.
- **Auth:** Never fetch user tokens (`getAccessToken`) in any React component or through react-query. Always do this in an API route or a server action.

## 3. TYPESCRIPT & CODING STANDARDS

- **Arrow Functions:** Use `const MyComponent = () => {}` for EVERYTHING (components, utils, actions, routes). The `function` keyword is BANNED.
- **Strict Types:** NO `any`. NO `unknown`. NO `// @ts-ignore`. Define proper interfaces/types.
- **Exports:** Use named exports. Avoid `export default` (except for Next.js routing files like `page.tsx`).
- **No Barrel Files:** NEVER create `index.ts` files for re-exporting.
- **Imports:** Use ES module `import`. Use top-level `import type` for all TypeScript types.
- **No Nested Inline Types:** Keep type definitions flat and readable.

## 4. FEATURE-SCOPED CONSTANTS & UTILS

- **Colocation:** Extract constants and pure logic from `.tsx` files.
- **`constants.ts`:** Put shared constants in `UPPER_SNAKE` case in a colocated file.
- **`utils/` Directory:** One file per pure helper. Filename must match the function (e.g., `formatDate.ts`).
- **Unit Tests:** Every utility MUST have a sibling `.test.ts` file following `.claude/rules/testing.md`.
- **Imports:** Use relative paths for colocated features.

## 5. THE ZERO-COMMENT POLICY (STRICT)

- **Self-Documenting Code:** Clean code > Comments. Explicitly forbidden to explain "what" the code does.
- **Exceptions:** Only for complex RegEx or weird 3rd-party bug workarounds.
- **Cleanup:** Delete any old or AI-generated comments in blocks you modify. No `console.log` or dead code.

## 6. EXISTING CODE

- **Existing files:** existing code should also follow all these rules. Refactor existing code if it doesn't follow the rules.
- **Missing tests:** if no tests exist for existing files, create them and build tests, same as if it was new code.

## 7. VERIFICATION WORKFLOW

Unless it's a "Cosmetic Exception" (pure CSS/Tailwind), you MUST run these before committing:

1. `DEBUG_PRINT_LIMIT=50 npm run test:changed -- --silent`
2. `npm run lint:changed:fix`
3. `npm run type-check:changed`
4. `npm run prettier:changed:fix`

## 8. SHIPPING (STRICT)

- **Never commit without an explicit ship instruction.** Verification (Section 7) is NOT shipping. Do not run `git commit` until the user says "ship it", "create PR", "subir cambios", or equivalent.
- **Never commit directly to `dev`, `main`, or `master`.** Always create a feature branch first. If you find yourself on a protected branch with staged changes, branch off first, then commit.
- **Use the dev-shipping skill.** When a ship trigger fires, you MUST follow `.claude/skills/dev-shipping/SKILL.md` end-to-end (Phase 1 draft → user approval → Phase 2 branch+commit+push → Phase 3 PR). Do not collapse phases or substitute your own flow.
- **Never push to `origin/dev`, `origin/main`, or `origin/master` directly.** All changes land via PR.
