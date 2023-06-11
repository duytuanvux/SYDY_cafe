import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axios";
import { ItemType } from "../../Interfaces/ItemInterface";

export const getItems = createAsyncThunk("getItems", async () => {
  const response = await instance.get("/item/getAllItem");
  return response.data;
});
export const removeItem = createAsyncThunk(
  "removeItem",
  async (item: ItemType, { dispatch }) => {
    const response = await instance.delete(`/item/removeItem/${item._id}`);
    dispatch(getItems());
    return response.data;
  }
);
export const addItem = createAsyncThunk(
  "addItem",
  async (item: ItemType, { dispatch }) => {
    const response = await instance.post(`/item/addItem`, item);
    dispatch(getItems());
    return response.data;
  }
);

export const editItem = createAsyncThunk(
  "editItem",
  async (item: ItemType, { dispatch }) => {
    const response = await instance.post(`/item/editItem/${item._id}`, item);
    dispatch(getItems());
    return response.data;
  }
);
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
