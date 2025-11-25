import { lazy } from "react";

// Main pages
export const Home = lazy(() => import("../../pages/Home"));
export const ProductList = lazy(() =>
  import("../../pages/products/ProductList")
);
export const ProductDetail = lazy(() =>
  import("../../pages/products/ProductDetail")
);
export const Cart = lazy(() => import("../../pages/checkout/Cart"));
export const Checkout = lazy(() => import("../../pages/checkout/Checkout"));
export const Orders = lazy(() => import("../../pages/orders/Orders"));
