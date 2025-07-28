import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

  const fetchRequests = async () => {
    if (!token) {
      alert("No token found. Please log in.");
      navigate("/login");
      return;
    }

    // Normalize role for comparison
    const effectiveRole = userRole?.startsWith("ROLE_") ? userRole : `ROLE_${userRole}`;
    if (effectiveRole !== "ROLE_ADMIN") {
      alert("Access denied: You are not an admin.");
      navigate("/unauthorized");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8080/api/admin/requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests", error);
      console.log("Status:", error?.response?.status);
      console.log("Response Data:", error?.response?.data);
      if (error?.response?.status === 403) {
        alert("You are not authorized to access this page.");
        navigate("/unauthorized");
      } else {
        alert("Failed to load requests.");
      }
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/admin/requests/${id}/approve`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Request approved");
      setRequests((prev) => prev.filter((req) => req.id !== id));
    } catch (error) {
      alert("Failed to approve request");
      console.error(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/admin/requests/${id}/reject`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Request rejected");
      setRequests((prev) => prev.filter((req) => req.id !== id));
    } catch (error) {
      alert("Failed to reject request");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {requests.length === 0 ? (
        <p>No registration requests found.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="border p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Request ID:</strong> {req.id}
                </p>
                <p>
                  <strong>User:</strong> {req.userName || "N/A"} (
                  {req.userEmail || "N/A"})
                </p>
                <p>
                  <strong>Event:</strong> {req.eventName || "N/A"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="font-semibold text-blue-600">
                    {req.status}
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(req.id)}
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(req.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
