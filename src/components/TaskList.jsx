import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await axios.get("http://localhost:3000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Full response:", response);
        console.log("User role:", response.data?.role);

        setUserRole(response.data?.role);
      } catch (err) {
        console.error("Failed to fetch user role:", err.response?.data || err);
      }
    };

    fetchUserRole();
  }, []); // Runs only once when the component mounts

  useEffect(() => {
    if (!userRole) return; // Ensures we don't fetch tasks with an empty role

    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        let apiUrl = "http://localhost:3000/api/tasks"; // Default for Admin/Manager

        if (userRole === "Employee") {
          apiUrl = "http://localhost:3000/api/tasks/my-tasks"; // Employee-specific endpoint
        }

        const response = await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched tasks:", response.data); // Debugging
        setTasks(response.data);
      } catch (err) {
        console.error(
          "Failed to fetch tasks:",
          err.response?.data || err.message
        );
      }
    };

    fetchTasks();
  },[userRole]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Task Management</h1>
      {userRole === "Administrator" || userRole === "Manager" || userRole === "Employee" ? (
        <TaskForm userRole={userRole} />
      ) : null}
    </div>
  );
};

export default TaskList;
