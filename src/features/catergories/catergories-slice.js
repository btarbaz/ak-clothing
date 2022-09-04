import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCollectionAndDocument } from '../../utils/firebase/firebase.utils';
const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const getCategoriesThunk = createAsyncThunk(
  'categories/FETCH_CATEGORIES',
  async () => {
    try {
      const response = await getCollectionAndDocument();
      return response;
    } catch (error) {
      throw console.log(error.type);
    }
  }
);
export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: {
    [getCategoriesThunk.pending]: state => {
      state.isLoading = true;
    },
    [getCategoriesThunk.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.categories = payload;
    },
    [getCategoriesThunk.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const selectCategoriesMap = store =>
  store.persistedReducer.categories.categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;

    return acc;
  }, {});

export const selectIsLoading = store =>
  store.persistedReducer.categories.isLoading;
export default categoriesSlice.reducer;
