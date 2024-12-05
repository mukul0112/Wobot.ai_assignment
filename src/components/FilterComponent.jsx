import React, { useState } from "react";
import { LocationIcon, StatusIcon } from "./Icons";

const FilterComponent = ({
  locationArray,
  statusArray,
  handleDropdownFilter,
  flag,
  setFlag
}) => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleLocationChange = (event) => {
    const location = event.target.value;
    setSelectedLocation(location);
    handleDropdownFilter(location, selectedStatus); 
  };

  const handleStatusChange = (event) => {
    const status = event.target.value;
    setSelectedStatus(status);
    handleDropdownFilter(selectedLocation, status); 
  };
  const handleClearFilters = () => {
    setSelectedLocation("");
    setSelectedStatus("");
    setFlag(!flag);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", marginBottom: "8px" }}>
      <div>
        <LocationIcon />
        <select
          id="location"
          name="location"
          value={selectedLocation}
          onChange={handleLocationChange}
          style={{
            height: "30px",
            border: "none",
            background: "#F3F3F4",
            borderRadius: "6px",
            padding: "8px",
            marginRight: "0.5rem",
            color: "#7E7E7E",
          }}
        >
          <option value="" disabled>
            Location
          </option>
          {locationArray.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <StatusIcon />
        <select
          id="status"
          name="status"
          value={selectedStatus}
          onChange={handleStatusChange}
          style={{
            height: "30px",
            border: "none",
            background: "#F3F3F4",
            borderRadius: "6px",
            padding: "8px",
            color: "#7E7E7E",
          }}
        >
          <option value="" disabled>
            Status
          </option>
          {statusArray.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <button style={{color: "#7E7E7E",}} onClick={() => handleClearFilters()}>Clear filters</button>
    </div>
  );
};

export default FilterComponent;
