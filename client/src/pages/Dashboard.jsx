import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";
import DashCreateProduct from "../components/DashCreateProduct";
import DashProducts from "../components/DashProducts";
import DashUsers from "../components/DashUsers";
import DashboardComp from "../components/DashboardComp";
import DashOrders from "../components/DashOrders";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56"><DashSidebar/></div>
      {tab==='profile' && <DashProfile/>}
      {tab==='createProduct' && <DashCreateProduct/>}
      {tab==='products' && <DashProducts/>}
      {tab==='users' && <DashUsers/>}
      {tab==='dash'&&<DashboardComp/>}
      {tab==='orders' && <DashOrders/>}
    </div>
  );
};

export default Dashboard;
