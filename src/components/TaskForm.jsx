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
  FiSearch,
  FiLogOut,
} from "react-icons/fi";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const TaskForm = ({ userRole, currentUser, email }) => {
  console.log("current user  ", currentUser);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");
  const [employees, setEmployees] = useState([]);
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTaskLoading, setIsTaskLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedAssignee, setSelectedAssignee] = useState("All");

  const filteredTasks = React.useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "All" || task.status === selectedStatus;
      const matchesPriority =
        selectedPriority === "All" || task.priority === selectedPriority;
      const matchesAssignee =
        selectedAssignee === "All" || task.assignedTo?._id === selectedAssignee;

      return (
        matchesSearch && matchesStatus && matchesPriority && matchesAssignee
      );
    });
  }, [tasks, searchQuery, selectedStatus, selectedPriority, selectedAssignee]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await fetchTasks();
        if (userRole === "Administrator" || userRole === "Manager") {
          await fetchEmployees();
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
      const response = await axios.get(
        "https://spoxtale-backend-598s.onrender.com/api/employees",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEmployees(response.data.filter((user) => user.role === "Employee"));
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  };

  // Create a new task
  const handleCreateTask = async (e) => {
    e.preventDefault();
    setIsTaskLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://spoxtale-backend-598s.onrender.com/api/tasks",
        {
          title,
          description,
          assignedTo,
          status: "Pending",
          priority,
          startDate: new Date(),
          endDate: dueDate,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchTasks();
      setTitle("");
      setDescription("");
      setAssignedTo("");
    } catch (err) {
      console.error("Failed to create task:", err);
    } finally {
      setIsTaskLoading(false);
    }
  };

  // Update task status
  const handleUpdateStatus = async (taskId, newStatus) => {
    setIsTaskLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://spoxtale-backend-598s.onrender.com/api/tasks/${taskId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchTasks();
    } catch (err) {
      console.error("Failed to update task status:", err);
    } finally {
      setIsTaskLoading(false);
    }
  };

  // Update task details
  const handleUpdateTask = async (task) => {
    const newTitle = prompt("Enter new title", task.title);
    const newDesc = prompt("Enter new description", task.description);

    if (!newTitle) return;

    setIsTaskLoading(true);
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
      await fetchTasks();
    } catch (err) {
      console.error("Failed to update task:", err);
    } finally {
      setIsTaskLoading(false);
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    setIsTaskLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://spoxtale-backend-598s.onrender.com/api/tasks/${taskId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await fetchTasks();
    } catch (err) {
      console.error("Failed to delete task:", err);
    } finally {
      setIsTaskLoading(false);
    }
  };

  // Profile Header with animations
  const ProfileHeader = ({ currentUser, userRole }) => {
    const userInitial = currentUser[0].toUpperCase() || "?";

    return (
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mb-8 shadow-lg shadow-purple-500/20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* User Avatar */}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
              {userInitial}
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-amber-200">
                {currentUser.toUpperCase() || "User"}
              </h2>
              {/* User Role & Email */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-1 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <FiBriefcase className="opacity-75" />
                  <span className="opacity-90">{userRole}</span>
                </div>
                <div className="flex items-center gap-1 mt-1 sm:mt-0">
                  <FiUser className="opacity-75" />
                  <span className="truncate max-w-[180px] sm:max-w-full">
                    {email || "No Email"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

  const LoadingSpinner = () => (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <FiLoader className="w-12 h-12 text-cyan-400 animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {(isLoading || isTaskLoading) && <LoadingSpinner />}
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-[800px] h-[800px] -top-64 -left-64 bg-gradient-radial from-cyan-500/30 to-transparent animate-pulse" />
        <div className="absolute w-[800px] h-[800px] -bottom-64 -right-64 bg-gradient-radial from-purple-500/30 to-transparent animate-pulse delay-1000" />
      </div>

      <Navbar userRole={userRole} currentUser={currentUser} />

      <div className="max-w-6xl mx-auto px-4 pt-24 pb-12 relative">
        <div className="flex flex-col gap-8">
          <ProfileHeader currentUser={currentUser} userRole={userRole} />

          {/* Create Task Form */}
          {(userRole === "Administrator" || userRole === "Manager") && (
            <motion.form
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              onSubmit={handleCreateTask}
              className="mb-8 bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-gray-800"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-cyan-400">
                <FiPlus className="text-cyan-400" /> Create New Task
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Task Title */}
                <div className="space-y-1">
                  <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                    required
                  />
                </div>

                {/* Priority */}
                <div className="space-y-1">
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>

                {/* Assigned To */}
                <div className="space-y-1">
                  <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
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

                {/* Due Date */}
                <div className="space-y-1">
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              {/* Task Description */}
              <div className="mt-4">
                <textarea
                  placeholder="Task description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                  rows="2"
                />
              </div>

              {/* Create Task Button */}
              <button
                type="submit"
                className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
              >
                <FiPlus className="w-5 h-5" /> Create Task
              </button>
            </motion.form>
          )}

          {/* Task List Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Active Tasks
            </h2>
            <span className="text-cyan-400 bg-gray-800 px-3 py-1 rounded-full text-sm">
              {filteredTasks.length}{" "}
              {filteredTasks.length === 1 ? "task" : "tasks"}
            </span>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
              />
              <FiSearch className="absolute right-3 top-3 text-gray-400" />
            </div>

            <div className="flex gap-3 flex-wrap">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-cyan-400 focus:outline-none focus:border-cyan-500"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-cyan-400 focus:outline-none focus:border-cyan-500"
              >
                <option value="All">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <select
                value={selectedAssignee}
                onChange={(e) => setSelectedAssignee(e.target.value)}
                className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-cyan-400 focus:outline-none focus:border-cyan-500"
              >
                <option value="All">All Assignees</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.username}
                  </option>
                ))}
              </select>

              <button
                onClick={() => {
                  setSelectedStatus("All");
                  setSelectedPriority("All");
                  setSelectedAssignee("All");
                }}
                className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 text-cyan-400 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Task List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
            {filteredTasks.map((task) => (
              <motion.div
                key={task._id}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-800 hover:border-cyan-500/30 relative group transition-all duration-300"
              >
                {/* Glowing effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Task Header */}
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-100 truncate">
                    {task.title}
                  </h3>
                  <StatusBadge status={task.status} />
                </div>

                {/* Task Body */}
                <div className="mt-4 space-y-3">
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {task.description}
                  </p>

                  {/* Assigned To */}
                  <div className="flex items-center gap-2 text-sm text-cyan-400">
                    <FiUser className="flex-shrink-0" />
                    <span className="truncate">
                      {task.assignedTo?.username}
                    </span>
                  </div>

                  {/* Priority */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500">
                      Priority:
                    </span>
                    <div
                      className={`px-2 py-1 rounded-full text-xs ${
                        task.priority === "High"
                          ? "bg-red-500/20 text-red-400"
                          : task.priority === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {task.priority}
                    </div>
                  </div>
                </div>

                {/* Task Footer */}
                <div className="mt-4 pt-3 border-t border-gray-800">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <FiClock className="text-cyan-400" />
                      <span>
                        {new Date(task.startDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCheckCircle className="text-purple-400" />
                      <span>{new Date(task.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex items-center justify-between z-10">
                  {/* Status Dropdown */}
                  {(userRole === "Employee" ||
                    userRole === "Manager" ||
                    userRole === "Administrator") && (
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleUpdateStatus(task._id, e.target.value)
                      }
                      className="px-3 py-1 rounded-lg bg-gray-800 border border-gray-700 text-cyan-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 text-sm z-20 cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  )}

                  {/* Edit and Delete Buttons */}
                  <div className="flex items-center gap-2 z-20 ">
                    {(userRole === "Administrator" ||
                      userRole === "Manager") && (
                      <button
                        onClick={() => handleUpdateTask(task)}
                        className="p-2 hover:bg-gray-800/50 rounded-lg text-cyan-400 hover:text-cyan-300 transition-colors z-20 cursor-pointer"
                      >
                        <FiEdit size={16} />
                      </button>
                    )}

                    {userRole === "Administrator" && (
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="p-2 hover:bg-gray-800/50 rounded-lg text-red-400 hover:text-red-300 transition-colors z-20 cursor-pointer"
                      >
                        <FiTrash size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default TaskForm;
