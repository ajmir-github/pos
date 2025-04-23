import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tab } from "../types/server";

type TabState = {
  status: "idle" | "loading" | "error";
  tabs: Tab[];
};
const initialState: TabState = {
  status: "loading",
  tabs: [],
};

export default createSlice({
  name: "tab",
  initialState,
  reducers: {
    loadTabs: (state, { payload }: PayloadAction<Tab[]>) => {
      state.status = "idle";
      state.tabs = payload;
    },
    updateTab: (state, { payload }: PayloadAction<Tab>) => {
      state.status = "idle";
      state.tabs = state.tabs.map((tab) =>
        tab.id === payload.id ? payload : tab
      );
    },
    deleteTab: (state, { payload }: PayloadAction<{ id: number }>) => {
      state.status = "idle";
      state.tabs = state.tabs.filter((tab) => tab.id !== payload.id);
    },
    clearTabs: (state) => {
      state.status = "idle";
      state.tabs = [];
    },
  },
});
