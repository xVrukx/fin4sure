import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/images/logo.jpeg";
import {CgProfile, } from "react-icons/cg"
import {GiHamburgerMenu} from "react-icons/gi"
import { IoMdLogOut, IoIosHome, IoIosClose } from "react-icons/io"
import {MdInsights} from "react-icons/md"

export default function Navbar() {
  const [userNavtogel, setusernavtogel] = useState("");
  const [clientMenutogel, setclientMenutogel] = useState(false)
  const [brokerMenutogel, setbrokerMenutogel] = useState(false)
  const [adminMenutogel, setadminMenutogel] = useState(false)
  const { logout, setlogout } = useState("");

  useEffect(
    async () => {
      const res = await fetch("http://localhost:5000/auth/navbar",{
        method : "GET",
        headers : {"content-Type":"application/json"},
      })
      if(!res.ok){
        return res.json({message : "error occored while getting the client type"})
      }
      const data = await res.json()
      setusernavtogel(data)
    },
    []
  )


  return (
    <header className="w-full bg-white border-b border-blue-100">

{/*----------------------------- normal homepage nav after login signing -----------------------------*/}
      {(userNavtogel === "not_user") && (<div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/*----------------------------- Logo left side of the nav -----------------------------*/}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Finn4sure – Smart Loan Marketplace"
            className="h-25 w-auto"
          />
        </Link>
        {/* ---------------------------------------------------------- */}


        {/* ----------------------------- main nave for no login signup ----------------------------- */}
        <nav className="hidden md:flex items-center gap-6 text-slate-700">
          <Link to="/" className="hover:text-blue-700 transition">
            Home
            
          </Link>
          <Link to="/products" className="hover:text-blue-700 transition">
            Loans
          </Link>
          <Link to="/calculator" className="hover:text-blue-700 transition">
            Calculator
          </Link>
          <Link
            to="/broker-register"
            className="hover:text-blue-700 transition"
          >
            Become a Partner
          </Link>
        </nav>
        {/* ---------------------------------------------------------- */}


        {/* ----------------------------- right side for the nav -----------------------------*/}
        <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/login"
                className="text-slate-700 hover:text-blue-700 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-blue-700 font-medium hover:underline transition"
              >
                Sign Up
              </Link>
            </div>
            
          <Link
            to="/apply"
            className="hidden md:inline-block px-4 py-2 rounded-md text-white font-medium
                       bg-linear-to-r from-blue-700 via-teal-600 to-emerald-500
                       hover:from-blue-800 hover:via-teal-700 hover:to-emerald-600
                       transition"
          >
            Apply Now
          </Link>
        </div>
        {/* ---------------------------------------------------------- */}
      </div>)}
{/* -------------------------------------------------------------------------------------------------------------------- */}


{/* ----------------------------- client nav after login signing ----------------------------- */}
      {(userNavtogel ==="client") && (<div className="flex item-center m-2 justify-between">
        <button className="flex justify-center">
          <CgProfile size={40} color="black"/>
        </button>

        <h1 className="text-blue-500 ">Fin4sure</h1>

        <button value={clientMenutogel} onClick={(e) => {setclientMenutogel(e.target.value)}}>
          <GiHamburgerMenu size={40} color="black"/>
        </button>

        {(clientMenutogel)&&(
          <div className="flex item-center h-48 w-72">
            <button className="m-2 p-1" onClick={"/"}>
              <IoIosHome size={30} color="black"/>
            </button>
            <button className="m-2 p-1" value={logout} onClick={(e) => {setlogout(e.target.value)}}>
              <IoMdLogOut size={30} color="black"/>
            </button>
            <button className="m-2 p-1" value={closeclient} onClick={(e) => {setcloseclient(e.target.value)}}>
              <IoIosClose size={30} color="black"/>
            </button>
          </div>
      )}
      </div>)}
{/* -------------------------------------------------------------------------------------------------------------------- */}


{/* ----------------------------- broker nav after login signing ----------------------------- */}
      {(userNavtogel ==="broker") && (<div className="flex item-center m-2 justify-between">
        <button className="flex justify-center">
          <CgProfile size={40} color="black"/>
        </button>

        <h1 className="text-blue-500 ">Fin4sure</h1>

        <button value={clientMenutogel} onClick={(e) => {setclientMenutogel(e.target.value)}}>
          <GiHamburgerMenu size={40} color="black"/>
        </button>

        {(clientMenutogel)&&(
          <div className="flex item-center h-48 w-72">
            <button className="m-2 p-1" onClick={"/"}>
              <IoIosHome size={30} color="black"/>
            </button>
            <button className="m-2 p-1" value={logout} onClick={(e) => {setlogout(e.target.value)}}>
              <IoMdLogOut size={30} color="black"/>
            </button>
            <button className="m-2 p-1" value={closeclient} onClick={(e) => {setcloseclient(e.target.value)}}>
              <IoIosClose size={30} color="black"/>
            </button>
          </div>
      )}
      </div>)}
{/* -------------------------------------------------------------------------------------------------------------------- */}


{/* ----------------------------- admin nav after login signing ----------------------------- */}
      {(userNavtogel ==="admin") && (<div className="flex item-center m-2 justify-between">
        <button className="flex justify-center">
          <CgProfile size={40} color="black"/>
        </button>

        <h1 className="text-blue-500 ">Fin4sure</h1>

        <button value={clientMenutogel} onClick={(e) => {setclientMenutogel(e.target.value)}}>
          <GiHamburgerMenu size={40} color="black"/>
        </button>

        {(clientMenutogel)&&(
          <div className="flex item-center h-48 w-72">
            <button className="m-2 p-1" onClick={"/"}>
              <IoIosHome size={30} color="black"/>
            </button>
            <button className="m-2 p-1" value={logout} onClick={(e) => {setlogout(e.target.value)}}>
              <IoMdLogOut size={30} color="black"/>
            </button>
            <button className="m-2 p-1" value={closeclient} onClick={(e) => {setcloseclient(e.target.value)}}>
              <IoIosClose size={30} color="black"/>
            </button>
          </div>
      )}
      </div>)}
{/* -------------------------------------------------------------------------------------------------------------------- */}
    </header>
  );
}
