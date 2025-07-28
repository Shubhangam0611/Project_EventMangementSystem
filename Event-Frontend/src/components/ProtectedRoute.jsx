import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProtectedRoute({ children, role }) {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    let userRole = localStorage.getItem("role");

    console.log("Token:", token);

    console.log("Raw role from localStorage:", userRole);

    console.log("Route requires role:", role);

    if (!token) {
      console.log(" No token found");
      setAuthorized(false);
      return;
    }
    if (userRole && userRole.startsWith("ROLE_")) {
      userRole = userRole.replace("ROLE_", "");
    }
    if (role && userRole?.toUpperCase() !== role.toUpperCase()) {
  console.log(`Role mismatch: expected ${role}, found ${userRole}`);
  setAuthorized(false);
} else {
  console.log(" Authorized");
  setAuthorized(true);
}
  }, [role]);

  if (authorized === null)
     {
    return <div className="text-center mt-10">Checking access...</div>;
  }
  if (!authorized) 
    {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
