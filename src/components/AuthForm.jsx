import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  UserIcon,
  LockClosedIcon,
  SparklesIcon,
  ShieldCheckIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Dynamic Yup schema based on isLogin state
  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .when("isLogin", {
        is: false,
        then: yup.string().required("Email is required"),
      }),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    role: yup
      .string()
      .oneOf(["Administrator", "Employee", "Manager"], "Invalid role")
      .when("isLogin", {
        is: false,
        then: yup.string().required("Role is required"),
      }),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { isLogin },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";

    try {
      const response = await axios.post(
        `https://spoxtale-backend-598s.onrender.com${endpoint}`,
        data
      );

      if (isLogin) {
        localStorage.setItem("token", response.data.token);
        navigate("/tasks");
      } else {
        alert("Registration successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      setError("apiError", {
        type: "manual",
        message: err.response?.data?.message || "An error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">

      {/* Form Container */}
      <motion.div
        className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl pt-6 pb-8 px-6 w-full max-w-md mx-4 h-[80%]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-8">
          <motion.div
            className="w-16 h-16 mb-4 mx-auto bg-cyan-500/10 rounded-xl flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <SparklesIcon className="w-8 h-8 text-cyan-400" />
          </motion.div>
          <motion.h2
            className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {isLogin ? "Welcome Back!" : "Get Started"}
          </motion.h2>
        </div>

        {/* Show API error messages */}
        {errors.apiError && (
          <motion.div
            className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-lg mb-6 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {errors.apiError.message}
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Username *
            </label>
            <div className="relative">
              <UserIcon className="w-5 h-5 absolute left-3 top-3 text-gray-500" />
              <input
                {...register("username")}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 text-gray-100"
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
          </div>

          {/* Email (only for Register) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email *
              </label>
              <div className="relative">
                <EnvelopeIcon className="w-5 h-5 absolute left-3 top-3 text-gray-500" />
                <input
                  {...register("email")}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 text-gray-100"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Password *
            </label>
            <div className="relative">
              <LockClosedIcon className="w-5 h-5 absolute left-3 top-3 text-gray-500" />
              <input
                {...register("password")}
                type="password"
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 text-gray-100"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Role (only for Register) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Role
              </label>
              <select
                {...register("role")}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 text-gray-100 focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">Select Role</option>
                <option value="Administrator">Administrator</option>
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
              </select>
              {errors.role && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ShieldCheckIcon className="w-5 h-5" />
                {isLogin ? "Login" : "Register"}
              </>
            )}
          </motion.button>
        </form>

        {/* Toggle Between Login and Register */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center justify-center gap-2"
          >
            <span>
              {isLogin
                ? "Don't Have an Account? "
                : "Already Have an Account? "}
            </span>
            <span className="font-semibold bg-cyan-500/10 px-3 py-1 rounded-lg">
              {isLogin ? "Register" : "Login"}
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthForm;
