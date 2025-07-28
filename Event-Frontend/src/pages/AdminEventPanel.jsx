import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminEventPanel() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    location: "",
    startDateTime: "",
    endDateTime: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");

    if (!token || (storedRole !== "ADMIN" && storedRole !== "ROLE_ADMIN")) {
      alert("Access denied! Admins only.");
      navigate("/unauthorized");
    } else {
      fetchEvents();
    }
  }, []);

  const fetchEvents = () => {
    axios
      .get("http://localhost:8080/api/events", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setEvents(res.data))
      .catch((err) => {
        console.error(" Error fetching events:", err);
        alert("Failed to fetch events. Are you logged in?");
      });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const request = form.id
      ? axios.put(`http://localhost:8080/api/events/${form.id}`, form, config)
      : axios.post("http://localhost:8080/api/events", form, config);

    request
      .then(() => {
        fetchEvents();
        resetForm();
      })
      .catch((err) => {
        console.error("Error submitting event:", err);
        alert("Action failed. Make sure you're logged in as admin.");
      });
  };

  const resetForm = () => {
    setForm({
      id: null,
      title: "",
      description: "",
      location: "",
      startDateTime: "",
      endDateTime: "",
    });
  };

  const handleEdit = (event) => {
    setForm({ ...event });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      axios
        .delete(`http://localhost:8080/api/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => fetchEvents())
        .catch((err) => {
          console.error(" Error deleting event:", err);
          alert("Delete failed.");
        });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Admin Event Management Panel
      </h2>

      <form className="grid gap-4 mb-8" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Event Title"
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Event Description"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Event Location"
          className="border p-2 rounded"
          required
        />
        <input
          type="datetime-local"
          name="startDateTime"
          value={form.startDateTime}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="datetime-local"
          name="endDateTime"
          value={form.endDateTime}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {form.id ? "Update Event" : "Create Event"}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-4">All Events</h3>
      <div className="grid gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-4 border rounded flex justify-between items-start gap-4"
          >
            <div className="flex-1">
              <h4 className="font-bold text-lg">{event.title}</h4>
              <p className="text-sm text-gray-700">{event.description}</p>
              <p className="text-sm text-gray-600">{event.location}</p>
              <p className="text-sm text-gray-500">
                {new Date(event.startDateTime).toLocaleString()} -{" "}
                {new Date(event.endDateTime).toLocaleString()}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleEdit(event)}
                className="px-3 py-1 bg-yellow-400 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminEventPanel;
