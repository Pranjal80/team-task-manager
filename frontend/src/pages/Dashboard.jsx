import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
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
        "https://team-task-manager-production-fda8.up.railway.app/api/projects",
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
        `https://team-task-manager-production-fda8.up.railway.app/api/tasks/project/${projectId}`,
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
      "https://team-task-manager-production-fda8.up.railway.app/api/projects",
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
        "https://team-task-manager-production-fda8.up.railway.app/api/tasks",
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
        `https://team-task-manager-production-fda8.up.railway.app/api/tasks/${taskId}/status`,
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
      {/* HEADER */}
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

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* CREATE PROJECT */}
        {role === "Admin" && (
          <div className="bg-gray-900 border border-gray-800 hover:border-blue-500 transition duration-300 rounded-2xl p-6 shadow-lg">
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
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 outline-none focus:border-blue-500"
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
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 outline-none focus:border-blue-500"
              />

              <button
                onClick={createProject}
                className="w-full bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] transition p-4 rounded-xl font-semibold"
              >
                Create Project
              </button>
            </div>
          </div>
        )}

        {/* CREATE TASK */}
        {role === "Admin" && (
          <div className="bg-gray-900 border border-gray-800 hover:border-green-500 transition duration-300 rounded-2xl p-6 shadow-lg">
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
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 outline-none focus:border-green-500"
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
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 outline-none focus:border-green-500"
              />

              <select
                value={taskData.priority}
                onChange={(e) =>
                  setTaskData({
                    ...taskData,
                    priority: e.target.value,
                  })
                }
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 outline-none focus:border-green-500"
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
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 outline-none focus:border-green-500"
              />

              <button
                onClick={createTask}
                className="w-full bg-green-600 hover:bg-green-700 hover:scale-[1.02] transition p-4 rounded-xl font-semibold"
              >
                Create Task
              </button>
            </div>
          </div>
        )}

        {/* PROJECTS */}
        <div className="bg-gray-900 border border-gray-800 hover:border-purple-500 transition duration-300 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">
            Projects
          </h2>

          <div className="space-y-4">
            {projects.length === 0 ? (
              <p className="text-gray-500">
                No projects yet
              </p>
              ) : (
                projects.map((project) => (
                <div
                key={project._id}
                className="bg-gray-800 hover:bg-gray-700 transition p-5 rounded-xl"
                >
              <h3 className="text-xl font-bold">
                {project.name}
              </h3>
              <p className="text-gray-400 mt-2">
                {project.description}
              </p>
          </div>
          ))
)}
          </div>
        </div>
      </div>

      {/* TASKS */}
      <div className="max-w-7xl mx-auto px-6 pb-10">
        <h2 className="text-3xl font-bold mb-6">
          Tasks
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.length === 0 ? (
  <p className="text-gray-500">
    No tasks available
  </p>
) : (
  tasks.map((task) => (
    <div
      key={task._id}
      className="bg-gray-900 border border-gray-800 hover:border-blue-500 transition duration-300 rounded-2xl p-6 shadow-lg"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">
          {task.title}
        </h3>

        {task.isOverdue && task.status !== "Done" && (
          <span className="bg-red-600 px-3 py-1 rounded-full text-sm font-semibold">
            OVERDUE
          </span>
        )}
      </div>

      <p className="text-gray-400 mb-5">
        {task.description}
      </p>

      <div className="space-y-2">
        <p>
          Status:
          <span
            className={`ml-2 font-semibold ${
              task.status === "Done"
                ? "text-green-400"
                : "text-yellow-400"
            }`}
          >
            {task.status}
          </span>
        </p>

        <p>
          Priority:
          <span className="ml-2 text-blue-400 font-semibold">
            {task.priority}
          </span>
        </p>
      </div>

      {task.status !== "Done" && (
        <button
          onClick={() => markDone(task._id)}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] transition p-3 rounded-xl font-semibold"
        >
          Mark as Done
        </button>
      )}
    </div>
  ))
)}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;