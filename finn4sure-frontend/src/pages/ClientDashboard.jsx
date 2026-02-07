import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IoMdNotifications,
  IoIosArrowDown,
  IoMdCard,
  IoMdTimer,
  IoMdCheckmarkCircle,
  IoMdCloseCircle,
  IoMdLogOut
} from "react-icons/io";
import { CiCalculator2 } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { LOAN_PRODUCTS } from "../utils/constants";

export default function ClientDashboard() {
  const [user, setUser] = useState(null);
  const [leads, setLeads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    fetchLeads();
  }, []);

  async function fetchProfile() {
    const res = await fetch(
      "http://localhost:5000/api/auth/profile",
      { credentials: "include" }
    );

    if (!res.ok) {
      navigate("/login");
      return;
    }

    setUser(await res.json());
  }

  async function fetchLeads() {
    const res = await fetch(
      "http://localhost:5000/api/client/my-leads",
      { credentials: "include" }
    );

    if (res.ok) {
      setLeads(await res.json());
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // ---------- helpers ----------
  const productName = (id) =>
    LOAN_PRODUCTS.find(p => p.id === id)?.name || id;

  const approved = leads.filter(l => l.status === "approved").length;
  const pending = leads.filter(l => l.status === "pending").length;
  const rejected = leads.filter(l => l.status === "rejected").length;

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

      {/* Header — unchanged */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your loan applications and track progress
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT SIDE — unchanged layout */}
          <div className="lg:col-span-2 space-y-6">

            {/* Applications card — SAME UI */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <IoMdCard />
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
                        Applied on {new Date(
                          lead.createdAt
                        ).toLocaleDateString()}
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

            {/* Stats card — SAME UI */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                <div className="text-3xl font-bold text-green-600">
                  {approved}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Approved
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {pending}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Pending
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                <div className="text-3xl font-bold text-red-600">
                  {rejected}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Rejected
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT SIDEBAR — unchanged */}
          <div className="space-y-6">

            <div className="bg-linear-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <CgProfile size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl">{user.name}</h3>
                  <p className="text-blue-100 text-sm">
                    Client ID: {user._id?.slice(-6)}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phone:</span>
                  <span className="font-medium">{user.number}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
