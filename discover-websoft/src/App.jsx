import { useLayoutEffect } from "react";
import { Routes, Route, useLocation, useParams } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";
import ServicePage from "./pages/ServicePage";
import PlanPage from "./pages/PlanPage";
import SubServicePage from "./pages/SubServicePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import CartWishlistSync from "./components/system/CartWishlistSync";
function ScrollToTopOnNavigation() {
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.hash) return;

    // Browser history may restore the old scroll position after navigation.
    // Disable that restoration and reset before and after the next paint.
    window.history.scrollRestoration = "manual";
    const resetScroll = () => {
      const root = document.documentElement;
      const previousBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      root.scrollTop = 0;
      root.style.scrollBehavior = previousBehavior;
    };

    resetScroll();
    const frame = window.requestAnimationFrame(resetScroll);
    return () => window.cancelAnimationFrame(frame);
  }, [location.key, location.hash]);

  return null;
}

function RoutedPlanPage() {
  const { serviceSlug, subServiceSlug, planSlug } = useParams();
  const pageKey = `${serviceSlug}:${subServiceSlug || ""}:${planSlug}`;

  // PlanPage owns route-specific state; remount it when its route params change.
  return <PlanPage key={pageKey} />;
}

function App() {
  return (
    <>
      <ScrollToTopOnNavigation />
      <CartWishlistSync />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/shop" element={<Shop />} />

        <Route path="/shop/:serviceSlug" element={<ServicePage />}/>
        <Route
  path="/shop/:serviceSlug/:subServiceSlug"
  element={<SubServicePage />}
/>
        <Route
  path="/service/:serviceSlug/:planSlug"
  element={<RoutedPlanPage />}
/>

<Route
  path="/service/:serviceSlug/:subServiceSlug/:planSlug"
  element={<RoutedPlanPage />}
/>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route path="/blog" element={<h1>Blog</h1>} />
        <Route path="/contact" element={<h1>Contact Us</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;


