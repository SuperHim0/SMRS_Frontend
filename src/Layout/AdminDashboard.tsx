
import { Outlet } from "react-router-dom";
import SideBar from "../components/Admin/SideBar";



const AdminDashboard = () => {


  return (
      <div className="flex">
        <SideBar/>
        <div className="flex w-full flex-row">

          <Outlet/>
        </div>
      </div>
    );
}

export default AdminDashboard ;