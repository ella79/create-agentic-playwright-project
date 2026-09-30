# STORY-001: Sign in with email and password

**As a** returning user
**I want** to sign in with my email and password
**so that** I can reach my dashboard.

## Acceptance criteria

- **AC1** — Given I am on /login, when I submit valid credentials, then I land on /dashboard and see my name in the header.
- **AC2** — Given I am on /login, when I submit a wrong password, then I stay on /login and see an "invalid credentials" message, and no dashboard content loads.
- **AC3** — Given the email field is empty, when I submit, then the form blocks and marks the email field required.

## Notes

- Out of scope: password reset, social sign-in.
- Data / preconditions: a seeded user exists (see seed.spec.ts).
