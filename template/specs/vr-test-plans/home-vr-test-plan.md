# Home - visual regression test plan

Visual plan, separate from the functional one. Baselines are Linux
(`yarn snapshots:linux`), stored next to the spec in `home.visual.spec.ts-snapshots/`.
Extend the table with the next free VR id; do not open a second file for this area.

## Metadata

| Field       | Value                              |
| ----------- | ---------------------------------- |
| Spec file   | `tests/visual/home.visual.spec.ts` |
| Page object | `utils/pageObjects/HomePage.ts`    |

## Snapshots

| ID    | Title           | State                       | Notes                       |
| ----- | --------------- | --------------------------- | --------------------------- |
| VR-01 | Home, full view | Loaded, animations disabled | Mask dynamic regions if any |

## Do not capture

- Live-data regions (dates, counters, avatars) unless masked.
