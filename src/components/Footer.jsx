import {  FiHeart } from "react-icons/fi";
import { motion } from "framer-motion";


const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="mt-16 py-8 border-t border-gray-800"
  >
    <div className="max-w-6xl mx-auto px-4 text-center">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent mb-8" />
      <div className="flex items-center justify-center gap-2 text-gray-400">
        <FiHeart className="text-rose-500" />
        <span>Built with passion by Vishnu</span>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
