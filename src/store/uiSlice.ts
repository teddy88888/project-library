import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Category } from "@/types";

type UiState = {
  search: string;
  category: Category | "All";
  rating: number | null;
};

const initialState: UiState = { search: "", category: "All", rating: null };

const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => { state.search = action.payload; },
    setCategory: (state, action: PayloadAction<UiState["category"]>) => { state.category = action.payload; },
    setRating: (state, action: PayloadAction<number | null>) => { state.rating = action.payload; },
    resetFilters: () => initialState,
  },
});

export const { setSearch, setCategory, setRating, resetFilters } = slice.actions;
export default slice.reducer;