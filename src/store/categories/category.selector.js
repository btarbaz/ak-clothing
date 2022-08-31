import { createSelector } from 'reselect';

// Application of reselect libray to optimize our selector which were re rendering even on same inputs

// step 1: first get the reducer
const selectCategoriesReducer = state => state.categories;

// step 2: memoize create selector if input does not change and if change run selector with values
export const selectCategories = createSelector(
  [selectCategoriesReducer],
  categoriesSlice => categoriesSlice.categories
);

// step 3: memoize create selector of categoriesMap
export const selectCategoriesMap = createSelector(
  [selectCategories],
  categories =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;

      return acc;
    }, {})
);
export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesReducer],
  categoriesSlice => categoriesSlice.isLoading
);

// export const selectCategoriesMap = state => {
//   console.log('selector fired');
//   return state.categories.categories.reduce((acc, category) => {
//     const { title, items } = category;
//     acc[title.toLowerCase()] = items;

//     return acc;
//   }, {});
// };
