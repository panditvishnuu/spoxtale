import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronDoubleRightIcon,
  CheckCircleIcon,
  BoltIcon,
  UsersIcon,
} from "@heroicons/react/24/outline"; // Updated import path

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-poppins">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          }}
        ></div>

        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-indigo-900/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        ></motion.div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Task Manager
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Manage your tasks efficiently and effectively with our intuitive and
            powerful task management system.
          </motion.p>
          <motion.button
            onClick={handleLoginClick}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <span>Get Started</span>
            <ChevronDoubleRightIcon className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              className="bg-gray-700 p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <CheckCircleIcon className="w-16 h-16 mx-auto text-purple-400" />
              <h3 className="text-2xl font-bold mt-4">Task Management</h3>
              <p className="mt-2 text-gray-300">
                Easily create, assign, and track tasks with a simple and
                intuitive interface.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="bg-gray-700 p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <BoltIcon className="w-16 h-16 mx-auto text-purple-400" />
              <h3 className="text-2xl font-bold mt-4">Fast & Efficient</h3>
              <p className="mt-2 text-gray-300">
                Designed for speed and efficiency to help you stay productive.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="bg-gray-700 p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <UsersIcon className="w-16 h-16 mx-auto text-purple-400" />
              <h3 className="text-2xl font-bold mt-4">Collaboration</h3>
              <p className="mt-2 text-gray-300">
                Collaborate with your team and manage tasks seamlessly.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 bg-gray-900 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of users who are already managing their tasks
            efficiently with Task Manager.
          </p>
          <button
            onClick={handleLoginClick}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2 mx-auto"
          >
            <span>Sign Up Now</span>
            <ChevronDoubleRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
