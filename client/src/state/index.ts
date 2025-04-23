import { configureStore } from "@reduxjs/toolkit";
import authState from "./authState";
import tabState from "./tabState";
import { useDispatch, useSelector, useStore } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authState.reducer,
    tab: tabState.reducer,
  },
});

export const authActions = authState.actions;
export const tabActions = tabState.actions;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<typeof store>();
