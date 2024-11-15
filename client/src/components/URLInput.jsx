import { useDispatch } from "react-redux";
import { useState } from "react";
import { fetchCSVData } from "../store/features/csvData/csvDataSlice";

const URLInput = () => {
  const dispatch = useDispatch();
  // state to store input URL
  const [url, setUrl] = useState("");

  // Handler to fetch csv file data
  function handleSubmit() {
    dispatch(fetchCSVData(url));
    setUrl("");
  }

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter CSV file URL.."
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default URLInput;
