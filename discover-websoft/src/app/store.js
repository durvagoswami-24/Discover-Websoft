import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import wishlistReducer from "../features/wishlist/wishlistSlice";
import cartReducer from "../features/cart/cartSlice";

// redux-persist's own "redux-persist/lib/storage" import doesn't resolve
// correctly under Vite's ESM handling (throws "storage.getItem is not a
// function"). A small manual localStorage adapter, matching the same
// getItem/setItem/removeItem Promise-based interface, sidesteps that
// import entirely and works reliably.
const storage = {
  getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
  setItem: (key, value) =>
    Promise.resolve(window.localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(window.localStorage.removeItem(key)),
};

const rootReducer = combineReducers({
  wishlist: wishlistReducer,
  cart: cartReducer,
});

// Only cart/wishlist are persisted -- if other slices get added to the
// store later, they stay session-only unless explicitly added here.
const persistConfig = {
  key: "discover-websoft",
  storage,
  whitelist: ["cart", "wishlist"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // redux-persist dispatches some non-serializable actions internally --
  // this tells RTK's default serializability check to ignore just those,
  // not to disable the check entirely.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
