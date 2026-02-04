// ----------------------------------- imports -----------------------------------
import { data, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/images/logo.jpeg";
import {CgProfile, } from "react-icons/cg";
import {GiHamburgerMenu} from "react-icons/gi";
import { CiCalculator2 } from "react-icons/ci";
import { AiFillProduct } from "react-icons/ai";
import { IoMdLogOut, IoIosHome, IoIosClose } from "react-icons/io";
import {MdInsights, MdDashboard} from "react-icons/md";
// ----------------------------------------------------------------------
export default function Navbar() {

// ----------------------------------- usestate, navigate values -----------------------------------
  const [userNavtogel, setusernavtogel] = useState("admin");
  const [clientMenutogel, setclientMenutogel] = useState(false);
  const [profile, setProfile] = useState({
  name: "",
  number: "",
  email: "",
  password: ""
  });
  const [brokerMenutogel, setbrokerMenutogel] = useState(false);
  const [adminMenutogel, setadminMenutogel] = useState(false);
    const Navigate = useNavigate();
// ----------------------------------------------------------------------

// ----------------------------------- useffect for getting user role -----------------------------------
  useEffect(() => {
    const userRole = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/login",{
        method : "GET",
        credentials : "include",
        headers : {"content-Type":"application/json"},
      });
      if(!res.ok){
        throw new Error("error occored while getting the client type");
        ;
      };
      const data = await res.json();
      setusernavtogel(data);
    } catch(e) {
      throw new Error(e);
    };
    };
    userRole();
  },
  []
  );
// ------------------------------------------------------------------------------------------------------


// ---------------------------------------- user profile detail -----------------------------------------
const userProfile = async() => {
  const res = await fetch("http://localhost/auth/user/profile",{
    method : "GET",
    credentials : "include",
    headers : {"content-Type" : "application/json"}
  })
  if(!res.ok) {
    throw new Error("error occored while fetching the profile");
  }
  const data = await res.json()
  setProfile(data)
}
// ------------------------------------------------------------------------------------------------------


// ----------------------------------- useffect for client, broker, admin navigation -----------------------------------
const redirectTohome = async () => {
  Navigate("/");
};

const redirectTobrokerDashboard = async () => {
  Navigate("/Broker-dashboard");
};

const redirectTobrokerInsight = async () => {
  Navigate("/Broker-insights");
};

const redirectToadminDashboard = async () => {
  Navigate("/Admin-dashboard");
};

const redirectToadminInsight = async () => {
  Navigate("/Admin-insights");
};

const redirectToproduct = async () => {
  Navigate("/products");
};

const redirectToEMIcalculator = async () => {
  Navigate("/EMI-calculator");
};

const redirectTologout = async () => {
    try{
      const res = await fetch(`http://localhost:5000/auth/logout`,{
      method : "POST",
      credentials : "include",
      headers : {"content-Type" : "application/json"}
    });
    if(!res.ok) {
      throw new Error("error occored while logging out");;
    };
  } catch(e) {
    throw new Error("cannot read respose for logging out");;
};
  Navigate("/login");

};
// ------------------------------------------------------------------------------------------------------


// ------------------------------------ client toggle -----------------------------------
const Clienttoggle = async() => {
  setclientMenutogel(!clientMenutogel)
}
// ------------------------------------------------------------------------------------------------------

// ------------------------------------ broker toggle -----------------------------------
const Brokertoggle = async() => {
  setbrokerMenutogel(!brokerMenutogel)
}
// ------------------------------------------------------------------------------------------------------

