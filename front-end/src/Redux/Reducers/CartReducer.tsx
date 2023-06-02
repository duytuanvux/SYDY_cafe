import { createSlice } from "@reduxjs/toolkit";
import { ItemType } from "../../Components/Item";

export interface ItemInCartType extends ItemType {
  quantity: number;

  sugar: string;
  ice: string;
}

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item: ItemInCartType) =>
          item.id === action.payload.id &&
          item.sugar === action.payload.sugar &&
          item.ice === action.payload.ice
      );
      if (itemInCart) {
        //@ts-ignore
        itemInCart.quantity++;
      } else {
        //@ts-ignore
        state.cart.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      console.log(action.payload);

      const itemInCartIndex = state.cart.findIndex(
        (item: ItemInCartType) =>
          item.id === action.payload.id &&
          item.sugar === action.payload.sugar &&
          item.ice === action.payload.ice
      );
      console.log(itemInCartIndex);

      if (itemInCartIndex > -1) {
        state.cart.splice(itemInCartIndex, 1);
      }
      console.log(state.cart);
    },
  },
});

export const CartReducer = CartSlice.reducer;
export const { addToCart, removeItem } = CartSlice.actions;
