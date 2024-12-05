import axios from "axios";

const API = axios.create({
  baseURL: "https://api-app-staging.wobot.ai/app/v1",
  headers: {
    Authorization: "Bearer 4ApVMIn5sTxeW7GQ5VWeWiy",
  },
});

export const fetchCameras = async () => {
  const { data } = await API.get("/fetch/cameras");
  return data;
};

export const updateCameraStatus = async (id, status) => {
  const { data } = await API.put("/update/camera/status", { id, status });
  return data;
};
