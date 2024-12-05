import React, { useEffect, useState } from "react";
import { fetchCameras, updateCameraStatus } from "../services/api";
import Pagination from "./Pagination";
import SearchFilter from "./SearchFilter";
import Header from "./Header";
import {
  ActiveIcon,
  CloudIcon,
  InactiveIcon,
  OnlineIcon,
  OfflineIcon,
  CloudBIcon,
  CloudFIcon,
  CloudDIcon,
  CloudAIcon,
  CloudCIcon,
  DeviceIcon,
  DeleteIcon
} from "./Icons";
import FilterComponent from "./FilterComponent";

const CameraTable = () => {
  const [cameras, setCameras] = useState([]);
  const [filteredCameras, setFilteredCameras] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [flag, setFlag] = useState(true);
  const itemsPerPage = 8;

  useEffect(() => {
    const getCameras = async () => {
      const data = await fetchCameras();
      setCameras(data.data);
      setFilteredCameras(data.data);
    };
    getCameras();
  }, [flag]);

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    await updateCameraStatus(id, newStatus);
    setFilteredCameras((prev) =>
      prev.map((camera) =>
        camera.id === id ? { ...camera, status: newStatus } : camera
      )
    );
  };

  const handleDelete = (id) => {
    setFilteredCameras((prev) => prev.filter((camera) => camera.id !== id));
  };

  const handleDropdownFilter = (selectedLocation, selectedStatus) => {
    const filtered = cameras.filter((camera) => {
      const matchesLocation = selectedLocation
        ? camera.location.toLowerCase().includes(selectedLocation.toLowerCase())
        : true;

      const matchesStatus = selectedStatus
        ? camera.status.toLowerCase() === selectedStatus.toLowerCase()
        : true;

      return matchesLocation && matchesStatus;
    });

    setFilteredCameras(filtered);
  };

  const handleSearchFilter = (query) => {
    const filtered = cameras.filter((camera) =>
      (camera.name.toLowerCase().includes(query.toLowerCase()) || camera.location.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredCameras(filtered);
  };
  const locationArray = [...new Set(cameras.map((camera) => camera.location))];
  const statusArray = [...new Set(cameras.map((camera) => camera.status))];

  const paginatedCameras = filteredCameras?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="main">
        <div>
          <Header />
        </div>

        <div className="camera-table">
          <SearchFilter onSearch={handleSearchFilter} />
          <FilterComponent
            flag={flag}
            setFlag={setFlag}
            locationArray={locationArray}
            statusArray={statusArray}
            handleDropdownFilter={handleDropdownFilter}
          />
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Health</th>
                <th>Location</th>
                <th>Recorder</th>
                <th>Tasks</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCameras?.map((camera) => (
                <tr key={camera.id}>
                  <td>
                    {camera.current_status === "Online" ? (
                      <OnlineIcon />
                    ) : (
                      <OfflineIcon />
                    )}{" "}
                    {camera.name}
                  </td>
                  <td>
                    <CloudIcon />
                    {camera.health.cloud === "A" ? (
                      <CloudAIcon />
                    ) : camera.health.cloud === "B" ? (
                      <CloudBIcon />
                    ) : camera.health.cloud === "C" ? (
                      <CloudCIcon />
                    ) : camera.health.cloud === "F" ? (
                      <CloudFIcon />
                    ): camera.health.cloud === "D" ? (
                        <CloudDIcon />
                    ) : (
                      "NA"
                    )}
                    <DeviceIcon/>
                    {camera.health.device === "A" ? (
                      <CloudAIcon />
                    ) : camera.health.device === "B" ? (
                      <CloudBIcon />
                    ) : camera.health.device === "C" ? (
                      <CloudCIcon />
                    ) : camera.health.device === "F" ? (
                      <CloudFIcon />
                    ): camera.health.device === "D" ? (
                        <CloudDIcon />
                    ) : (
                      "NA"
                    )}
                  </td>
                  <td>{camera.location}</td>
                  <td>{camera.recorder || "N/A"}</td>
                  <td>{camera.tasks || "N/A"}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleStatusToggle(camera.id, camera.status)
                      }
                    >
                      {camera.status === "Active" ? (
                        <ActiveIcon />
                      ) : (
                        <InactiveIcon />
                      )}
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(camera.id)}>
                      <DeleteIcon/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalItems={filteredCameras?.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default CameraTable;
