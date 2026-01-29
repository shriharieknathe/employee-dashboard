import { useState, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { employeeData } from "../data/employeeData";
import "./Dashboard.css";

ModuleRegistry.registerModules([AllCommunityModule]);

function Dashboard() {
  const gridRef = useRef(null);
  const [searchText, setSearchText] = useState("");

  // stats
  const totalEmployees = employeeData.length;
  const activeCount = employeeData.filter(e => e.isActive).length;
  const avgSalary = Math.round(employeeData.reduce((s, e) => s + e.salary, 0) / totalEmployees);
  const avgRating = (employeeData.reduce((s, e) => s + e.performanceRating, 0) / totalEmployees).toFixed(1);
  const totalProjects = employeeData.reduce((s, e) => s + e.projectsCompleted, 0);
  const deptCount = new Set(employeeData.map(e => e.department)).size;

  const columns = useMemo(() => [
    { field: "id", width: 70, pinned: "left" },
    { field: "firstName", headerName: "First Name" },
    { field: "lastName", headerName: "Last Name" },
    { 
      field: "email",
      cellRenderer: p => <a href={`mailto:${p.value}`} className="email-link">{p.value}</a>,
      width: 220
    },
    { field: "department", filter: "agSetColumnFilter" },
    { field: "position", width: 180 },
    { 
      field: "salary",
      cellRenderer: p => <span className="salary">${p.value.toLocaleString()}</span>,
      width: 110
    },
    { field: "location", filter: "agSetColumnFilter" },
    { 
      field: "performanceRating",
      headerName: "Rating",
      cellRenderer: p => {
        const pct = (p.value / 5) * 100;
        let color = "#f97316";
        if (p.value >= 4.5) color = "#22c55e";
        else if (p.value >= 4) color = "#84cc16";
        else if (p.value >= 3.5) color = "#eab308";
        
        return (
          <div className="rating-cell">
            <div className="rating-bar-bg">
              <div className="rating-bar" style={{ width: `${pct}%`, background: color }} />
            </div>
            <span>{p.value}</span>
          </div>
        );
      },
      width: 150
    },
    { field: "projectsCompleted", headerName: "Projects", width: 100 },
    { field: "age", width: 80 },
    { 
      field: "hireDate",
      headerName: "Hire Date",
      valueFormatter: p => new Date(p.value).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    },
    { 
      field: "isActive",
      headerName: "Status",
      cellRenderer: p => (
        <span className={`badge ${p.value ? "active" : "inactive"}`}>
          {p.value ? "Active" : "Inactive"}
        </span>
      ),
      width: 100
    },
    { 
      field: "skills",
      cellRenderer: p => (
        <div className="skills">
          {(p.value || []).map((s, i) => <span key={i} className="skill">{s}</span>)}
        </div>
      ),
      width: 250,
      sortable: false,
      filter: false
    },
    { 
      field: "manager",
      valueFormatter: p => p.value || "—"
    }
  ], []);

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: true,
    flex: 1,
    minWidth: 100
  };

  function handleExport() {
    gridRef.current?.api?.exportDataAsCsv({ fileName: "employees.csv" });
  }

  return (
    <div className="dashboard">
      <header className="header">
        <h1>Employee Dashboard</h1>
        <p>Workforce overview and management</p>
      </header>

      <section className="stats">
        <div className="stat-card">
          <span className="stat-num">{totalEmployees}</span>
          <span className="stat-label">Employees</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{activeCount}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">${avgSalary.toLocaleString()}</span>
          <span className="stat-label">Avg Salary</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{avgRating}</span>
          <span className="stat-label">Avg Rating</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{totalProjects}</span>
          <span className="stat-label">Projects</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{deptCount}</span>
          <span className="stat-label">Departments</span>
        </div>
      </section>

      <div className="toolbar">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          className="search-input"
        />
        <button onClick={handleExport} className="export-btn">Export CSV</button>
      </div>

      <div className="grid-container">
        <AgGridReact
          ref={gridRef}
          rowData={employeeData}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          quickFilterText={searchText}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={false}
          domLayout="autoHeight"
          rowSelection="multiple"
          animateRows={true}
        />
      </div>
    </div>
  );
}

export default Dashboard;
