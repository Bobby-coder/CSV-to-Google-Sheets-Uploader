import { useSelector } from "react-redux";

const DataTable = () => {
  // Extract data from global store
  const { headers, records, status, error } = useSelector(
    (state) => state.csvData
  );

  const { page, limit } = useSelector((state) => state.pagination);

  // Loading UI
  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  // Error UI
  if (error) {
    return <h1>{error.data.message || "Something went wrong"}</h1>;
  }

  // Data Table
  return (
    <table>
      {/* Table Header */}
      <thead>
        {headers.map((currHeader) => {
          return <th key={crypto.randomUUID()}>{currHeader}</th>;
        })}
      </thead>

      {/* Table Body */}
      <tbody>
        {records
          .slice((page - 1) * limit, (page - 1) * limit + limit)
          .map((currRow) => {
            return (
              <tr key={crypto.randomUUID()}>
                {currRow.map((currValue) => {
                  return <td key={crypto.randomUUID()}>{currValue}</td>;
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default DataTable;
