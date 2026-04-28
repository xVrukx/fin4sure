import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import {
  IoMdNotifications,
  IoMdTimer,
  IoMdCheckmarkCircle,
  IoMdCloseCircle,
  IoMdCard
} from "react-icons/io";

import { IoPeople } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdAccountBalance, MdTrendingUp } from "react-icons/md";

import { LOAN_PRODUCTS } from "../utils/constants";

export default function BrokerDashboard() {
  const [user, setUser] = useState(null);
  const [clients, setClients] = useState([]);
  const [leads, setLeads] = useState([]);
  const [notifications] = useState(0);
  const [bClientToggle, setBclientToggle] = useState(false)

    // ---------------- FORM STATES (add client) ----------------
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [validateemail, setvalidateemail] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [brokerId, setBrokerId] = useState(""); // if refBy is broker
  const [gender, setgender] = useState("")

  const validateEmail = (e) => {
  const value = e.target.value;
  setEmail(value);
  setvalidateemail(validator.isEmail(value) ? "email is valid" : "email is invalid");
};

  const navigate = useNavigate();

  const toggle = async() => {
      setBclientToggle(!bClientToggle)
  }

  useEffect(() => {
    fetchProfile();
    fetchClients();
    fetchLeads();
  }, []);

  async function fetchProfile() {
    const res = await fetch(
      "https://fin4sure.onrender.com/api/auth/profile",
      { credentials: "include" }
    );

    if (!res.ok) return navigate("/login");
    setUser(await res.json());
  }

  const add_client = async() => {
    const res = await fetch("https://fin4sure.onrender.com/api/broker/addClients",{
      credentials: "include",
      method : "POST",
      headers : {"Content-Type" : "Application/json"},
      body : JSON.stringify({
        name:fullName,
        email:email,
        gender:gender,
        number:number,
        brokerId:user.brokerId
      })
    })
    if (!res.ok) throw new Error("Failed to add client");
  }

  async function fetchClients() {
    const res = await fetch(
      "https://fin4sure.onrender.com/api/broker/getRefferedClients",
      { credentials: "include" }
    );

    if (res.ok) {
      const data = await res.json();
      setClients(data.clients || []);
    }
  }

  async function fetchLeads() {
    const res = await fetch(
      "https://fin4sure.onrender.com/api/broker/getBrokerLeads",
      { credentials: "include" }
    );

    if (res.ok) {
      const data = await res.json();
      setLeads(data.leads || []);
    }
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // -------- helpers --------
  const productName = (id) =>
    LOAN_PRODUCTS.find(p => p.id === id)?.name || id;

  const pending = leads.filter(l => l.status === "pending").length;
  const approved = leads.filter(l => l.status === "approved").length;

  const StatusBadge = ({ status }) => {
    if (status === "approved")
      return (
        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
          Approved
        </span>
      );

    if (status === "rejected")
      return (
        <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
          Rejected
        </span>
      );

    return (
      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
        Processing
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER — unchanged */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Broker Dashboard, {user.name}!
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your clients, leads and track performance
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className="rounded-2xl bg-green-500 transition
               duration-500 hover:bg-green-700 hover:shadow px-3 py-2"
              onClick={toggle}>Add Client</button>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CgProfile size={20} className="text-green-600" />
              </div>
              <span className="font-medium text-gray-900 hidden sm:block">
                Broker ID: {user.brokerId}
              </span>
            </div>

          </div>
        </div>
      </div>

{/* overlay */}
  {bClientToggle && (
    <div
      onClick={() => toggle}
      className="fixed inset-0 bg-black/30 z-40"
    />
  )}
  {/* Client apply Drawer */}
  <div
    className={`fixed top-0 right-0 h-full w-xl  bg-white z-50
    shadow-2xl rounded-l-2xl
    transform transition-transform duration-300 ease-in-out
    ${bClientToggle ? "translate-x-0" : "translate-x-full"}`}
  >
        {/* Header */}
    <div className="p-4 border-b flex items-center justify-between">
      <h2 className="text-lg font-semibold">Add clients</h2>
      <button onClick={toggle}>✕</button>
    </div>
    <div className="max-w-md mx-auto w-full bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">
          Add your <span className="text-blue-700">Client's</span> account
        </h1>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="mt-6 space-y-5">
          {/* NAME */}
          <input
            type="text"
            placeholder="Your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={validateEmail}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
           <p style={{ color: validator.isEmail(email) ? 'green' : 'red' }}>
               {validateemail}
           </p>

          {/* GENDER */}
            <select name="Gender" id="Gender" value={gender} onChange={(e) => {setgender(e.target.value)}}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option value="">---- Select a gender ----</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

          {/* MOBILE NUMBER */}
          <input
            type="tel"
            placeholder="10-digit mobile number"
            value={number}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              if (val.length <= 10) setNumber(val);
            }} 
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* BROKER ID INPUT */}
            {/* <input
              type="text"
              placeholder="Enter Broker ID"
              value={brokerId}
              onChange={(e) => setBrokerId(e.target.value)}

              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            /> */}

          {/* SIGNUP BUTTON */}
          <button
            type="button"
            onClick={add_client}
            className="w-full py-3 rounded-lg font-medium text-white
                       bg-linear-to-r from-blue-700 via-teal-600 to-emerald-500
                       hover:from-blue-800 hover:via-teal-700 hover:to-emerald-600
                       transition disabled:opacity-50"
          >
            Submit
          </button>

      </div>
    </div>
  </div>


      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT — unchanged layout */}
          <div className="lg:col-span-2 space-y-6">

            {/* Stats cards — SAME UI */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {clients.length}
                </div>
                <div className="text-sm text-gray-600 mt-1 flex justify-center gap-2">
                  <IoPeople /> Total Clients
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {pending}
                </div>
                <div className="text-sm text-gray-600 mt-1 flex justify-center gap-2">
                  <IoMdTimer /> Pending Leads
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
                <div className="text-3xl font-bold text-green-600">
                  {approved}
                </div>
                <div className="text-sm text-gray-600 mt-1 flex justify-center gap-2">
                  <MdTrendingUp /> Approved Loans
                </div>
              </div>

            </div>

            {/* Recent Clients — SAME UI */}
            <div className="bg-white rounded-xl shadow-sm border p-8">
              <h2 className="text-2xl font-bold mb-6">Recent Leads</h2>

              <div className="space-y-4">

                {leads.length === 0 && (
                  <p className="text-gray-500">No leads yet.</p>
                )}

                {leads.slice(0, 5).map((lead) => (
                  <div key={lead.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">

                    <div>
                      <p className="font-semibold">{lead.name}</p>
                      <p className="text-sm text-gray-600">
                        {productName(lead.product)}
                      </p>
                    </div>

                    <StatusBadge status={lead.status} />
                  </div>
                ))}

              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR — unchanged */}
          <div className="space-y-6">

            <div className="bg-linear-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-xl mb-4">{user.name}</h3>

              {/* broker id */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>ID:</span>
                  <span>{user.brokerId}</span>
                </div>

                {/* Email */}
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span>{user.email}</span>
                </div>
                
                {/* gender */}
                <div>
                  <label className="block text-gray-200">Gender</label>
                  <input type="text" disabled value={user.gender}/>
                </div>
                
                {/* Phone */}
                <div className="flex justify-between">
                  <span>Phone:</span>
                  <span>{user.number}</span>
                </div>

                {/* status */}
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="px-2 py-1 rounded-full bg-white/20 text-xs">
                    {user.status}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
