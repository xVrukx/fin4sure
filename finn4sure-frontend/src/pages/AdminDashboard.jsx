import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({});
  const [brokers, setBrokers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [leadFilter, setLeadFilter] = useState("pending");
  const [selectedBroker, setSelectedBroker] = useState(null);

  useEffect(() => {
    fetchStats();
    fetchBrokers();
    fetchLeads();
  }, [leadFilter]);

  async function fetchStats() {
    const res = await fetch("http://localhost:5000/api/admin/stats", {
      credentials: "include",
    });
    if (!res.ok) return navigate("/login");
    setStats(await res.json());
  }

  async function fetchBrokers() {
    const res = await fetch("http://localhost:5000/api/admin/brokers", {
      credentials: "include",
    });
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
      body: JSON.stringify({ brokerId, status }),
    });
    fetchBrokers();
    fetchStats();
  }

  async function updateLeadStatus(leadId, status) {
    await fetch("http://localhost:5000/api/admin/lead-status", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId, status }),
    });
    fetchLeads();
    fetchStats();
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-white to-white">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* Header */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            Admin Dashboard
          </h1>
          <p className="text-lg text-slate-600 mt-2">
            Overview of platform performance and pending approvals
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard label="Total Clients" value={stats.totalClients} color="blue" />
          <StatCard label="Total Brokers" value={stats.totalBrokers} color="teal" />
          <StatCard label="Pending Brokers" value={stats.pendingBrokers} color="amber" />
          <StatCard label="Pending Leads" value={stats.pendingLeads} color="indigo" />
        </div>

        {/* Brokers */}
<Section title="Broker Approvals">
  <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
    <table className="min-w-full text-sm text-left divide-y divide-slate-200">
      <thead className="bg-linear-to-r from-blue-100 via-blue-50 to-white text-slate-700">
        <tr>
          <th className="p-3 text-left">Broker</th>
          <th className="p-3 hidden sm:table-cell">Broker ID</th>
          <th className="p-3 hidden md:table-cell">Clients</th>
          <th className="p-3 hidden md:table-cell">Leads</th>
          <th className="p-3">Status</th>
          <th className="p-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-slate-200">
        {brokers.map((b) => (
          <tr key={b.brokerId} className="hover:bg-blue-50 transition">
            <td className="p-3 font-medium text-slate-800">{b.name}</td>
            <td className="p-3 hidden sm:table-cell">{b.brokerId}</td>
            <td className="p-3 hidden md:table-cell">{b.clientCount}</td>
            <td className="p-3 hidden md:table-cell">{b.leadCount}</td>
            <td className="p-3"><StatusBadge status={b.status} /></td>
            <td className="p-3 text-right space-x-2 flex justify-end">
              <ActionBtn onClick={() => setSelectedBroker(b)}>View</ActionBtn>
              <ActionBtn green onClick={() => updateBrokerStatus(b.brokerId, "approved")}>Approve</ActionBtn>
              <ActionBtn red onClick={() => updateBrokerStatus(b.brokerId, "rejected")}>Reject</ActionBtn>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</Section>

{/* Leads */}
<Section
  title="Lead Applications"
  right={
    <select
      value={leadFilter}
      onChange={(e) => setLeadFilter(e.target.value)}
      className="border rounded-md px-3 py-2 text-sm bg-white shadow-sm"
    >
      <option value="pending">Pending</option>
      <option value="approved">Approved</option>
      <option value="rejected">Rejected</option>
    </select>
  }
>
  <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
    <table className="min-w-full text-sm text-left divide-y divide-slate-200">
      <thead className="bg-linear-to-r from-teal-100 via-teal-50 to-white text-slate-700">
        <tr>
          <th className="p-3 text-left">Client</th>
          <th className="p-3 hidden sm:table-cell">Email</th>
          <th className="p-3 hidden sm:table-cell">Phone</th>
          <th className="p-3 hidden md:table-cell">PAN</th>
          <th className="p-3 hidden md:table-cell">Product</th>
          <th className="p-3 hidden lg:table-cell">Source</th>
          <th className="p-3">Status</th>
          <th className="p-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-slate-200">
        {leads.map((l) => (
          <tr key={l._id} className="hover:bg-teal-50 transition">
            <td className="p-3 font-medium">{l.name}</td>
            <td className="p-3 hidden sm:table-cell">{l.email}</td>
            <td className="p-3 hidden sm:table-cell">{l.number}</td>
            <td className="p-3 hidden md:table-cell font-mono text-xs">XXXXXX{l.pan_hash.slice(-4)}</td>
            <td className="p-3 hidden md:table-cell">{l.product}</td>
            <td className="p-3 hidden lg:table-cell">
              {l.source === "direct" ? (
                <span className="text-xs px-2 py-1 rounded bg-slate-200 text-slate-700">Direct</span>
              ) : (
                <span className="text-xs px-2 py-1 rounded bg-indigo-100 text-indigo-700">Broker ({l.broker?.name}) ({l.broker?.brokerId})</span>
              )}
            </td>
            <td className="p-3"><StatusBadge status={l.status} /></td>
            <td className="p-3 text-right space-x-2 flex justify-end">
              <ActionBtn green onClick={() => updateLeadStatus(l._id, "approved")}>Approve</ActionBtn>
              <ActionBtn red onClick={() => updateLeadStatus(l._id, "rejected")}>Reject</ActionBtn>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</Section>


        {selectedBroker && (
          <BrokerModal broker={selectedBroker} onClose={() => setSelectedBroker(null)} />
        )}
      </div>
    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function Section({ title, right, children }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <h2 className="font-semibold text-slate-800 text-lg">{title}</h2>
        {right}
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  const colors = {
    blue: "from-blue-600 to-blue-400 text-white",
    teal: "from-teal-600 to-teal-400 text-white",
    amber: "from-amber-500 to-amber-300 text-white",
    indigo: "from-indigo-600 to-indigo-400 text-white",
  };

  return (
    <div className={`p-5 rounded-xl shadow-md bg-linear-to-r ${colors[color] || colors.blue}`}>
      <div className="text-2xl md:text-3xl font-bold">{value || 0}</div>
      <div className="text-sm mt-1">{label}</div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    pending: "bg-amber-100 text-amber-700",
  };

  return (
    <span className={`text-xs px-2 py-1 rounded font-medium ${styles[status]}`}>
      {status.toUpperCase()}
    </span>
  );
}

function ActionBtn({ children, onClick, green, red }) {
  const base = "text-xs px-3 py-1.5 rounded font-medium transition";
  const color = green
    ? "bg-green-600 text-white hover:bg-green-700"
    : red
    ? "bg-red-600 text-white hover:bg-red-700"
    : "bg-slate-700 text-white hover:bg-slate-800";

  return (
    <button onClick={onClick} className={`${base} ${color}`}>
      {children}
    </button>
  );
}

function BrokerModal({ broker, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-3xl p-6 space-y-6 shadow-xl">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Broker Details</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800">
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><b>Name:</b> {broker.name}</div>
          <div><b>Email:</b> {broker.email}</div>
          <div><b>Phone:</b> {broker.number}</div>
          <div><b>Broker ID:</b> {broker.brokerId}</div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Clients</h4>
          <ul className="list-disc ml-5 text-sm space-y-1">
            {broker.clients.map((c) => (
              <li key={c._id}>{c.name} - {c.email}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-2">Leads</h4>
          <ul className="list-disc ml-5 text-sm space-y-1">
            {broker.leads.map((l) => (
              <li key={l._id}>{l.name} - {l.product} - {l.status}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
