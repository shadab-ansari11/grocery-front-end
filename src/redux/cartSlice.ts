import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string | number;
  price: number;
  quantity: number;
  totalPrice: number;
  name?: string;
  image?: string;
  [key: string]: any;
}

interface CartState {
  cartItems: CartItem[];
  totalAmount: number;
  totalCount: number;
}

const initialState: CartState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")!)
    : [],
  totalAmount: 0,
  totalCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity" | "totalPrice"> & { quantity?: number }>) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      const quantityToAdd = action.payload.quantity || 1;

      if (existingItem) {
        existingItem.quantity += quantityToAdd;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        const newItem: CartItem = {
          ...(action.payload as any),
          quantity: quantityToAdd,
          totalPrice: action.payload.price * quantityToAdd,
        };
        state.cartItems.push(newItem as any);
      }
      state.totalCount = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action: PayloadAction<string | number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      state.totalCount = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    increaseQuantity: (state, action: PayloadAction<string | number>) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        item.totalPrice = item.quantity * item.price;
      }
      state.totalCount = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseQuantity: (state, action: PayloadAction<string | number>) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.quantity * item.price;
      }
      state.totalCount = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalCount = 0;
      localStorage.removeItem("cartItems");
    },
    getCartTotal: (state) => {
      state.totalCount = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  getCartTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
