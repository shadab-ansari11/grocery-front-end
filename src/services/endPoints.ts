const VITE_APP_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const endPoints = {
  // Auth endpoints
  login: "/auth/login",
  register: "/auth/register",

  // Product endpoints
  getAllProducts: "/products",
  getProductById: (id: string | number) => `/products/${id}`,

  // Cart endpoints
  getCart: "/cart",
  addToCart: "/cart",
  updateCart: "/cart",

  // Order endpoints
  createOrder: "/orders",
  getUserOrders: (userId: string | number) => `/orders/user/${userId}`,
  getOrderById: (id: string | number) => `/orders/${id}`,
};

export { VITE_APP_BASE_URL, endPoints };
export default endPoints;
