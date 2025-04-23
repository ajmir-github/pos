import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tab } from "../types/server";

const initialState: Tab[] = [];

export default createSlice({
  name: "tabs",
  initialState,
  reducers: {
    loadTabs: (_, { payload }: PayloadAction<Tab[]>) => {
      return payload;
    },
    updateTab: (state, { payload }: PayloadAction<Tab>) => {
      return state.map((tab) => (tab.id === payload.id ? payload : tab));
    },
    deleteTab: (state, { payload }: PayloadAction<{ id: number }>) => {
      return state.filter((tab) => tab.id !== payload.id);
    },
    clearTabs: (_) => {
      return [];
    },
  },
});
