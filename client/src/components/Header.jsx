import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Header = () => {
  const [isConnected, setIsConnected] = useState(!!document.cookie);

  // Handler to connect Google Acoount
  function handleGoogleAccountConnect() {
    window.location.href = "http://localhost:8000/api/v1/googlesheets/auth";
    setIsConnected(!!document.cookie);
  }

  // handler to disconnect Google Account
  async function handleDisconnect() {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/googlesheets/clear-cookies",
        {},
        { withCredentials: true }
      );
      toast.success(res.data?.message);
      setIsConnected(!!document.cookie);
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  }

  return (
    <header className="flex items-center justify-between px-9 py-3 bg-white">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        CSVLoader
      </Link>

      <div className="flex items-center gap-1">
        {/* Connect Google Account */}
        <button
          onClick={handleGoogleAccountConnect}
          className={`px-4 py-2 text-xs sm:text-base font-semibold text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ${
            isConnected
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isConnected ? "Google Account Connected" : "Connect to Google"}
        </button>

        {/* Disconnect Google Account*/}
        {isConnected && (
          <button
            onClick={handleDisconnect}
            className="px-4 py-2 text-xs sm:text-base font-semibold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 
            hover:shadow-lg transition-all duration-200"
          >
            Disconnect Google Account
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
