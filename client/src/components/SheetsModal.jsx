import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const SheetsModal = ({ setOpenModal }) => {
  const [sheets, setSheets] = useState([]);
  const [loading, setLoading] = useState(false);
  const { records } = useSelector((state) => state.csvData);
  const navigate = useNavigate();

  // Fetch existing google sheets of the user
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/api/v1/googlesheets/", {
        withCredentials: true,
      })
      .then((res) => {
        setSheets(res.data?.sheets);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Internal Server Error");
        setLoading(false);
      });
  }, []);

  // Handller to append data to existing google sheet & redirect back to the home page
  function handleAppend(id) {
    setLoading(true);
    axios
      .put(
        "http://localhost:8000/api/v1/googlesheets/",
        { data: records, spreadsheetId: id },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data?.message);
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Internal Server Rrror");
        setLoading(false);
        navigate("/");
      });
  }

  // Loading UI
  if (loading) {
    return <Loading message="Loading Sheets, please wait..." />;
  }

  return (
    <div className="bg-white w-full max-w-lg h-96 overflow-y-auto rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 pb-3">
      {/* Modal Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Select File to Append
        </h2>
        <button
          onClick={() => setOpenModal(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      {/* List of Sheets */}
      <ul className="space-y-4">
        {sheets.map(({ name, id }) => (
          <li
            key={id}
            className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border"
          >
            <span className="text-gray-700 font-medium truncate">{name}</span>
            <button
              onClick={() => handleAppend(id)}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Append
            </button>
          </li>
        ))}
      </ul>

      {/* Modal Footer */}
      <div className="flex justify-end pt-4 border-t">
        <button
          onClick={() => setOpenModal(false)}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SheetsModal;
