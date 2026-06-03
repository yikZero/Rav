---
name: tailwind-design-system
description: "Use when building, auditing, or refactoring a Tailwind CSS design system. Covers Tailwind v4 token architecture, theme variables, component patterns, dark mode, responsive layouts, animations, accessibility, performance, migration concerns, and advanced Tailwind design-system patterns."
argument-hint: "[audit|build|refactor|migrate] [files or scope]"
user-invocable: true
license: "MIT. Adapted from wshobson/agents tailwind-design-system. See NOTICE.md."
---

Tailwind CSS design-system guidance.

Use this for Tailwind-specific token, utility, component, and design-system work. Use `design` for broad visual critique, and use `web-ui-audit` for terse implementation compliance checks.

## Use

Use this skill for:

- Tailwind v4 theme variables and token architecture.
- Converting ad hoc utilities into reusable design-system patterns.
- Dark mode, responsive layout, animation, and accessibility decisions in Tailwind.
- Reviewing Tailwind-heavy components for maintainability and consistency.
- Migration planning when Tailwind version or token strategy is part of the task.

If the project is Tailwind v3 or uses a framework-specific setup, verify the installed version and current docs before applying v4-only guidance.

## Process

1. Inspect `package.json`, lockfiles, Tailwind config, global CSS, and existing component patterns.
2. Identify whether the task is token architecture, component extraction, responsive behavior, animation, dark mode, or migration.
3. Read `references/core-patterns.md` for token architecture, Tailwind v4 setup, component variants, responsive patterns, accessibility, performance, and migration basics.
4. Read `references/advanced-patterns.md` only when the task needs advanced variants, native animations, theme modifiers, namespace overrides, or deeper migration guidance.
5. Prefer project-local tokens and conventions over introducing a new palette or naming system.
6. Avoid churn: do not rewrite every class string unless the requested change requires it.
7. Validate with the project's focused lint, typecheck, build, or visual smoke test when available.

## Rules

- Keep semantic tokens stable: colors, spacing, radius, typography, shadows, and motion should express product meaning.
- Prefer readable utility composition. Extract components or helpers only when repeated use justifies the abstraction.
- Preserve accessibility: focus states, contrast, touch targets, reduced motion, and keyboard behavior are part of the system.
- Avoid one-note palettes, arbitrary values as defaults, and broad `transition-all`.
- Treat responsive and long-content behavior as first-class requirements.

## Output

For audits, lead with findings:

```text
findings:
- file:line - Tailwind design-system issue, impact, and recommended fix.
```

For implementation, summarize token changes, component changes, and validation run.
