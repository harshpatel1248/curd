import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./reade.css";
import SearchBar from "../components/SearchBar"

function Reade() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(u => {
      const id = String(u.id ?? "").toLowerCase();
      const name = String(u.name ?? "").toLowerCase();
      const email = String(u.email ?? "").toLowerCase();
      const phone = String(u.phone ?? "").toLowerCase();
      return (
        id.includes(q) ||
        name.includes(q) ||
        email.includes(q) ||
        phone.includes(q)
      );
    });
  }, [users, query]);

  return (
    <div className="read-container">
      <h1 className="h1">Users List</h1>

      <div className="list-toolbar">
        <SearchBar value={query} onChange={setQuery} />
        <span className="result-count">
          {filtered.length} / {users.length}
        </span>
      </div>

      <table className="my-table">
        <thead>
          <tr>
            <th style={{minWidth: 60}}>ID</th>
            <th style={{minWidth: 160}}>Name</th>
            <th style={{minWidth: 220}}>Email</th>
            <th style={{minWidth: 140}}>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: 20 }}>
                No users match “{query}”.
              </td>
            </tr>
          ) : (
            filtered.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Reade;
