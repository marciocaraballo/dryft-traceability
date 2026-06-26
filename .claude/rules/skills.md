# PROJECT SKILLS (STRICT)

This repository ships executable agent skills under `.claude/skills/`. Each skill folder has a `SKILL.md`. While Claude Code can auto-discover skills, you MUST treat the table below as authoritative: when a trigger fires, read the corresponding `SKILL.md` IMMEDIATELY and follow it end-to-end. Do not improvise, summarize, or shortcut.

## Trigger → Skill registry

| Trigger phrase / situation                            | Skill to load                              |
|-------------------------------------------------------|--------------------------------------------|
| "ship it", "create PR", "subir cambios", "open a PR"  | `.claude/skills/dev-shipping/SKILL.md`     |
| "add tests", "write tests", "missing tests"           | `.claude/skills/add-tests/SKILL.md`        |
| Lint failure, "fix lint", `npm run lint` errors       | `.claude/skills/fix-lint/SKILL.md`         |
| Test failure, "fix tests", red Jest output            | `.claude/skills/fix-test/SKILL.md`         |
| Type error, "fix types", `tsc` errors                 | `.claude/skills/fix-types/SKILL.md`        |

## Rules

1. **Mandatory load:** if a trigger fires and you have NOT read the matching `SKILL.md` in this session, read it before any other action. No exceptions.
2. **Full execution:** follow every phase of the skill. Do not collapse multi-phase skills (e.g. dev-shipping's three phases) into a single step.
3. **No silent substitution:** do not replace a skill with your own workflow (for example, do not "commit and verify" when the user says "ship it" — that is the dev-shipping skill's job).
4. **Skill discovery:** if the user references a behavior that sounds like it should be a skill but is not in this table, list `.claude/skills/` and check before improvising.
