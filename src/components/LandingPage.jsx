import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronDoubleRightIcon,
  CheckCircleIcon,
  BoltIcon,
  UsersIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  CalendarIcon,
  UserCircleIcon,
  CogIcon,
  BellIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleAuthAction = () => {
    const isLoggedIn = !!localStorage.getItem("token");
    if (isLoggedIn) {
      navigate("/tasks");
    } else {
      navigate("/login");
    }
  };

  const handleButtonClick = (action) => {
    switch (action) {
      case "login":
      case "trial":
      case "demo":
        handleAuthAction();
        break;
      case "register":
        navigate("/register");
        break;
      default:
        break;
    }
  };

  const stats = [
    { value: "1000+", label: "Active Users" },
    { value: "10k+", label: "Tasks Completed" },
    { value: "95%", label: "Satisfaction Rate" },
    { value: "24/7", label: "Support" },
  ];

  const features = [
    {
      icon: <SparklesIcon className="w-8 h-8" />,
      title: "Smart Prioritization",
      description:
        "Automatically categorize tasks based on urgency and importance",
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: "Advanced Security",
      description: "Enterprise-grade security with end-to-end encryption",
    },
    {
      icon: <ChartBarIcon className="w-8 h-8" />,
      title: "Progress Analytics",
      description: "Visual reports and productivity insights",
    },
    {
      icon: <BellIcon className="w-8 h-8" />,
      title: "Smart Reminders",
      description: "Customizable notifications and deadline alerts",
    },
    {
      icon: <CogIcon className="w-8 h-8" />,
      title: "Workflow Automation",
      description: "Create custom rules and automated task sequences",
    },
    {
      icon: <CalendarIcon className="w-8 h-8" />,
      title: "Team Scheduling",
      description: "Collaborative calendar with resource allocation",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-poppins relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute w-[800px] h-[800px] -top-64 -left-64 bg-gradient-radial from-cyan-500/30 to-transparent animate-pulse" />
        <div className="absolute w-[800px] h-[800px] -bottom-64 -right-64 bg-gradient-radial from-purple-500/30 to-transparent animate-pulse delay-1000" />
      </div>

      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BoltIcon className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Taskify
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => handleButtonClick("login")}
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:shadow-lg transition-all cursor-pointer"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
          >
            Transform Your Productivity
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Taskify is more than a task manager - it's your intelligent
            productivity partner powered by AI-driven insights and seamless team
            collaboration.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => handleButtonClick("trial")}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:scale-105 transition-transform flex items-center gap-2"
            >
              <SparklesIcon className="w-6 h-6" />
              <span>Start Free Trial</span>
            </button>
            <button
              onClick={() => handleButtonClick("demo")}
              className="px-8 py-4 border border-cyan-500/30 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-colors"
            >
              Schedule Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 text-center"
              >
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            Enterprise-Grade Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-cyan-500/30 transition-colors group"
              >
                <div className="w-12 h-12 mb-4 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {["Plan", "Organize", "Collaborate", "Achieve"].map(
              (step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 text-center"
                >
                  <div className="w-16 h-16 mb-4 mx-auto bg-cyan-500/10 rounded-full flex items-center justify-center text-cyan-400">
                    <CheckCircleIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step}</h3>
                  <p className="text-gray-300">
                    Step {index + 1} in your productivity journey
                  </p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            Trusted By Teams Worldwide
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="p-8 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <UserCircleIcon className="w-12 h-12 text-cyan-400" />
                  <div className="ml-4">
                    <h4 className="font-semibold">John Smith</h4>
                    <p className="text-gray-400">CTO at TechCorp</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  "Taskify has transformed how our team operates. The
                  intelligent task prioritization and collaboration features are
                  game-changers."
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BoltIcon className="w-8 h-8 text-cyan-400" />
                <span className="text-xl font-bold">Taskify</span>
              </div>
              <p className="text-gray-400">Empowering teams since 2023</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                {["Features", "Pricing", "Security", "Status"].map((item) => (
                  <li
                    key={item}
                    className="text-gray-400 hover:text-cyan-400 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {["About", "Blog", "Careers", "Contact"].map((item) => (
                  <li
                    key={item}
                    className="text-gray-400 hover:text-cyan-400 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                {["Privacy", "Terms", "Cookie Policy"].map((item) => (
                  <li
                    key={item}
                    className="text-gray-400 hover:text-cyan-400 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            © 2025 Taskify. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
