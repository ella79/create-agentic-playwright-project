# Requirements

Drop user stories here, one file per story: `STORY-<id>.md`, in the shape of
`templates/user-story.template.md`. Each story lists numbered acceptance criteria
(AC1, AC2, ...).

The planner reads this folder first. For every acceptance criterion it writes one
test scenario into `specs/`, tagged with the story and AC id so coverage is
traceable back to the requirement. If this folder is empty, the planner falls
back to exploring the running app.

Grounding rule: agents generate tests only from acceptance criteria written here
and from what they verify live against the app. They never invent requirements.

Gherkin `.feature` files work too if you prefer classic BDD; keep one story per
file and number the scenarios so they map to ACs.
