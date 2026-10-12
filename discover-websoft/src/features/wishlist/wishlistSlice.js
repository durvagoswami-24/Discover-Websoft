import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState: {
    items: [],
  },

  reducers: {
    addToWishlist(state, action) {
      const exists = state.items.find(
        (item) =>
          item.slug === action.payload.slug &&
          item.serviceSlug === action.payload.serviceSlug &&
          (item.subServiceSlug || "") ===
            (action.payload.subServiceSlug || "")
      );

      if (!exists) {
        state.items.push(action.payload);
      }
    },

    removeFromWishlist(state, action) {
      const target = action.payload;
      state.items = state.items.filter((item) => {
        if (typeof target === "string") return item.slug !== target;
        return !(
          item.slug === target.slug &&
          item.serviceSlug === target.serviceSlug &&
          (item.subServiceSlug || "") === (target.subServiceSlug || "")
        );
      });
    },

    // Replaces the whole wishlist -- used when pulling a logged-in
    // user's saved wishlist down from the backend.
    setWishlist(state, action) {
      state.items = action.payload;
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  setWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
