---
name: requirements
description: Turn user stories with acceptance criteria (in requirements/) into a traceable test plan. Use before planning when written requirements exist, so every acceptance criterion maps to a test.
---

# Requirements skill

This suite can work two ways: explore the running app, or start from written
requirements. When `requirements/` holds stories, start there so coverage is
traceable to each acceptance criterion.

## Intake

- One story per file: `requirements/STORY-<id>.md`, shaped like
  `templates/user-story.template.md`, with numbered acceptance criteria (AC1, AC2).
- Gherkin `.feature` files are fine too; keep one story per file.

## Requirement -> plan -> test

1. Read every story in `requirements/`.
2. For each acceptance criterion, write one scenario in the plan for that area and
   type: functional in `specs/test-plans/`, visual in `specs/vr-test-plans/`, API in
   `specs/api-test-plans/` (one plan per area, per type - do not mix types), in
   Given/When/Then form, naming the outcome to assert.
3. Tag each scenario with its source: `Traceability: STORY-001 / AC2`.
4. The generator carries that tag into the test as annotations
   (`{ annotation: [{ type: 'story', description: 'STORY-001' }, { type: 'ac', description: 'AC2' }] }`),
   so a report can show which ACs are covered.
5. The reviewer checks that every acceptance criterion has at least one test and
   that no test asserts something outside its criterion.

## Rules

- Generate only from acceptance criteria written in `requirements/`, and from what
  you verify live against the app. Never invent a requirement or an outcome.
- If a criterion cannot be tested as written (ambiguous, needs data you do not
  have), say so and stop; do not guess an interpretation.
- Keep one area per plan file, and one type per plan (functional / visual / API); a story can span areas and types.