// ------------------------------------ admin toggle -----------------------------------
const Admintoggle = async() => {
  setadminMenutogel(!adminMenutogel)
}
// ------------------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------------------
  return (
    <header className="w-full bg-white border-b border-blue-100">

{/*----------------------------- normal homepage nav after login signing -----------------------------*/}
      {(userNavtogel ==="")&&(<div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
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
          <Link to="/EMI-calculator" className="hover:text-blue-700 transition">
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
      {(userNavtogel ==="client") && (<div className="flex items-center justify-between px-4 py-2 w-full">

        {/* profile */}
        <div className="w-20 flex flex-col items-center gap-1">
          
          <CgProfile size={26} />
        </div>

        {/* branding */}
        <div className="flex items-center justify-between">
        <img src={logo} className="h-20 w-auto" />
        <h1 className="flex-1 text-center font-semibold text-blue-600 text-4xl">
         Fin4sure
        </h1>
        </div>

        {/* tools */}
        <div className="w-16 flex justify-end">
          <button onClick={Admintoggle}>
            <GiHamburgerMenu size={30} />
          </button>
        </div>


        {(clientMenutogel)&&(
          <div className="absolute right-2 top-16 bg-white shadow-lg rounded-xl p-3 w-48 flex flex-col gap-2 border">

            <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 text-sm" onClick={redirectTohome}>{/* redirect to home */}
              <IoIosHome/> Home 
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 text-sm" onClick={redirectToproduct}>{/* redirect to Products */}
              <AiFillProduct/> Products 
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 text-sm" onClick={redirectToEMIcalculator}>{/* redirect to EMI Calculator */}
              <CiCalculator2/>EMI Calculator 
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 text-sm text-red-600" onClick={redirectTologout}>{/* redirect to Logout */}
              <IoMdLogOut/> Logout 
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 text-sm" onClick={Clienttoggle}>
              <IoIosClose/>               
            </button>
          </div>
      )}
      </div>)}
{/* -------------------------------------------------------------------------------------------------------------------- */}


{/* ----------------------------- broker nav after login signing ----------------------------- */}
      {(userNavtogel ==="broker") && (<div className="flex items-center justify-between px-4 py-2 w-full">

        {/* profile */}
        <div className="w-20 flex flex-col items-center gap-1">
          
          <CgProfile size={26} />
        </div>

        {/* branding */}
        <div className="flex items-center justify-between">
        <img src={logo} className="h-20 w-auto" />
        <h1 className="flex-1 text-center font-semibold text-blue-600 text-4xl">
         Fin4sure
        </h1>
        </div>

        {/* tools */}
        <div className="w-16 flex justify-end">
          <button onClick={Admintoggle}>
            <GiHamburgerMenu size={30} />
          </button>
        </div>


        {(brokerMenutogel)&&(
          <div className="absolute right-2 top-16 bg-white shadow-lg rounded-xl p-3 w-48 flex flex-col gap-2 border">

            <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 text-sm" onClick={redirectTobrokerDashboard}>{/* redirect to dashboard */}
              <MdDashboard/> Dashboard 
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 text-sm" onClick={redirectTobrokerInsight}>{/* redirect to insghits */}
              <MdInsights/> Insights 
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 text-sm" onClick={redirectToproduct}>{/* redirect to Products */}
              <AiFillProduct/> Products 
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 text-sm" onClick={redirectToEMIcalculator}>{/* redirect to EMI Calculator */}
              <CiCalculator2/>EMI Calculator 
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 text-sm text-red-600" onClick={redirectTologout}>{/* redirect to Logout */}
              <IoMdLogOut/> Logout 
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 text-sm" onClick={Brokertoggle}>
              <IoIosClose/>
            </button>
          </div>
      )}
      </div>)}
{/* -------------------------------------------------------------------------------------------------------------------- */}


{/* ----------------------------- admin nav after login signing ----------------------------- */}
      {(userNavtogel ==="admin") && (<div className="flex items-center justify-between px-4 py-2 w-full">

        {/* profile */}
        <div className="w-20 flex flex-col items-center gap-1">
          
          <CgProfile size={26} />
        </div>

        {/* branding */}
        <div className="flex items-center justify-between">
        <img src={logo} className="h-20 w-auto" />
        <h1 className="flex-1 text-center font-semibold text-blue-600 text-4xl">
         Fin4sure
        </h1>
        </div>

        {/* tools */}
        <div className="w-16 flex justify-end">
          <button onClick={Admintoggle}>
            <GiHamburgerMenu size={30} />
          </button>
        </div>

        {(adminMenutogel)&&(
          <div className="absolute right-2 top-16 bg-white shadow-lg rounded-xl p-3 w-48 flex flex-col gap-2 border">
            
            <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 text-sm" onClick={redirectToadminDashboard}>{/* redirect to dashboard */}
              <MdDashboard/> Dashboard 
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 text-sm" onClick={redirectToadminInsight}>{/* redirect to insghits */}
              <MdInsights/> Insights 
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 text-sm" onClick={redirectToproduct}>{/* redirect to Products */}
              <AiFillProduct/> Products 
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 text-sm" onClick={redirectToEMIcalculator}>{/* redirect to EMI Calculator */}
              <CiCalculator2/> EMI Calculator 
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 text-sm text-red-600" onClick={redirectTologout}>{/* redirect to Logout */}
              <IoMdLogOut/> Logout 
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 text-sm" onClick={Admintoggle}>
              <IoIosClose/>
            </button>
          </div>
      )}
      </div>)}
{/* -------------------------------------------------------------------------------------------------------------------- */}
    </header>
  );
}
