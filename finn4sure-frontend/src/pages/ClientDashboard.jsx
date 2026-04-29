import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IoMdCard,
  IoMdTimer,
  IoMdCheckmarkCircle,
  IoMdCloseCircle,
} from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { LOAN_PRODUCTS } from "../utils/constants";
import { states, districtsByState } from "../components/Statedata";

export default function ClientDashboard() {
  const [user, setUser] = useState(null);
  const [leads, setLeads] = useState([]);
  const [editing, setEditing] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [gender, setgender] = useState("");
  const [address, setaddress] = useState("");
  const [pincode, setpincode] = useState("");
  const [district, setdistrict] = useState("");
  const [state, setstate] = useState("");
  const [number, setnumber] = useState("");
  // const [pan_card, setpan_card] = useState("");
  const [otp, setotp] = useState(""); // for phone updates
  const [otpVerified, setOtpVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    fetchLeads();
  }, []);

  // Fetch profile
  const fetchProfile = async() => {
    try {
    const res = await fetch("https://fin4sure.onrender.com/api/auth/profile", {
      method: "GET",
      headers: { "content-type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      navigate("/login");
      return;
    }

    const data = await res.json();
    setUser(data || "");
    setname(data.name || "");
    setemail(data.email || "");
    setgender(data.gender || "");
    setnumber(data.number || "");
    setaddress(data.address || "");
    setpincode(data.pincode || "");
    setstate(data.state || "");
    setdistrict(data.district || "");
    // setpan_card(data.pan_card || "");
    } catch(e) {
      alert(e.message);
    }
  }

  // Fetch client leads
  const fetchLeads = async() => {
    try{
      const res = await fetch("https://fin4sure.onrender.com/api/client/my-leads", {
      method: "GET",
      headers: { "content-type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      throw new error("failed to fetch lead");
    }
    const data = await res.json();
    setLeads(data);
  } catch(e) {
    alert(e.message);
  }
  }

  const sendOTP = async () => {
    try {
      if(!/^\d{10}$/.test(number)){
        alert("Please enter valid 10 digit number");
        return;
      }
      const res = await fetch(
        "https://fin4sure.onrender.com/api/auth/update-number-otp",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ number }),
        },
      );
      if (!res.ok) {
        throw new Error("faield to send otp");
      }
      alert("OTP was sent successfully")
      await res.json();
    } catch (e) {
      alert(e.message);
    }
  };

  const verifyOTP = async () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }
    try {
      const res = await fetch(
        "https://fin4sure.onrender.com/api/auth/verify-update-number-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ number, otp }),
        },
      );
      if (!res.ok) {
        throw new Error("Invalid OTP");
      }
      setOtpVerified(true); // ✅ ADD THIS
      alert("Phone verified successfully!");
    } catch (e) {
      alert(e.message);
    }
  };

  // Update profile
  const handleUpdate = async () => {
    if(number!==user.number && !otpVerified){
      alert("You must verify the new phone number before saving")
    }
    try {
      const res = await fetch("https://fin4sure.onrender.com/api/auth/profileupdate", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
                              name: name,
                              email: email,
                              address: address,
                              pincode: pincode,
                              district: district,
                              state: state,
                              number: number,
                              otp_verified: otpVerified
                            })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      alert("Profile updated successfully!");
      setEditing(false);
      fetchProfile(); // refresh profile
    } catch (err) {
      alert(err.message);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // ---------- helpers ----------
  const productName = (id) =>
    LOAN_PRODUCTS.find((p) => p.id === id)?.name || id;

  const approved = leads.filter((l) => l.status === "approved").length;
  const pending = leads.filter((l) => l.status === "pending").length;
  const rejected = leads.filter((l) => l.status === "rejected").length;

  const StatusBadge = ({ status }) => {
    if (status === "approved")
      return (
        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full flex items-center gap-1">
          <IoMdCheckmarkCircle size={16} />
          Approved
        </span>
      );
    if (status === "rejected")
      return (
        <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full flex items-center gap-1">
          <IoMdCloseCircle size={16} />
          Rejected
        </span>
      );
    return (
      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full flex items-center gap-1">
        <IoMdTimer size={16} />
        Processing
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your loan applications and profile
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-900 hidden sm:block">
                Refer Code: {user.client_id}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE — Applications */}
          <div className="lg:col-span-2 space-y-6">
            {/* Applications card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                My Applications
              </h2>
              <div className="space-y-4">
                {leads.length === 0 && (
                  <p className="text-gray-500">
                    No applications submitted yet.
                  </p>
                )}
                {leads.map((lead) => (
                  <div
                    key={lead._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">
                        {productName(lead.product)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Applied on{" "}
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <StatusBadge status={lead.status} />
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <Link
                  to="/apply"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  New Application
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                <div className="text-3xl font-bold text-green-600">
                  {approved}
                </div>
                <div className="text-sm text-gray-600 mt-1">Approved</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {pending}
                </div>
                <div className="text-sm text-gray-600 mt-1">Pending</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                <div className="text-3xl font-bold text-red-600">
                  {rejected}
                </div>
                <div className="text-sm text-gray-600 mt-1">Rejected</div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — Profile */}
          <div className="space-y-6">
            <div className="bg-linear-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <CgProfile size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl">{user.name}</h3>
                </div>
              </div>

              {/* Profile form */}
              <div className="space-y-3 text-sm">
                {editing ? (
                  <>
                  {/* name */}
                    <div>
                      <label className="block text-gray-200">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        className="mt-1 p-2 w-full rounded text-black"
                      />
                    </div>
                    {/* Profile form */}
                    <div>
                      <label className="block text-gray-200">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        className="mt-1 p-2 w-full rounded text-black"
                      />
                    </div>
                    {/* gender */}
                    <div>
                      <label className="block text-gray-200">Gender</label>
                      <input type="text" disabled value={gender}/>
                    </div>

                    {/* address */}
                    <div>
                      <label className="block text-gray-200">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={(e) => setaddress(e.target.value)}
                        className="mt-1 p-2 w-full rounded text-black"
                      />
                    </div>
                    {/* pincode */}
                    <div>
                      <label className="block text-gray-200">pincode</label>
                      <input
                      type="text"
                      value={pincode}
                      onChange={(e) => {setpincode(e.target.value.replace(/\D/g,''))}}
                      className="mt-1 p-2 w-full rounded text-black"
                      />
                    </div>
                    {/* state */}
                    <div>
                      <label className="block text-gray-200">State</label>
                      <select
                      className="text-black rounded-2xl" name="state" id="state" value={state}
                      onChange={(e) => {
                        setstate(e.target.value)
                        setdistrict("")
                      }}
                      >
                      <option value="" className="text-black rounded-2xl">---- select a State ----</option>
                      {states.map((s) => (
                        <option key={s} value={s} className="text-black rounded-2xl"> 
                        {s}
                      </option>
                      ))}
                    </select>
                    </div>
                    {/* district */}
                    <div>
                     <label className="block text-gray-200">District</label>
                      <select
                      name="district" id="district" className="text-black rounded-2xl" disabled={!state} value={district}
                      onChange={(e) => {setdistrict(e.target.value)}}>
                        <option value="" className="text-black rounded-2xl">---- select a district ----</option>
                        {state&&districtsByState[state].map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                        </select>
                    </div>

                    {/* phone */}
                    <div>
                      <label className="block text-gray-200">Phone</label>
                      <input
                        type="text"
                        name="number"
                        value={number}
                        onChange={(e) => {
                          setnumber(e.target.value);
                          setotp(""); // reset OTP if number changes
                          setOtpVerified(false); // ✅ IMPORTANT
                        }}
                        className="mt-1 p-2 w-full rounded text-black"
                      />
                    </div>

                    {/* Phone OTP */}
                    {number !== user.number && (
                      <div className="mt-2">
                        <label className="block text-gray-200">
                          OTP (required to update phone)
                        </label>
                        <div className="flex gap-2 mt-1">
                          <input
                            type="text"
                            value={otp}
                            onChange={(e) => setotp(e.target.value)}
                            className="p-2 rounded text-black flex-1"
                          />
                          <button
                            onClick={sendOTP}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                          >
                            Send OTP
                          </button>
                          <button
                            onClick={verifyOTP}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                          >
                            Verify OTP
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Save / Cancel */}
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={handleUpdate}
                        className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditing(false)}
                        className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span className="font-medium">{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phone:</span>
                      <span className="font-medium">{user.number}</span>
                    </div>
                    <button
                      onClick={() => setEditing(true)}
                      className="mt-4 bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
                    >
                      Edit Profile
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
