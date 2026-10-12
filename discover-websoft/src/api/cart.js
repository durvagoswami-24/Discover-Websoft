import apiClient from "./client";

export async function getCartRequest() {
  const { data } = await apiClient.get("/cart");
  return data.cart;
}

export async function syncCartRequest(cart) {
  const { data } = await apiClient.put("/cart", { cart });
  return data.cart;
}

export async function getWishlistRequest() {
  const { data } = await apiClient.get("/wishlist");
  return data.wishlist;
}

export async function syncWishlistRequest(wishlist) {
  const { data } = await apiClient.put("/wishlist", { wishlist });
  return data.wishlist;
}
