import { useState } from "react";
import "./App.css";

function App() {
  // Load saved leads from the browser
  const [leads, setLeads] = useState(() => {
    const savedLeads = localStorage.getItem("crmLeads");

    if (savedLeads) {
      return JSON.parse(savedLeads);
    }

    // Default sample leads for first-time use
    return [
      {
        id: 1,
        name: "Rahul Sharma",
        company: "TechCorp",
        email: "rahul@techcorp.com",
        status: "New",
        value: 50000,
      },
      {
        id: 2,
        name: "Priya Singh",
        company: "Infosys",
        email: "priya@infosys.com",
        status: "Qualified",
        value: 80000,
      },
      {
        id: 3,
        name: "Aman Verma",
        company: "StartupX",
        email: "aman@startupx.com",
        status: "Won",
        value: 120000,
      },
    ];
  });

  // Form data
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    value: "",
  });

  // Save leads to browser storage
  const saveLeads = (updatedLeads) => {
    setLeads(updatedLeads);
    localStorage.setItem("crmLeads", JSON.stringify(updatedLeads));
  };

  // Add a new lead
  const addLead = (e) => {
    e.preventDefault();

    if (!form.name || !form.company) {
      alert("Please enter lead name and company.");
      return;
    }

    const newLead = {
      id: Date.now(),
      name: form.name,
      company: form.company,
      email: form.email,
      status: "New",
      value: Number(form.value) || 0,
    };

    saveLeads([newLead, ...leads]);

    // Clear form
    setForm({
      name: "",
      company: "",
      email: "",
      value: "",
    });
  };

  // Change lead status
  const updateStatus = (id, status) => {
    const updatedLeads = leads.map((lead) =>
      lead.id === id
        ? { ...lead, status: status }
        : lead
    );

    saveLeads(updatedLeads);
  };

  // Delete lead
  const deleteLead = (id) => {
    const updatedLeads = leads.filter(
      (lead) => lead.id !== id
    );

    saveLeads(updatedLeads);
  };

  // Dashboard calculations
  const total = leads.length;

  const qualified = leads.filter(
    (lead) => lead.status === "Qualified"
  ).length;

  const won = leads.filter(
    (lead) => lead.status === "Won"
  ).length;

  const totalValue = leads.reduce(
    (sum, lead) => sum + Number(lead.value),
    0
  );

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div>
          <h1>CRM-Pro</h1>
          <p>
            Enterprise Customer Relationship Management
          </p>
        </div>

        <span className="admin">
          Admin
        </span>
      </header>

      {/* DASHBOARD STATS */}
      <div className="stats">

        <div className="stat-card">
          <span>Total Leads</span>
          <strong>{total}</strong>
        </div>

        <div className="stat-card">
          <span>Qualified</span>
          <strong>{qualified}</strong>
        </div>

        <div className="stat-card">
          <span>Won Deals</span>
          <strong>{won}</strong>
        </div>

        <div className="stat-card">
          <span>Pipeline Value</span>
          <strong>
            ₹{totalValue.toLocaleString()}
          </strong>
        </div>

      </div>

      {/* ADD LEAD */}
      <section className="card">

        <h2>Add New Lead</h2>

        <form
          onSubmit={addLead}
          className="lead-form"
        >

          <input
            placeholder="Lead Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            placeholder="Company"
            value={form.company}
            onChange={(e) =>
              setForm({
                ...form,
                company: e.target.value,
              })
            }
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Deal Value"
            value={form.value}
            onChange={(e) =>
              setForm({
                ...form,
                value: e.target.value,
              })
            }
          />

          <button type="submit">
            + Add Lead
          </button>

        </form>

      </section>

      {/* SALES PIPELINE */}
      <section className="card">

        <div className="section-title">
          <h2>Sales Pipeline</h2>
          <p>Manage and track your leads</p>
        </div>

        <div className="table">

          {/* TABLE HEADER */}
          <div className="table-header">
            <span>LEAD</span>
            <span>COMPANY</span>
            <span>VALUE</span>
            <span>STATUS</span>
            <span>ACTION</span>
          </div>

          {/* LEADS */}
          {leads.map((lead) => (

            <div
              className="table-row"
              key={lead.id}
            >

              <div>
                <strong>
                  {lead.name}
                </strong>

                <small>
                  {lead.email}
                </small>
              </div>

              <span>
                {lead.company}
              </span>

              <strong>
                ₹{Number(lead.value).toLocaleString()}
              </strong>

              <select
                value={lead.status}
                onChange={(e) =>
                  updateStatus(
                    lead.id,
                    e.target.value
                  )
                }
              >
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
                <option>Won</option>
                <option>Lost</option>
              </select>

              <button
                className="delete"
                onClick={() =>
                  deleteLead(lead.id)
                }
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default App;