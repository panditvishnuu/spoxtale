import { FiHome, FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ userRole, currentUser }) => {
  const navigate = useNavigate();

  if (!currentUser) {
    return null; // Avoid errors if user data isn't available
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirect to the home/login page
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-50"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to="/">
              <div className="flex items-center gap-2 text-cyan-400">
                <FiHome className="text-xl" />
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Taskify
                </span>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-4 text-gray-300">
              <span className="hover:text-cyan-400 cursor-pointer">
                Dashboard
              </span>
              <span className="hover:text-cyan-400 cursor-pointer">
                Analytics
              </span>
              <span className="hover:text-cyan-400 cursor-pointer">Team</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-gray-800/50 px-3 py-1 rounded-full text-sm text-cyan-400">
              {userRole}
            </div>
            <button
              onClick={handleLogout}
              className="p-1 hover:bg-gray-800/30 rounded-full cursor-pointer"
            >
              <FiLogOut className="text-xl text-cyan-400" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
