import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import { setCart } from "../../features/cart/cartSlice";
import { setWishlist } from "../../features/wishlist/wishlistSlice";
import {
  getCartRequest,
  syncCartRequest,
  getWishlistRequest,
  syncWishlistRequest,
} from "../../api/cart";

const isValidItem = (item) => item && item.slug && item.price != null;

// Mounted once near the top of the app (see App.jsx). Renders nothing --
// this component's whole job is keeping Redux cart/wishlist state and
// the backend in sync for whoever is currently logged in.
export default function CartWishlistSync() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const wasLoggedIn = useRef(false);
  const isPulling = useRef(false);
  const pushTimer = useRef(null);

  // One-time cleanup on app start: older/interrupted saves could have
  // left malformed entries (missing slug/price) in the persisted
  // cart or wishlist. Left as-is, those inflate the header's item
  // count while the Cart/Wishlist pages (which do need the full
  // shape) quietly skip them -- badge says 5, page says empty. Strip
  // them here once, so every part of the app agrees on the same list.
  useEffect(() => {
    if (cartItems.some((item) => !isValidItem(item))) {
      dispatch(setCart(cartItems.filter(isValidItem)));
    }
    if (wishlistItems.some((item) => !isValidItem(item))) {
      dispatch(setWishlist(wishlistItems.filter(isValidItem)));
    }
    // Run once on mount only -- this is a one-time migration, not an
    // ongoing watcher (the reducers already dedupe/validate new adds).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On login (and on every app load while already logged in, since a
  // saved token restores the session automatically): reconcile with
  // whatever's saved on the backend for this account.
  //
  // This used to just overwrite local state with the backend's copy
  // whenever it had anything saved. Two problems with that: (1) any
  // malformed item that had been pushed to the backend before item
  // validation existed would come right back down and silently
  // reappear (badge count and page content going out of sync again),
  // and (2) a click made right as this pull was in flight could get
  // wiped out the moment the pull resolved and overwrote it.
  //
  // Now: validate what comes back, merge it with whatever's already
  // local (so an in-flight click never gets lost -- local wins on a
  // slug conflict, since it's the more recent action), and push the
  // merged result back up so backend and local always end up agreeing.
  useEffect(() => {
    const justLoggedIn = user && !wasLoggedIn.current;
    wasLoggedIn.current = !!user;

    if (!justLoggedIn) return;

    function mergeBySlug(backendList, localList, identityFor = (item) => item.slug) {
      const bySlug = new Map();
      backendList
        .filter(isValidItem)
        .forEach((item) => bySlug.set(identityFor(item), item));
      // Local entries win on conflict -- they represent whatever the
      // person just did, which should never be silently discarded.
      localList
        .filter(isValidItem)
        .forEach((item) => bySlug.set(identityFor(item), item));
      return Array.from(bySlug.values());
    }

    async function pullAndMerge() {
      isPulling.current = true;

      try {
        const [backendCart, backendWishlist] = await Promise.all([
          getCartRequest(),
          getWishlistRequest(),
        ]);

        const mergedCart = mergeBySlug(backendCart, cartItems);
        dispatch(setCart(mergedCart));
        await syncCartRequest(mergedCart);

        const mergedWishlist = mergeBySlug(
          backendWishlist,
          wishlistItems,
          (item) => `${item.serviceSlug || ""}/${item.subServiceSlug || ""}/${item.slug}`
        );
        dispatch(setWishlist(mergedWishlist));
        await syncWishlistRequest(mergedWishlist);
      } catch (err) {
        console.error("Cart/wishlist sync on login failed:", err);
      } finally {
        isPulling.current = false;
      }
    }

    pullAndMerge();
    // Only re-run when login state changes, not on every cart edit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // On every subsequent cart change while logged in, push it up
  // (debounced, so rapid quantity clicks don't fire a request each time).
  useEffect(() => {
    if (!user || isPulling.current) return;

    clearTimeout(pushTimer.current);
    pushTimer.current = setTimeout(() => {
      syncCartRequest(cartItems).catch((err) =>
        console.error("Cart sync failed:", err)
      );
    }, 600);

    return () => clearTimeout(pushTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems, user]);

  // Same debounced push, for wishlist changes.
  useEffect(() => {
    if (!user || isPulling.current) return;

    const timer = setTimeout(() => {
      syncWishlistRequest(wishlistItems).catch((err) =>
        console.error("Wishlist sync failed:", err)
      );
    }, 600);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishlistItems, user]);

  return null;
}
