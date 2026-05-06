import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-6xl font-bold mb-6">
          Team Task Manager 🚀
        </h1>

        <p className="text-gray-400 text-lg mb-10">
          Manage projects, assign tasks, track progress,
          and collaborate with your team in real time.
        </p>

        <div className="flex justify-center gap-6">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="border border-gray-600 hover:bg-gray-800 px-8 py-3 rounded-xl font-semibold transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;