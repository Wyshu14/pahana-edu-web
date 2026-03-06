import BillTable from "../components/dashboard/BillTable";
import QuickActions from "../components/dashboard/QuickActions";

const Dashboard = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <QuickActions />
      <BillTable />
    </div>
  );
};

export default Dashboard;
