import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GenreOrCategoryState {
  genreIdOrCategoryName: string;
  page: number;
  searchQuery: string;
}

export const genreOrCategory = createSlice({
  name: "genreOrCategory",
  initialState: {
    genreIdOrCategoryName: "",
    page: 1,
    searchQuery: "",
  } as GenreOrCategoryState,
  reducers: {
    selectGenreOrCategory: (state, action) => {
      state.genreIdOrCategoryName = action.payload;
      state.searchQuery = "";
    },
    searchMovie: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.page = 1;
    },
  },
});

export const { selectGenreOrCategory, searchMovie } = genreOrCategory.actions;

export default genreOrCategory.reducer;
