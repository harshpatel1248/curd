
import { useEffect, useState } from "react";
import "./Searchbar.css";

export default function SearchBar({ value, onChange, placeholder = "Search users…" }) {
  const [local, setLocal] = useState(value ?? "");

  useEffect(() => {
    const id = setTimeout(() => onChange?.(local), 300);
    return () => clearTimeout(id);
  }, [local, onChange]);

  return (
    <div className="searchbar">
      <input
        type="search"
        className="searchbar-input"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder={placeholder}
        aria-label="Search users"
      />
    </div>
  );
}
