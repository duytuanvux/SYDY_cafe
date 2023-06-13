import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ItemType } from "../../Interfaces/ItemInterface";
import { instanceWithInterCeptor } from "../../axios";



interface Items {
  items: ItemType[];
  loading: boolean;
  searchItem: ItemType[];
}
const initialState = {
  items: [],
  loading: false,
  searchItem: [],
} as Items;

export const getItems = createAsyncThunk("getItems", async () => {
  const response = await instanceWithInterCeptor.get("/item/getAllItem");
  return response.data;
});
export const removeItem = createAsyncThunk(
  "removeItem",
  async (item: ItemType, { dispatch }) => {
    const response = await instanceWithInterCeptor.delete(`/item/removeItem/${item._id}`);
    dispatch(getItems());
    return response.data;
  }
);
export const addItem = createAsyncThunk(
  "addItem",
  async (item: ItemType, { dispatch }) => {
    const response = await instanceWithInterCeptor.post(`/item/addItem`, item);
    dispatch(getItems());
    return response.data;
  }
);

export const editItem = createAsyncThunk(
  "editItem",
  async (item: ItemType, { dispatch }) => {
 
    const response = await instanceWithInterCeptor.post(`/item/editItem/${item._id}`, item);
    dispatch(getItems());
    return response.data;
  }
);



const ItemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getItems.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getItems.fulfilled, (state, action) => {
      state.items = action.payload;
    });

    builder.addCase(removeItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeItem.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(editItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editItem.fulfilled, (state, action) => {
      (state.loading = false), console.log(action.payload);
    });

    builder.addCase(addItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addItem.fulfilled, (state, action) => {
      (state.loading = false), console.log(action.payload);
    });

    builder;
  },
});

export const ItemReducer = ItemSlice.reducer;
