import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <h1 className="text-4xl font-bold text-red-600 mb-4">🚫 Unauthorized</h1>
      <p className="text-lg text-gray-700 mb-6">
        You do not have permission to access this page.
      </p>
      <button
        onClick={() => navigate("/login")}
        className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Go to Login
      </button>
    </div>
  );
}

export default Unauthorized;
