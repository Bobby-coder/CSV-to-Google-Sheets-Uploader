import { useDispatch, useSelector } from "react-redux";
import {
  setLimit,
  setPage,
} from "../store/features/pagination/paginationSlice";

const Pagination = () => {
  const { records } = useSelector((state) => state.csvData);
  const { page, limit } = useSelector((state) => state.pagination);
  const dispatch = useDispatch();

  // Total pages
  const totalPages = Math.ceil(records.length / limit);

  // Handler to set current page value
  function handlePage(val) {
    dispatch(setPage(val));
  }

  // Handler to set previous page value
  function handlePrevious() {
    dispatch(setPage(page - 1));
  }

  // Handler to set next page value
  function handleNext() {
    dispatch(setPage(page + 1));
  }

  function handleLimit(val) {
    dispatch(setLimit(val));
  }

  return (
    <div>
      {/*Previous page button*/}
      {page > 1 && (
        <span
          className="p-3 border border-s cursor-pointer"
          onClick={handlePrevious}
        >
          &lt;
        </span>
      )}

      {Array.from({ length: totalPages }).map((_, i) => (
        <span
          className="p-3 border border-s cursor-pointer"
          key={crypto.randomUUID()}
          onClick={() => handlePage(i + 1)}
        >
          {i + 1}
        </span>
      ))}

      {/*Next page button*/}
      {page < totalPages && (
        <span
          className="p-3 border border-s cursor-pointer"
          onClick={handleNext}
        >
          &gt;
        </span>
      )}

      {/*Records per page*/}
      <select onChange={(e) => handleLimit(e.target.value)}>
        <option>5</option>
        <option>10</option>
        <option>20</option>
      </select>
    </div>
  );
};

export default Pagination;
