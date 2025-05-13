import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { Moon, Sun } from "lucide-react";
import { setDarkMode, setLightMode } from "../Utills/theme";
import { assets } from "../assets/assets";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, setShowLogin, logout, credit } = useContext(AppContext);
  const [isDark, setIsDark] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setIsDark(theme === "dark");
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      setLightMode();
    } else {
      setDarkMode();
    }
    setIsDark(!isDark);
  };

  return (
    <div className="flex items-center justify-between py-4">
      {/* Logo */}
      <div className="flex items-center justify-between py-4 px-4">
        {/* Logo and Features side-by-side */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <Link to={"/"}>
            <img
              src={assets.Logo}
              className="w-20 sm:w-32 lg:w-40 hover:scale-105 transition-all duration-700"
              alt="Logo"
            />
          </Link>

          {/* Features Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-blue-100 px-2 py-2 rounded hover:bg-gray-100"
            >
              Features ▼
            </button>

            {dropdownOpen && (
              <div
                className="absolute left-0 mt-2 w-56 bg-white text-black dark:text-white shadow-md rounded z-10"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <Link
                  to="/result"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  Text to Image Generator
                </Link>
                <Link
                  to="/image-to-animation"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  <div
                    onClick={() =>
                      alert("this feature is currently unavailable...")
                    }
                  >
                    Image to Animation
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Empty center spacer */}
      <div></div>

      {/* Auth / Credit UI */}
      <div>
        {user ? (
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Credit Button */}
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700"
            >
              <img
                src={assets.credit_star}
                className="w-10 drop-shadow-sm"
                alt="Credits"
              />
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Credit left : {credit}
              </p>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-7 h-7 text-white" />
              ) : (
                <Moon className="w-7 h-7 text-gray-600" />
              )}
            </button>

            {/* Profile Name */}
            <p className="text-xl sm:text-sm max-sm:hidden pl-4 text-black dark:text-white">
              Hii, {user.name}
            </p>

            {/* Profile Image */}
            <div className="relative group">
              <img className="w-10 drop-shadow" src={assets.user} alt="User" />
              <div className="absolute hidden group-hover:block top-0 right-0 left-0.4 z-10 text-black rounded pt-12">
                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                  <li
                    className="px-2 py-1 cursor-pointer pr-10"
                    onClick={logout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5 text-2xl">
            <p
              className="cursor-pointer"
              onClick={() => {
                navigate("/buy");
              }}
            >
              Pricing
            </p>
            <button
              onClick={() => setShowLogin((prev) => !prev)}
              className="bg-zinc-800 dark: text-white px-7 py-2 sm:px-10 rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
