import { useDispatch } from "react-redux";
import { useState } from "react";
import { fetchCSVData } from "../store/features/csvData/csvDataSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const URLInput = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // state to store input URL
  const [url, setUrl] = useState("");

  // Handler to fetch csv file data
  function handleSubmit() {
    if (!url.trim().startsWith("http")) {
      toast.error("Invalid URL. URL should start with http!");
      setUrl("");
      return;
    }

    if (!url.trim().endsWith(".csv")) {
      toast.error("Invalid URL. Not a CSV file. It should end with .csv");
      setUrl("");
      return;
    }

    navigate("/table");
    dispatch(fetchCSVData(url));
    setUrl("");
  }

  return (
    <div className="flex flex-col space-y-4 w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Upload CSV File URL
      </h2>

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter CSV file URL.."
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
      />
      <button
        onClick={handleSubmit}
        disabled={url === ""}
        className={`px-6 py-2 text-white rounded-lg shadow focus:ring-2 focus:ring-blue-500 focus:outline-none ${
          url === ""
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Submit
      </button>
    </div>
  );
};

export default URLInput;
