import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
  },
});
export const selectCurrentUser = store =>
  store.persistedReducer.user.currentUser;
export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
