import { Link } from "react-router-dom";
import { Bell, Users, User, LogIn, LogOut } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-black border-b">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        Socio
      </Link>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded hover:bg-gray-200">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </button>
        <button className="p-2 rounded hover:bg-gray-200">
          <Users className="h-5 w-5" />
          <span className="sr-only">Friends</span>
        </button>
        <button className="p-2 rounded hover:bg-gray-200">
          <User className="h-5 w-5" />
          <span className="sr-only">User Profile</span>
        </button>
        <Link to="/login" className="flex items-center px-3 py-2 border rounded border-gray-400 hover:bg-gray-200">
          <LogIn className="h-5 w-5 mr-2" />
          Login
        </Link>
        <Link to="/logout" className="flex items-center px-3 py-2 border rounded border-gray-400 hover:bg-gray-200">
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
