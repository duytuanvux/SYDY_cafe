import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../../axios";
import { AppDispatch } from "../store";

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

export const getItems = () => async (dispatch: AppDispatch) => {
  try {
    const response = await instance.get("/drinks");
    dispatch(saveItems(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const ItemReducer = ItemSlice.reducer;
