import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
  });

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/projects`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(res.data);

      if (res.data.length > 0) {
        fetchTasks(res.data[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTasks = async (projectId) => {
    try {
      const res = await axios.get(
        `${API_URL}/api/tasks/project/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createProject = async () => {
    try {
      if (!projectData.name || !projectData.description) {
        return alert("Fill all project fields");
      }

      await axios.post(
        `${API_URL}/api/projects`,
        projectData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Project created 🚀");

      setProjectData({
        name: "",
        description: "",
      });

      fetchProjects();

    } catch (error) {
      alert(error.response?.data?.error || "Failed");
    }
  };

  const createTask = async () => {
    try {
      await axios.post(
        `${API_URL}/api/tasks`,
        {
          ...taskData,
          project: projects[0]._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task created 🚀");

      setTaskData({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
      });

      fetchTasks(projects[0]._id);

    } catch (error) {
      alert(error.response?.data?.error || "Failed");
    }
  };

  const markDone = async (taskId) => {
    try {
      await axios.patch(
        `${API_URL}/api/tasks/${taskId}/status`,
        {
          status: "Done",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks(projects[0]._id);

    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              Team Task Manager 🚀
            </h1>

            <p className="text-gray-400 mt-1">
              Role:
              <span
                className={`ml-2 font-semibold ${
                  role === "Admin"
                    ? "text-blue-400"
                    : "text-green-400"
                }`}
              >
                {role}
              </span>
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 hover:scale-105 transition px-5 py-2 rounded-xl font-semibold"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {role === "Admin" && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">
              Create Project
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Project Name"
                value={projectData.name}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    name: e.target.value,
                  })
                }
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700"
              />

              <textarea
                placeholder="Description"
                value={projectData.description}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    description: e.target.value,
                  })
                }
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700"
              />

              <button
                onClick={createProject}
                className="w-full bg-blue-600 hover:bg-blue-700 transition p-4 rounded-xl font-semibold"
              >
                Create Project
              </button>
            </div>
          </div>
        )}

        {role === "Admin" && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">
              Create Task
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Task Title"
                value={taskData.title}
                onChange={(e) =>
                  setTaskData({
                    ...taskData,
                    title: e.target.value,
                  })
                }
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700"
              />

              <textarea
                placeholder="Description"
                value={taskData.description}
                onChange={(e) =>
                  setTaskData({
                    ...taskData,
                    description: e.target.value,
                  })
                }
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700"
              />

              <select
                value={taskData.priority}
                onChange={(e) =>
                  setTaskData({
                    ...taskData,
                    priority: e.target.value,
                  })
                }
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <input
                type="date"
                value={taskData.dueDate}
                onChange={(e) =>
                  setTaskData({
                    ...taskData,
                    dueDate: e.target.value,
                  })
                }
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700"
              />

              <button
                onClick={createTask}
                className="w-full bg-green-600 hover:bg-green-700 transition p-4 rounded-xl font-semibold"
              >
                Create Task
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;