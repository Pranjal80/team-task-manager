import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          textAlign: "center",
          width: "350px",
        }}
      >
        <h1>Team Task Manager 🚀</h1>

        <p>
          Manage projects, assign tasks, and track progress.
        </p>

        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "10px 20px",
            margin: "10px",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <button
          onClick={() => navigate("/signup")}
          style={{
            padding: "10px 20px",
            margin: "10px",
            cursor: "pointer",
          }}
        >
          Signup
        </button>
      </div>
    </div>
  );
}

export default Home;