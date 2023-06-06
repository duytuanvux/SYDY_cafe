import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axios";
import { ItemType } from "../../Interfaces/ItemInterface";

export const getItems = createAsyncThunk("getItems", async () => {
  const response = await instance.get("/drinks");
  return response.data;
});
export const removeItem = createAsyncThunk(
  "removeItem",
  async (item: ItemType, { dispatch }) => {
    const response = await instance.delete(`/drinks/${item.id}`);
    dispatch(getItems());
    return response.data;
  }
);

export const editItem = createAsyncThunk(
  "editItem",
  async (item: ItemType, { dispatch }) => {
    const response = await instance.put(`/drinks/${item.id}`, item);
    dispatch(getItems());
    return response.data;
  }
);
interface Items {
  items: [];
  loading: boolean;
}
const initialState = {
  items: [],
  loading: false,
} as Items;
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
  },
});

export const ItemReducer = ItemSlice.reducer;
