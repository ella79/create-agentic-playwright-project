/**
 * Central URL map. Page objects navigate through these, never hardcoded strings,
 * so a route change is a one-line edit. Functions build parameterized paths;
 * urlPattern holds regexes for asserting dynamic URLs after an action.
 */
export const url = {
  home: "/",
  products: "/products",
  productDetail: (productId: number) => `/product_details/${productId}`,
  cart: "/view_cart",
  login: "/login",
  signup: "/signup",
  checkout: "/checkout",
  payment: "/payment",
} as const;

export const urlPattern = {
  orderPlaced: /\/payment_done\/\d+/,
} as const;
