import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { ItemInCartType } from "../../Interfaces/ItemInterface";


const initialState = {
  cart: [],
} ;
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item: ItemInCartType) =>
          item._id === action.payload.id &&
          item.sugar === action.payload.sugar &&
          item.ice === action.payload.ice
      );
      if (itemInCart) {
        //@ts-ignore
        itemInCart.quantity += action.payload.quantity;
      } else {
        //@ts-ignore
        state.cart.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<ItemInCartType>) => {
      const itemInCartIndex = state.cart.findIndex(
        (item: ItemInCartType) =>
          item._id === action.payload._id &&
          item.sugar === action.payload.sugar &&
          item.ice === action.payload.ice
      );

      if (itemInCartIndex > -1) {
        state.cart.splice(itemInCartIndex, 1);
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const CartReducer = CartSlice.reducer;
export const { addToCart, removeItem, clearCart } = CartSlice.actions;
