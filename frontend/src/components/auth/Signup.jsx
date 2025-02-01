import React, { useState } from "react";
import { User, Mail, Lock, KeyRound, Loader } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();

  const { mutate: signUpMutation, isLoading } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/auth/signup", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Account Created Successfully");
      queryClient.refetchQueries({ queryKey: ["authUser"] });
    },
    onError: (err) => {
      console.log("Error response data:", err.response.data.message);
      toast.error(err.response.data.message || "Something Went Wrong");
    },
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Signing up with:", { name, email, username, password });
    signUpMutation({ name, email, username, password });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-[#1E1E1E] shadow-xl rounded-2xl p-6 sm:p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Create an Account
        </h2>

        <form onSubmit={handleSignUp} className="space-y-4">
          {/* Name Field */}
          <div className="flex items-center border border-gray-600 rounded-lg p-2 bg-[#2A2A2A]">
            <User className="text-gray-400 mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent text-white focus:outline-none"
              required
            />
          </div>

          {/* Email Field */}
          <div className="flex items-center border border-gray-600 rounded-lg p-2 bg-[#2A2A2A]">
            <Mail className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-white focus:outline-none"
              required
            />
          </div>

          {/* Username Field */}
          <div className="flex items-center border border-gray-600 rounded-lg p-2 bg-[#2A2A2A]">
            <KeyRound className="text-gray-400 mr-2" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent text-white focus:outline-none"
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center border border-gray-600 rounded-lg p-2 bg-[#2A2A2A]">
            <Lock className="text-gray-400 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-white focus:outline-none"
              required
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition"
          >
            {isLoading ? (
              <Loader className="animate-spin w-6 h-6 text-white mx-auto" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
