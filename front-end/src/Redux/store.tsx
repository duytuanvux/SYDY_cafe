import { configureStore } from "@reduxjs/toolkit";
import { ItemReducer } from "./Reducers/ItemReducer";
import { CartReducer } from "./Reducers/CartReducer";
import { authReducer } from "./Reducers/AuthReducer";

export const store = configureStore({
  reducer: {
    item: ItemReducer,
    cart: CartReducer,
    auth: authReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
