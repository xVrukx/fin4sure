import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { MdPeople, MdBusiness, MdAssessment, MdTrendingUp } from "react-icons/md";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({});
  const [brokers, setBrokers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [leadFilter, setLeadFilter] = useState("pending");

  useEffect(() => {
    loadAll();
  }, [leadFilter]);

  async function loadAll() {
    await fetchStats();
    await fetchBrokers();
    await fetchLeads();
  }

  async function fetchStats() {
    const res = await fetch(
      "http://localhost:5000/api/admin/stats",
      { credentials: "include" }
    );
    if (!res.ok) return navigate("/login");
    setStats(await res.json());
  }

  async function fetchBrokers() {
    const res = await fetch(
      "http://localhost:5000/api/admin/brokers",
      { credentials: "include" }
    );
    if (res.ok) setBrokers(await res.json());
  }

  async function fetchLeads() {
    const res = await fetch(
      `http://localhost:5000/api/admin/leads?status=${leadFilter}`,
      { credentials: "include" }
    );
    if (res.ok) setLeads(await res.json());
  }

  async function updateBrokerStatus(brokerId, status) {
    await fetch("http://localhost:5000/api/admin/broker-status", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brokerId, status })
    });
    fetchBrokers();
  }

  async function updateLeadStatus(leadId, status) {
    await fetch("http://localhost:5000/api/admin/lead-status", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId, status })
    });
    fetchLeads();
    fetchStats();
  }

  const StatusBadge = ({ status }) => {
    const map = {
      approved: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
      pending: "bg-yellow-100 text-yellow-700"
    };
    return (
      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${map[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500">Platform overview & approvals</p>
          </div>

          <div className="flex items-center gap-4">
            <IoMdNotifications size={22} className="text-gray-600" />
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <CgProfile className="text-purple-600" size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard label="Total Clients" value={stats.totalClients} icon={<MdPeople />} color="blue" />
          <StatCard label="Total Brokers" value={stats.totalBrokers} icon={<MdBusiness />} color="green" />
          <StatCard label="Pending Brokers" value={stats.pendingBrokers} icon={<MdAssessment />} color="orange" />
          <StatCard label="Pending Leads" value={stats.pendingLeads} icon={<MdTrendingUp />} color="purple" />
        </div>

        {/* Broker Approvals */}
        <div className="bg-white rounded-2xl border shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">Broker Approvals</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="p-4 text-left">Broker</th>
                  <th>Broker ID</th>
                  <th>Clients</th>
                  <th>Leads</th>
                  <th>Status</th>
                  <th className="text-right pr-6">Actions</th>
                </tr>
              </thead>

              <tbody>
                {brokers.map(b => (
                  <tr key={b.brokerId} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-medium">{b.name}</td>
                    <td>{b.brokerId}</td>
                    <td>{b.clientCount}</td>
                    <td>{b.leadCount}</td>
                    <td><StatusBadge status={b.status} /></td>
                    <td className="text-right pr-6 space-x-2">
                      <button
                        onClick={() => updateBrokerStatus(b.brokerId, "approved")}
                        className="px-3 py-1 text-xs font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Approve
                      </button>
                      <button
                        onClick={() => updateBrokerStatus(b.brokerId, "rejected")}
                        className="px-3 py-1 text-xs font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700">
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Approvals */}
        <div className="bg-white rounded-2xl border shadow-sm">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">Lead Applications</h2>

            <select
              value={leadFilter}
              onChange={e => setLeadFilter(e.target.value)}
              className="border px-3 py-2 rounded-lg text-sm"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="p-4 text-left">Client</th>
                  <th>Product</th>
                  <th>Broker</th>
                  <th>Status</th>
                  <th className="text-right pr-6">Actions</th>
                </tr>
              </thead>

              <tbody>
                {leads.map(l => (
                  <tr key={l._id} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-medium">{l.name}</td>
                    <td>{l.product}</td>
                    <td>{l.broker_id}</td>
                    <td><StatusBadge status={l.status} /></td>
                    <td className="text-right pr-6 space-x-2">
                      <button
                        onClick={() => updateLeadStatus(l._id, "approved")}
                        className="px-3 py-1 text-xs font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Approve
                      </button>
                      <button
                        onClick={() => updateLeadStatus(l._id, "rejected")}
                        className="px-3 py-1 text-xs font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700">
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  const colors = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    orange: "text-orange-600 bg-orange-50",
    purple: "text-purple-600 bg-purple-50"
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-md transition">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[color]}`}>
        {icon}
      </div>
      <div className="mt-4 text-3xl font-bold">{value || 0}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}
