import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlineUser,
  HiOutlineMenuAlt3,
  HiOutlineX,
} from "react-icons/hi";

import logo from "../assets/DWS LOGO PNG.png";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Shop", path: "/shop" },
  { name: "Blog", path: "/blog" },
  { name: "Contact Us", path: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + (item.quantity || 1), 0)
  );

  const iconLinks = [
    { Icon: HiOutlineHeart, path: "/wishlist", count: wishlistCount, label: "Wishlist" },
    { Icon: HiOutlineShoppingCart, path: "/cart", count: cartCount, label: "Cart" },
  ];

  // Close the dropdown when clicking anywhere outside of it.
  useEffect(() => {
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserIconClick = () => {
    if (user) {
      // Logged in -- toggle a dropdown with account/logout options,
      // rather than logging the person out on a single click.
      setUserMenuOpen((v) => !v);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    setUserMenuOpen(false);
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#F5B041] bg-[#242323]">
      {/* Desktop Header */}
          <div className="mx-auto max-w-7xl px-6 h-22 w-full sm:px-10 lg:px-16">
        <div className="flex items-center justify-between">

          {/* LEFT : LOGO */}
          <div className="w-45 shrink-0 ">
            <NavLink to="/">
              <img
                src={logo}
                alt="Discover Websoft"
                className="w-25 object-contain"
              />
            </NavLink>
          </div>

          {/* CENTER : NAVIGATION */}
          <nav className="hidden flex-1 justify-center lg:flex">
            <ul className="flex items-center gap-10 xl:gap-14">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink to={item.path}>
                    {({ isActive }) => (
                      <span
                        className={`relative pb-2 text-[18px] font-medium transition-all duration-300 ${
                          isActive
                            ? "text-[#F5B041]"
                            : "text-white hover:text-[#F5B041]"
                        }`}
                      >
                        {item.name}

                        {isActive && (
                          <span className="absolute bottom-0 left-0 h-0.5 w-full rounded bg-[#F5B041]" />
                        )}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* RIGHT : ICONS */}
          <div className="hidden w-45 shrink-0 justify-end gap-4 lg:flex">
            {iconLinks.map(({ Icon, path, count, label }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                title={label}
                className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-[#F5B041] shadow-[0_0_15px_rgba(255,255,255,0.08)] transition-all duration-300 hover:border-[#F5B041] hover:bg-[#F5B041] hover:text-white"
              >
                <Icon size={20} />
                {count > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F5B041] px-1 text-[11px] font-bold text-[#242323]">
                    {count > 99 ? "99+" : count}
                  </span>
                )}
              </button>
            ))}

            <div className="relative" ref={userMenuRef}>
              <button
                onClick={handleUserIconClick}
                title={user ? user.name : "Log in"}
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-[#F5B041] shadow-[0_0_15px_rgba(255,255,255,0.08)] transition-all duration-300 hover:border-[#F5B041] hover:bg-[#F5B041] hover:text-white"
              >
                <HiOutlineUser size={20} />
              </button>

              {user && userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-[#F5B041]/30 bg-[#242323] shadow-lg">
                  <p className="truncate border-b border-white/10 px-4 py-3 text-[13px] text-white/70">
                    Signed in as{" "}
                    <span className="font-semibold text-white">
                      {user.name}
                    </span>
                  </p>
                  <NavLink
                    to="/account"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-3 text-[14px] text-white transition hover:bg-white/5 hover:text-[#F5B041]"
                  >
                    My Account
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-3 text-left text-[14px] text-white transition hover:bg-white/5 hover:text-[#F5B041]"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="ml-auto text-white lg:hidden"
          >
            {open ? (
              <HiOutlineX size={30} />
            ) : (
              <HiOutlineMenuAlt3 size={30} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden bg-[#242323] transition-all duration-300 lg:hidden ${
          open ? "max-h-125" : "max-h-0"
        }`}
      >
        <ul className="space-y-6 px-6 py-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-lg transition ${
                    isActive
                      ? "text-[#F5B041]"
                      : "text-white hover:text-[#F5B041]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
          {iconLinks.map(({ path, label, count }) => (
            <li key={path}>
              <NavLink
                to={path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 text-lg transition ${
                    isActive
                      ? "text-[#F5B041]"
                      : "text-white hover:text-[#F5B041]"
                  }`
                }
              >
                {label}
                {count > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F5B041] px-1 text-[11px] font-bold text-[#242323]">
                    {count > 99 ? "99+" : count}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}