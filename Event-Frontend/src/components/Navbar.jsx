import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../assets/logo.svg";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const isLoggedIn = !!localStorage.getItem("token");

  
  useEffect(() => {
    const updateRole=()=>{
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  };
  updateRole();
  //listen for role change on login
  window,addEventListener("storage",updateRole);

  return()=>{
    window.removeEventListener("storage",updateRole);
  };
  }, []);

  const handleNav = (path) => {
    navigate(path);
    setMenuOpen(false); // Close mobile menu
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setRole(null);

    alert("Logged out successfully");
    navigate("/login");
    setMenuOpen(false);
  };

  const isAdmin = role === "ADMIN";

  return (

    <nav className="bg-gray-800 text-white px-6 py-4 shadow-md flex justify-between items-center">
      {/* logo */}
     <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNav("/home")}>
     {/* <span className="text-2xl font-bold">EventHub</span>*/}
          <img src={Logo} alt="Logo" className="h-10" />
            
    </div>

      {/* desktop Menu */}
      <div className="hidden md:flex gap-6">
        <button onClick={() => handleNav("/home")}>Home</button>
        <button onClick={() => handleNav("/events")}>Event List</button>

        {isAdmin ? (
          <>
            <button onClick={() => handleNav("/dashboard")}>Dashboard</button>
            <button onClick={() => handleNav("/panel")}>Event Panel</button>
          </>
        ) : (
          <>
            <button onClick={() => handleNav("/about")}>About</button>
            <button onClick={() => handleNav("/contact")}>Contact</button>
          </>
        )}

        {!isLoggedIn ? (
          <>
            <button onClick={() => handleNav("/register")}>Register</button>
            <button onClick={() => handleNav("/login")}>Login</button>
          </>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>

      {/* mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white text-black flex flex-col items-center shadow-md md:hidden z-50">
          <button className="py-3 w-full text-center hover:bg-gray-100" onClick={() => handleNav("/home")}>
            Home
          </button>
          <button className="py-3 w-full text-center hover:bg-gray-100" onClick={() => handleNav("/events")}>
            Event List
          </button>

          {isAdmin ? (
            <>
              <button className="py-3 w-full text-center hover:bg-gray-100" onClick={() => handleNav("/AdminDashboard")}>
                Dashboard
              </button>
              <button className="py-3 w-full text-center hover:bg-gray-100" onClick={() => handleNav("/AdminEventPanel")}>
                Event Panel
              </button>
            </>
          ) : (
            <>
              <button className="py-3 w-full text-center hover:bg-gray-100" onClick={() => handleNav("/about")}>
                About
              </button>
              <button className="py-3 w-full text-center hover:bg-gray-100" onClick={() => handleNav("/contact")}>
                Contact
              </button>
            </>
          )}

          {!isLoggedIn ? (

            <>
              <button className="py-3 w-full text-center hover:bg-gray-100" onClick={() => handleNav("/register")}>
                Register
              </button>
              <button className="py-3 w-full text-center hover:bg-gray-100" onClick={() => handleNav("/login")}>
                Login
              </button>
            </>
          ) : (
            <button className="py-3 w-full text-center hover:bg-gray-100" onClick={handleLogout}>
              Logout
            </button>
          )}

        </div>

      )}

    </nav>
  );
}

export default Navbar;
