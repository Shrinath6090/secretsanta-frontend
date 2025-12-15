import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import NominationsTable from "./components/NominationsTable";


export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home → Nomination Form */}
        <Route path="/secretNomination6754" element={<App />} />

        {/* Admin / Table View */}
        <Route path="/allNominationList898" element={<NominationsTable />} />
        <Route path='*' element={<h5>Page Not found</h5>} />
      </Routes>
    </BrowserRouter>
  );
}
