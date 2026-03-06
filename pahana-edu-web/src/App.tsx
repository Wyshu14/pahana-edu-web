import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./layouts";
import { Billing, CustomersView, Items, Reports } from "./pages";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index path="/dashboard" element={<Dashboard />} />
          <Route path="customers" element={<CustomersView />} />
          <Route path="items" element={<Items />} />
          <Route path="billing" element={<Billing />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
