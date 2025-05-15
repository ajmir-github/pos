import { create } from "zustand";

type DataState<Data = any> = {
  data?: Data;
  error?: {
    message: string;
    code?: number;
  };
};

type DocSync<Data = any> = DataState<Data | null> & {
  init: (data: Data) => void;
  update: (data: Data) => void;
  setData: (data: Data | null) => void;
  setError: (message: string) => void;
  setState: (state: DataState<Data>) => void;
  reset: () => void;
};

type DocsSync<Data extends { id: number }> = DataState<Data[]> & {
  int: (list: Data[]) => void;
  insert: (data: Data) => void;
  update: (data: Data) => void;
  remove: (id: number) => void;
  setData: (data: Data[]) => void;
  setError: (message: string) => void;
  setState: (state: DataState<Data[]>) => void;
  reset: () => void;
};

export function createDocSyncState<Data>() {
  return create<DocSync<Data>>((set) => ({
    init: (data) => set({ data, error: undefined }),
    update: (data) => set({ data }),
    setState: (state) => set(state),
    setData: (data) => set({ data }),
    setError: (message) => set({ error: { message } }),
    reset: () => set({ data: undefined, error: undefined }),
  }));
}
export function createDocsSyncState<Data extends { id: number }>() {
  return create<DocsSync<Data>>((set) => ({
    int: (data) => set({ data, error: undefined }),
    setData: (data) => set({ data }),

    insert: (newData) =>
      set((state) =>
        state.data
          ? {
              ...state,
              list: [...state.data, newData],
            }
          : state
      ),
    update: (updatedData) =>
      set((state) =>
        state.data
          ? {
              ...state,
              list: state.data.map((data) =>
                data.id === updatedData.id ? updatedData : data
              ),
            }
          : state
      ),
    remove: (id) =>
      set((state) =>
        state.data
          ? {
              ...state,
              list: state.data.filter((data) => data.id !== id),
            }
          : state
      ),
    setError: (message) => set({ error: { message } }),
    setState: (state) => set(state),
    reset: () =>
      set({
        data: undefined,
        error: undefined,
      }),
  }));
}
