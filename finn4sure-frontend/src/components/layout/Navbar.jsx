import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/images/logo.jpeg";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdLogOut, IoIosHome, IoIosClose } from "react-icons/io";

export default function Navbar() {
  const [userNavtogel, setusernavtogel] = useState("");
  const [clientMenutogel, setclientMenutogel] = useState(false);
  const [brokerMenutogel, setbrokerMenutogel] = useState(false);
  const [adminMenutogel, setadminMenutogel] = useState(false);

  useEffect(() => {
    const fetchNavbar = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/navbar", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Navbar fetch failed");
        const data = await res.json();
        setusernavtogel(data);
      } catch (err) {
        console.error(err);
        setusernavtogel("not_user");
      }
    };

    fetchNavbar();
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/login";
  };

  const MobileMenu = ({ close }) => (
    <div className="absolute top-14 right-2 bg-white shadow-md rounded-md p-3 flex gap-4 z-50">
      <Link to="/">
        <IoIosHome size={28} />
      </Link>
      <button onClick={handleLogout}>
        <IoMdLogOut size={28} />
      </button>
      <button onClick={close}>
        <IoIosClose size={28} />
      </button>
    </div>
  );

  return (
    <header className="w-full bg-white border-b border-blue-100">

{/* ----------------------------- NOT LOGGED IN ----------------------------- */}
      {userNavtogel === "not_user" && (
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Fin4sure" className="h-10 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-slate-700">
            <Link to="/">Home</Link>
            <Link to="/products">Loans</Link>
            <Link to="/calculator">Calculator</Link>
            <Link to="/broker-register">Become a Partner</Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-4">
              <Link to="/login">Login</Link>
              <Link to="/signup" className="text-blue-700 font-medium">
                Sign Up
              </Link>
            </div>
            <Link
              to="/apply"
              className="hidden md:inline-block px-4 py-2 rounded-md text-white
              bg-linear-to-r from-blue-700 via-teal-600 to-emerald-500"
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}

{/* ----------------------------- CLIENT ----------------------------- */}
      {userNavtogel === "client" && (
        <div className="relative flex items-center justify-between p-3">
          <CgProfile size={40} />
          <h1 className="text-blue-500 font-semibold">Fin4sure</h1>
          <button onClick={() => setclientMenutogel(v => !v)}>
            <GiHamburgerMenu size={36} />
          </button>
          {clientMenutogel && (
            <MobileMenu close={() => setclientMenutogel(false)} />
          )}
        </div>
      )}

{/* ----------------------------- BROKER ----------------------------- */}
      {userNavtogel === "broker" && (
        <div className="relative flex items-center justify-between p-3">
          <CgProfile size={40} />
          <h1 className="text-blue-500 font-semibold">Fin4sure</h1>
          <button onClick={() => setbrokerMenutogel(v => !v)}>
            <GiHamburgerMenu size={36} />
          </button>
          {brokerMenutogel && (
            <MobileMenu close={() => setbrokerMenutogel(false)} />
          )}
        </div>
      )}

{/* ----------------------------- ADMIN ----------------------------- */}
      {userNavtogel === "admin" && (
        <div className="relative flex items-center justify-between p-3">
          <CgProfile size={40} />
          <h1 className="text-blue-500 font-semibold">Fin4sure</h1>
          <button onClick={() => setadminMenutogel(v => !v)}>
            <GiHamburgerMenu size={36} />
          </button>
          {adminMenutogel && (
            <MobileMenu close={() => setadminMenutogel(false)} />
          )}
        </div>
      )}
    </header>
  );
}
