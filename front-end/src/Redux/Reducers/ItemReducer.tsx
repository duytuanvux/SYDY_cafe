import { createSlice } from "@reduxjs/toolkit";

const ItemSlice = createSlice({
  name: "item",
  initialState: {
    items: [],
  },
  reducers: {
    saveItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { saveItems } = ItemSlice.actions;

export const ItemReducer = ItemSlice.reducer;
