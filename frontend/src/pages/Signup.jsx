import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member",
  });

  const handleSignup = async () => {
    try {
      await axios.post(
        "http://localhost:5001/api/auth/signup",
        formData
      );

      alert("Signup successful 🚀");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="bg-gray-900 p-10 rounded-2xl w-full max-w-md border border-gray-800">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Create Account
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 outline-none"
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 outline-none"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 outline-none"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <select
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 outline-none"
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
          >
            <option>Member</option>
            <option>Admin</option>
          </select>

          <button
            onClick={handleSignup}
            className="w-full bg-blue-600 hover:bg-blue-700 transition p-4 rounded-xl font-semibold"
          >
            Sign Up
          </button>

          <p className="text-center text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;