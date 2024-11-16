import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Pagination from "./Pagination";
import { useState } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import SheetsModal from "./SheetsModal";

const DataTable = () => {
  // Extract data from global store
  const { headers, records, status, error } = useSelector(
    (state) => state.csvData
  );

  const { page, limit } = useSelector((state) => state.pagination);

  const navigate = useNavigate();

  const [uploadLoading, setuploadLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // Handller to upload data to new google sheet and rediect back to the home page
  async function handleUpload() {
    try {
      setuploadLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/googlesheets/",
        {
          data: [headers, ...records],
        },
        { withCredentials: true }
      );
      toast.success(res.data?.message);
      setuploadLoading(false);
      navigate("/");
    } catch (err) {
      setuploadLoading(false);
      toast.error(err.response?.data?.message || "Internal Server error");
    }
  }

  // Upload Loading UI
  if (uploadLoading) {
    return <Loading message={"Uploading data, please wait..."} />;
  }

  // Loading UI
  if (status === "loading") {
    return <Loading message={"Loading data, please wait..."} />;
  }

  // Error Toast
  if (error) {
    console.log(error);
    toast.error(error || "Something went wrong");
    navigate("/");
  }

  // Data Table UI
  return (
    <div>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
          {/* Table Header */}
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              {headers.map((currHeader) => (
                <th key={crypto.randomUUID()} className="px-6 py-3">
                  {currHeader}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {records
              .slice((page - 1) * limit, (page - 1) * limit + limit)
              .map((currRow) => (
                <tr key={crypto.randomUUID()} className="hover:bg-gray-50">
                  {currRow.map((currValue) => (
                    <td key={crypto.randomUUID()} className="px-6 py-4">
                      {currValue}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>

        <Pagination />
      </div>

      {/* Upload Buttons */}
      {headers.length > 0 && records.length > 0 && (
        <div className="flex justify-center gap-3 my-3">
          <button
            onClick={handleUpload}
            className="px-6 py-2 bg-blue-600 text-white rounded-sm shadow hover:bg-blue-700"
          >
            Upload to Google Sheets
          </button>
          <button
            onClick={() => setOpenModal(true)}
            className="px-6 py-2 bg-gray-600 text-white rounded-sm shadow hover:bg-gray-700"
          >
            Append to existing Google sheet
          </button>
        </div>
      )}
      {/* Existing Sheets Modal */}
      {openModal && <SheetsModal setOpenModal={setOpenModal} />}
    </div>
  );
};

export default DataTable;
