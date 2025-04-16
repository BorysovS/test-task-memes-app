import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import TablePage from "./pages/table";
import ListPage from "./pages/list";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route path="/table" element={<TablePage />} />
      <Route path="/list" element={<ListPage />} />
    </Routes>
  );
}

export default App;
