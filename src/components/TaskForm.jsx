import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiPlus,
  FiEdit,
  FiTrash,
  FiUser,
  FiBriefcase,
  FiClock,
  FiCheckCircle,
  FiLoader,
} from "react-icons/fi";
import { motion } from "framer-motion";

const TaskForm = ({ userRole, currentUser }) => {
  console.log("current user  ",  currentUser);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");
  const [employees, setEmployees] = useState([]);
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (userRole) fetchTasks();
    if (userRole === "Administrator" || userRole === "Manager")
      fetchEmployees();
  }, [userRole]);

  // Fetch tasks based on role
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const endpoint =
        userRole === "Employee"
          ? "https://spoxtale-backend-598s.onrender.com/api/tasks/my-tasks"
          : "https://spoxtale-backend-598s.onrender.com/api/tasks";

      const response = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  // Fetch employees for assignment
  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://spoxtale-backend-598s.onrender.com/api/employees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(response.data.filter((user) => user.role === "Employee"));
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  };

  // Create a new task
  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://spoxtale-backend-598s.onrender.com/api/tasks",
        {
          title,
          description,
          assignedTo,
          status: "Pending",
          priority: "Medium",
          startDate: new Date(),
          endDate : dueDate, // Default 7 days
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
      setTitle("");
      setDescription("");
      setAssignedTo("");
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  // Update task status
  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://spoxtale-backend-598s.onrender.com/api/tasks/${taskId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (err) {
      console.error("Failed to update task status:", err);
    }
  };

  // Update task details
  const handleUpdateTask = async (task) => {
    const newTitle = prompt("Enter new title", task.title);
    const newDesc = prompt("Enter new description", task.description);

    if (!newTitle) return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://spoxtale-backend-598s.onrender.com/api/tasks/${task._id}`,
        {
          title: newTitle,
          description: newDesc || task.description,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://spoxtale-backend-598s.onrender.com/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  // Profile Header with animations
  const ProfileHeader = () => {
    const userInitial = currentUser[0].toUpperCase();

    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mb-8 shadow-lg shadow-purple-500/20 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
        <div className="flex items-center gap-4 relative">
          <div className="p-3 bg-white/20 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
            {userInitial}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-amber-200">{currentUser}</h2>
            <div className="flex items-center gap-2 mt-1">
              <FiBriefcase className="opacity-75" />
              <span className="opacity-90">{userRole}</span>
              <span className="ml-4 flex items-center gap-1">
                <FiUser className="opacity-75" />
                <span>{currentUser?.email}</span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Status Badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      Pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: <FiClock className="mr-2" />,
      },
      "In Progress": {
        color: "bg-blue-100 text-blue-800",
        icon: <FiLoader className="mr-2 animate-spin" />,
      },
      Completed: {
        color: "bg-green-100 text-green-800",
        icon: <FiCheckCircle className="mr-2" />,
      },
    };

    return (
      <div
        className={`${statusConfig[status].color} px-3 py-1 rounded-full text-sm flex items-center`}
      >
        {statusConfig[status].icon}
        {status}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <ProfileHeader />

      {/* Create Task Form */}
      {(userRole === "Administrator" || userRole === "Manager") && (
        <motion.form
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          onSubmit={handleCreateTask}
          className="mb-8 bg-white rounded-xl p-6 shadow-md border border-gray-100"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-700">
            <FiPlus className="text-blue-500" /> Create New Task
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-1">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            <div className="space-y-1">
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Assign to</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.username}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          <div className="mt-4">
            <textarea
              placeholder="Task description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="2"
            />
          </div>

          <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <FiPlus /> Create Task
            </button>
        </motion.form>
      )}

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <motion.div
            key={task._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {task.title}
                  </h3>
                  <StatusBadge status={task.status} />
                </div>
                <p className="text-gray-600">{task.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FiUser className="opacity-70" />
                  <span>{task.assignedTo?.username}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {userRole === "Employee" && (
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleUpdateStatus(task._id, e.target.value)
                    }
                    className="px-3 py-1 rounded-lg border border-gray-200 bg-transparent focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                )}

                {(userRole === "Administrator" || userRole === "Manager") && (
                  <button
                    onClick={() => handleUpdateTask(task)}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <FiEdit size={18} />
                  </button>
                )}

                {userRole === "Administrator" && (
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <FiTrash size={18} />
                  </button>
                )}
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <FiClock className="opacity-70" />
                <span>{new Date(task.startDate).toLocaleDateString()}</span>
              </div>
              <span>—</span>
              <div className="flex items-center gap-1">
                <FiCheckCircle className="opacity-70" />
                <span>{new Date(task.endDate).toLocaleDateString()}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TaskForm;
