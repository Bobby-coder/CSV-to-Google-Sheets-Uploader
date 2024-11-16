import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TablePage from "./pages/TablePage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/table" element={<TablePage />}></Route>
      </Routes>
    </>
  );
}

export default App;
