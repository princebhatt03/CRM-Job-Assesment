import axios from "axios";

const API_BASE = "http://localhost:5000/v1/user";

// Login
const loginApi = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE}/login`, formData);

    if (response?.data?.accessJWT && response?.data?.refreshJWT) {
      sessionStorage.setItem("accessToken", response.data.accessJWT);
      localStorage.setItem(
        "crm-system",
        JSON.stringify({ refreshJWT: response.data.refreshJWT })
      );
      return response.data;
    } else {
      throw new Error("Server did not return tokens");
    }
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Logout
const logoutApi = async () => {
  try {
    const accessJWT = sessionStorage.getItem("accessToken");
    const response = await axios.delete(`${API_BASE}/logout`, {
      headers: { authorization: `Bearer ${accessJWT}` },
    });

    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("crm-system");
    return response.data;
  } catch (error) {
    if (error.response?.data?.message === "User is not logged in") {
      sessionStorage.removeItem("accessToken");
      localStorage.removeItem("crm-system");
      return { message: "User logged out" };
    }
    throw error.response?.data || { message: error.message };
  }
};

// Authorize
const authorizeAccessToken = async () => {
  try {
    const accessJWT = sessionStorage.getItem("accessToken");
    if (!accessJWT) return false;

    const response = await axios.get(`${API_BASE}/authorize`, {
      headers: { authorization: `Bearer ${accessJWT}` },
    });

    return response.data?.message === "Authorized";
  } catch {
    return false;
  }
};

// Refresh Access Token
const refreshAccessToken = async () => {
  try {
    const crmSystem = localStorage.getItem("crm-system");
    const { refreshJWT } = crmSystem ? JSON.parse(crmSystem) : {};
    if (!refreshJWT) return false;

    const response = await axios.get("http://localhost:5000/v1/token", {
      headers: { authorization: `Bearer ${refreshJWT}` },
    });

    if (response?.data?.accessJWT) {
      sessionStorage.setItem("accessToken", response.data.accessJWT);
      return true;
    }

    localStorage.removeItem("crm-system");
    return false;
  } catch (error) {
    if (error.response?.data?.message === "Forbidden") {
      localStorage.removeItem("crm-system");
    }
    return false;
  }
};

export { loginApi, logoutApi, authorizeAccessToken, refreshAccessToken };
