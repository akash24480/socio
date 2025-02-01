import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout/Layout";
import {axiosInstance} from "./lib/axios";
import {useQuery} from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";



const App = () => {

  // Getting the current user
  const {data:authUser, isLoading} = useQuery({
    queryKey:["authUser"],
    queryFn: async() => {
      try{
        const res = await axiosInstance.get("/auth/me");
        return res.data;

      }catch(error){
        console.log(error)
        if(error.response && error.response.status === 401){
          return null
        }
        toast.error(error.response.data.message || "Something went worng")
      }
    }
  })


  if (isLoading) return null;



  return(
    <Layout>
    <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to={"/"} />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to={"/"} />} />
    </Routes>
    <Toaster />
    </Layout>
  )
}

export default App;