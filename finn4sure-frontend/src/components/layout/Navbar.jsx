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
  const { user, role, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const PublicLinks = () => (
    <>
      <Link to="/" className="hover:text-blue-700">Home</Link>
      <Link to="/products" className="hover:text-blue-700">Loans</Link>
      <Link to="/EMI-calculator" className="hover:text-blue-700">Calculator</Link>
      <Link to="/broker-register" className="hover:text-blue-700">
        Become a Partner
      </Link>
    </>
  );

  return (
    <header className="w-full bg-white border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Fin4sure" className="h-12 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-slate-700">
          {!isAuthenticated && <PublicLinks />}

          {isAuthenticated && role === "broker" && (
            <>
              <Link to="/broker-dashboard">Dashboard</Link>
              <Link to="/broker-insights">Insights</Link>
              <Link to="/products">Products</Link>
              <Link to="/EMI-calculator">Calculator</Link>
            </>
          )}

          {isAuthenticated && role === "admin" && (
            <>
              <Link to="/admin-dashboard">Dashboard</Link>
              <Link to="/admin-insights">Insights</Link>
              <Link to="/products">Products</Link>
              <Link to="/EMI-calculator">Calculator</Link>
            </>
          )}

          {isAuthenticated && role === "client" && (
            <>
               <Link to="/client-dashboard">Dashboard</Link>
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/EMI-calculator">Calculator</Link>
            </>
          )}
        </nav>

        {/* Desktop auth buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hover:text-blue-700">Login</Link>
              <Link to="/signup" className="text-blue-700 font-medium hover:underline">
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-600 flex items-center gap-1"
            >
              <IoMdLogOut /> Logout
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={() => setMenuOpen(true)}>
          <GiHamburgerMenu size={28} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/40 z-50">
          <div className="absolute right-0 top-0 h-full w-64 bg-white p-4 flex flex-col gap-4">

            <button onClick={() => setMenuOpen(false)} className="self-end">
              <IoIosClose size={28} />
            </button>

            {!isAuthenticated && (
              <>
                <PublicLinks />
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}

            {isAuthenticated && role === "broker" && (
              <>
                <Link to="/broker-dashboard"><MdDashboard /> Dashboard</Link>
                <Link to="/broker-insights"><MdInsights /> Insights</Link>
                <Link to="/products"><AiFillProduct /> Products</Link>
                <Link to="/EMI-calculator"><CiCalculator2 /> Calculator</Link>
                <button onClick={handleLogout} className="text-red-600 flex gap-2">
                  <IoMdLogOut /> Logout
                </button>
              </>
            )}

            {isAuthenticated && role === "admin" && (
              <>
                <Link to="/admin-dashboard"><MdDashboard /> Dashboard</Link>
                <Link to="/admin-insights"><MdInsights /> Insights</Link>
                <Link to="/products"><AiFillProduct /> Products</Link>
                <Link to="/EMI-calculator"><CiCalculator2 /> Calculator</Link>
                <button onClick={handleLogout} className="text-red-600 flex gap-2">
                  <IoMdLogOut /> Logout
                </button>
              </>
            )}

            {isAuthenticated && role === "client" && (
              <>
              <Link to="/client-dashboard"><MdDashboard /> Dashboard</Link>
                <Link to="/"><IoIosHome /> Home</Link>
                <Link to="/products"><AiFillProduct /> Products</Link>
                <Link to="/EMI-calculator"><CiCalculator2 /> Calculator</Link>
                <button onClick={handleLogout} className="text-red-600 flex gap-2">
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
