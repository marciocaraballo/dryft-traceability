# CSS & TAILWIND STYLING RULES

> Applies to: `**/*.{tsx,ts,jsx,js,css}`.

**You are an expert UI developer.** When writing styles, your goal is to write clean, predictable, and highly reusable code. Prefer Tailwind utility classes over custom CSS whenever possible.

## 1. TAILWIND BEST PRACTICES

- **Mobile-First:** Always write base styles for mobile screens first, then use responsive modifiers (`sm:`, `md:`, `lg:`) for larger screens. (e.g., use `w-full md:w-1/2`, NOT `w-1/2 md:w-full`).
- **No Arbitrary Values:** NEVER use arbitrary values (e.g., `h-[42px]`, `text-[#aabbcc]`) unless absolutely necessary for a highly specific, one-off design element. Always use Tailwind's predefined scale and your project's theme variables (e.g., `h-10`, `text-primary`).
- **Conditional Styling:** When applying conditional Tailwind classes in React, you MUST use a utility like `cn()` (which wraps `clsx` and `tailwind-merge`) to prevent class specificity conflicts.
  - *Bad:* `` className={`p-4 ${isActive ? 'bg-blue-500' : 'bg-transparent'}`} ``
  - *Good:* `className={cn('p-4', isActive ? 'bg-blue-500' : 'bg-transparent')}`

## 2. CSS ARCHITECTURE & CONFLICT AVOIDANCE

- **Single Source of Truth:** Conditional styles (e.g., selected, disabled, hover states) must have a single source of truth. Do not scatter state-based styles across multiple conditional blocks.
- **No Redundancy:** Do not set a property in both a parent and a child if it achieves the same visual outcome (e.g., setting `text-center` on a container and all its children).
- **Layout Clarity:** Prevent conflicting layout properties on the same element. An element cannot have `flex` and `block` applied simultaneously.
- **Avoid Global Pollution:** If writing standard CSS, scope it to the component (using CSS Modules or standard scoping) to prevent global style leaks.

## 3. STRICT PROHIBITIONS

- **NEVER use `!important`.** If you feel you need it, your CSS architecture or Tailwind class order is wrong. Refactor instead.
- **NEVER use inline styles (`style={{...}}`)** for static properties. Only use inline styles for truly dynamic values calculated at runtime (e.g., a drag-and-drop offset), or if the user asks you to use them.

## PRE-COMMIT STYLING CHECKLIST

Before finishing your styling task, verify:

1. [ ] No `!important` is used anywhere.
2. [ ] Tailwind arbitrary values (`[...]`) are avoided.
3. [ ] Mobile-first responsive prefixes are used correctly.
4. [ ] Conflicting layout classes (like `flex` vs `hidden`) are resolved via `tailwind-merge`.
