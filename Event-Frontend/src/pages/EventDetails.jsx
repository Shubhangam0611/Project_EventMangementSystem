
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EventDetails() {
  const { id } = useParams(); 
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8080/api/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleRegister = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please login first.");
      return;
    }

    axios.post(`http://localhost:8080/api/registrations/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setMessage(" Registration submitted!"))
    .catch(err => {
      if (err.response?.status === 409) {
        setMessage(" Already registered.");
      } else {
        setMessage(" Registration failed.");
      }
    });
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
      <p className="mb-2"> {event.description}</p>
      <p className="mb-2"> Location: {event.location}</p>
      <p className="mb-2"> Start: {event.startDateTime}</p>
      <p className="mb-2"> End: {event.endDateTime}</p>

      <button
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleRegister}
      >
        Register
      </button>

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}

export default EventDetails;
