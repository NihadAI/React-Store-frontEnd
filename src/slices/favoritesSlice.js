import { createSlice } from "@reduxjs/toolkit";
const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: JSON.parse(localStorage.getItem("favorites")) || [],
  },
  reducers: {
    addToFavorites: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
    removeFromFavorites: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((product) => product.id !== productId);
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
  },
});
export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;