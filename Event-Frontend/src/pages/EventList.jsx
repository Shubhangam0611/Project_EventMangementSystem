import { useEffect, useState } from "react";
import axios from "axios";

function EventList() {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/events")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch events", err);
      });
  }, []);

  const handleRegister = async (eventId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `http://localhost:8080/api/registrations/${eventId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data);

      setTimeout(() => {
        setMessage("");
      }, 10000);
    } catch (err) {
      const errorMsg = err.response?.data || "Registration failed";
      setMessage(errorMsg);

      setTimeout(() => {
        setMessage("");
      }, 10000);
    }
  };

  return (
    <div className="p-6 bg-blue-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Event List</h1>

      {message && (
        <div
          className={`mb-4 p-4 rounded shadow ${
            message.includes("fail") || message.includes("Already")
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-gray-600">{event.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              Date: {event.date} | Time: {event.time}
            </p>
            <button
              onClick={() => handleRegister(event.id)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Register
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventList;
