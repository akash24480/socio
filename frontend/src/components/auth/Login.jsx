import React, { useState } from 'react';
import { User, Lock, Loader } from 'lucide-react';
import { useMutation, useQueryClient} from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios';
import toast from 'react-hot-toast';

const Login = () => {

  const queryClient = useQueryClient()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {mutate: loginMutation, isLoading} = useMutation({
    mutationFn:async(userData) => {
      const res = await axiosInstance.post("/auth/login",userData)
      return res.data;
    },
    onSuccess:(data)=> {
      toast.success(data.message)
      queryClient.invalidateQueries({queryKey:["authUser"]})
      window.location.href = "/";


    },
    onError:(err) => {
      toast.error(err.response?.data?.message || "Something went wrong")
    }
  })

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    loginMutation({username, password})
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          {/* Username Field */}
          <div className="flex items-center border border-gray-600 rounded-lg p-2 bg-gray-700">
            <User className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent text-white focus:outline-none"
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center border border-gray-600 rounded-lg p-2 bg-gray-700">
            <Lock className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-white focus:outline-none"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition"
          >
            {isLoading ? <Loader className="size-5 animate-spin" /> : "Login"}
            
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
          New to Socio create an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Join Now
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
