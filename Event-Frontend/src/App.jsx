import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import EventForm from "./pages/Eventform";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EventList from "./pages/EventList";
import EventDetails from "./pages/EventDetails"; 
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminEventPanel from "./pages/AdminEventPanel.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import "./App.css";
import { Navigate } from 'react-router-dom';


function RedirectToHome() {
  return <Navigate to="/home" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Navbar />
        <Routes>
          <Route path="/" element={<RedirectToHome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-event"
            element={
              <ProtectedRoute role="ADMIN">
                <EventForm />
              </ProtectedRoute>
            }
          />

          <Route path="/events" element={<EventList />} />

          <Route
            path="/panel"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminEventPanel />
              </ProtectedRoute>
            }
          />
           
           <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />

          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route
            path="/check"
            element={
              <div className="p-4">
                <h2 className="text-xl font-bold">Debug Info</h2>
                <p>
                  <strong>Token:</strong>{" "}
                  {localStorage.getItem("token") ? "Present" : "Missing"}
                </p>
                <p>
                  <strong>Role:</strong> {localStorage.getItem("role")}
                </p>
              </div>
            }
          />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
