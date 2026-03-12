import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/images/logo.jpeg";

import { useAuth } from "../../context/AuthContext";

import { GiHamburgerMenu } from "react-icons/gi";
import { CiCalculator2 } from "react-icons/ci";
import { AiFillProduct } from "react-icons/ai";
import { IoMdLogOut, IoIosHome, IoIosClose } from "react-icons/io";
import { MdInsights, MdDashboard } from "react-icons/md";

export default function Navbar() {
  const { role, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const PublicLinks = () => (
    <>
      <Link className="nav-link" to="/">Home</Link>
      <Link className="nav-link" to="/products">Loans</Link>
      <Link className="nav-link" to="/EMI-calculator">Calculator</Link>
      <Link className="nav-link" to="/broker-register">Become a Partner</Link>
    </>
  );

  return (
    <header className="w-full bg-white border-b border-blue-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Fin4sure" className="h-24 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-slate-700 font-medium">
          {!isAuthenticated && <PublicLinks />}

          {isAuthenticated && role === "broker" && (
            <>
              <Link className="nav-link" to="/broker-dashboard">Dashboard</Link>
              <Link className="nav-link" to="/">Home</Link>
              {/* <Link className="nav-link" to="/products">Products</Link> */}
              <Link className="nav-link" to="/EMI-calculator">Calculator</Link>
            </>
          )}

          {isAuthenticated && role === "admin" && (
            <>
              <Link className="nav-link" to="/admin-dashboard">Dashboard</Link>
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/products">Products</Link>
              <Link className="nav-link" to="/EMI-calculator">Calculator</Link>
            </>
          )}

          {isAuthenticated && role === "client" && (
            <>
              <Link className="nav-link" to="/client-dashboard">Dashboard</Link>
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/products">Products</Link>
              <Link className="nav-link" to="/EMI-calculator">Calculator</Link>
            </>
          )}
        </nav>

        {/* Desktop auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg font-medium text-white
                           bg-linear-to-r from-blue-700 via-teal-600 to-emerald-500
                           hover:from-blue-800 hover:via-teal-700 hover:to-emerald-600
                           transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 rounded-lg font-medium
                           border border-[#d9a93d] text-[#d9a93d]
                           hover:bg-[#d9a93d]/10 transition"
              >
                Sign Up As A Customer
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-red-600 font-medium
                         hover:text-red-700 cursor-pointer transition"
            >
              <IoMdLogOut /> Logout
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-between w-8 h-6 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block h-1 w-full bg-slate-700 rounded transition-transform duration-300
                        ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          ></span>
          <span
            className={`block h-1 w-full bg-slate-700 rounded transition-opacity duration-300
                        ${menuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`block h-1 w-full bg-slate-700 rounded transition-transform duration-300
                        ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          ></span>
        </button>
      </div>

      {/* Mobile menu */}
      {/* Mobile menu */}
{menuOpen && (
  <div className="fixed inset-0 z-50 flex justify-end">
    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/30"
      onClick={() => setMenuOpen(false)}
    ></div>

    {/* Menu panel */}
    <div className="relative w-72 h-full bg-white p-6 flex flex-col gap-5
                    shadow-lg rounded-l-xl
                    transform transition-transform duration-200 ease-in-out">
      
      {/* Close button */}
      <button
        onClick={() => setMenuOpen(false)}
        className="self-end text-gray-600 hover:text-gray-900 transition"
      >
        <IoIosClose size={28} />
      </button>

      {/* Links */}
      {!isAuthenticated && (
        <>
          <PublicLinks />
          <Link to="/login" className="mobile-link text-gray-700 font-medium hover:text-blue-600 transition">
            Login
          </Link>
          <Link to="/signup" className="mobile-link text-gray-700 font-medium hover:text-blue-600 transition">
            Sign Up
          </Link>
        </>
      )}

      {isAuthenticated && role === "broker" && (
        <>
          <Link className="mobile-link flex items-center gap-2 text-gray-700 hover:text-blue-600 transition" to={`/${role}-dashboard`}>
            <MdDashboard /> Dashboard
          </Link>
          <Link className="mobile-link flex items-center gap-2 text-gray-700 hover:text-blue-600 transition" to={`/`}>
            <IoIosHome /> Home
          </Link>
          {/* <Link className="mobile-link flex items-center gap-2 text-gray-700 hover:text-blue-600 transition" to={`/${role}-insights`}>
            <MdInsights /> Insights
          </Link> */}
          <Link className="mobile-link flex items-center gap-2 text-gray-700 hover:text-blue-600 transition" to="/products">
            <AiFillProduct /> Products
          </Link>
          <Link className="mobile-link flex items-center gap-2 text-gray-700 hover:text-blue-600 transition" to="/EMI-calculator">
            <CiCalculator2 /> Calculator
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium cursor-pointer mt-auto transition"
          >
            <IoMdLogOut /> Logout
          </button>
        </>
      )}
      {isAuthenticated && role === "client" && (
        <>
          <Link className="mobile-link flex items-center gap-2 text-gray-700 hover:text-blue-600 transition" to={`/${role}-dashboard`}>
            <MdDashboard /> Dashboard
          </Link>
          <Link className="mobile-link flex items-center gap-2 text-gray-700 hover:text-blue-600 transition" to={`/`}>
            <IoIosHome /> Home
          </Link>
          <Link className="mobile-link flex items-center gap-2 text-gray-700 hover:text-blue-600 transition" to="/products">
            <AiFillProduct /> Products
          </Link>
          <Link className="mobile-link flex items-center gap-2 text-gray-700 hover:text-blue-600 transition" to="/EMI-calculator">
            <CiCalculator2 /> Calculator
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium cursor-pointer mt-auto transition"
          >
            <IoMdLogOut /> Logout
          </button>
        </>
      )}
      {isAuthenticated && role === "admin" && (
        <>
          <Link className="mobile-link flex items-center gap-2 text-gray-700 hover:text-blue-600 transition" to={`/${role}-dashboard`}>
            <MdDashboard /> Dashboard
          </Link>
          <Link className="mobile-link flex items-center gap-2 text-gray-700 hover:text-blue-600 transition" to={`/`}>
            <IoIosHome /> Home
          </Link>
          {/* <Link className="mobile-link flex items-center gap-2 text-gray-700 hover:text-blue-600 transition" to={`/${role}-insights`}>
            <MdInsights /> Insights
          </Link> */}
          <Link className="mobile-link flex items-center gap-2 text-gray-700 hover:text-blue-600 transition" to="/products">
            <AiFillProduct /> Products
          </Link>
          <Link className="mobile-link flex items-center gap-2 text-gray-700 hover:text-blue-600 transition" to="/EMI-calculator">
            <CiCalculator2 /> Calculator
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium cursor-pointer mt-auto transition"
          >
            <IoMdLogOut /> Logout
          </button>
        </>
      )}

    </div>
  </div>
)}

    </header>
  );
}
