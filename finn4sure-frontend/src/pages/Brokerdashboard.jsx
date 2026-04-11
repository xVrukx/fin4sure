import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>ID:</span>
                  <span>{user.brokerId}</span>
                </div>

                <div className="flex justify-between">
                  <span>Email:</span>
                  <span>{user.email}</span>
                </div>

                <div className="flex justify-between">
                  <span>Phone:</span>
                  <span>{user.number}</span>
                </div>

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
