import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../store/features/pagination/paginationSlice";

const Pagination = () => {
  const { records } = useSelector((state) => state.csvData);
  const { page, limit } = useSelector((state) => state.pagination);
  const dispatch = useDispatch();

  // Total pages
  const totalPages = Math.ceil(records.length / limit);

  // Handler to set previous page value
  function handlePrevious() {
    dispatch(setPage(page - 1));
  }

  // Handler to set next page value
  function handleNext() {
    dispatch(setPage(page + 1));
  }

  return (
    <div className="flex justify-center items-center gap-3 my-4">
      {/* Previous page button */}
      {page > 1 && (
        <span
          className="px-4 py-2 border border-gray-300 rounded-sm cursor-pointer hover:bg-gray-100"
          onClick={handlePrevious}
        >
          &lt;
        </span>
      )}

      <span
        key={crypto.randomUUID()}
        className={`px-4 py-2 border rounded-sm cursor-pointer border-gray-300 hover:bg-gray-100`}
      >
        {page}
      </span>

      {/* Next page button */}
      {page < totalPages && (
        <span
          className="px-4 py-2 border border-gray-300 rounded-sm cursor-pointer hover:bg-gray-100"
          onClick={handleNext}
        >
          &gt;
        </span>
      )}
    </div>
  );
};

export default Pagination;
