# Shared components

Component page objects reused across pages (modals, rows, cards). Extend
`BaseComponentPage` with a root locator so children never cross-match. Example:

```ts
import type { Locator } from "@playwright/test";
import { BaseComponentPage } from "../baseComponentPage.js";

export class AddToCartModal extends BaseComponentPage {
  readonly viewCart: Locator = this.root.getByRole("link", { name: "View Cart" });
}
```
