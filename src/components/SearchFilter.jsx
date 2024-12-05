import React, { useState } from "react";

const SearchFilter = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="search-filter">
      <div style={{ display: "flex", flexDirection: "column", marginBottom: "8px" }}>
        <div style={{ fontSize: "16px", fontWeight: "bold", alignSelf:"flex-start"}}>Cameras</div>
        <div style={{ fontSize: "12px", color: "#7E7E7E" }}>Manage your cameras here</div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <input
          type="text"
          placeholder="search"
          value={query}
          onChange={handleSearch}
          style={{
            height:"12px",
            border: "none",
            background: "#F3F3F4",
            borderRadius: "6px",
            padding: "8px",
          }}
        />
      </div>
    </div>
  );
};

export default SearchFilter;
