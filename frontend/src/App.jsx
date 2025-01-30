import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout/Layout";
import {axiosInstance} from "./lib/axios";



const App = () => {
  return(
    <Layout>
    <HomePage />
    </Layout>
  )
}

export default App;