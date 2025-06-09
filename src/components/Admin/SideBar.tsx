import { ActionIcon, Avatar, Divider, Flex,Text } from "@mantine/core";
import {  IconFilePercent,IconUser,IconFileDescription, IconLayoutGrid, IconDoorExit} from '@tabler/icons-react'
import { NavLink, useNavigate } from "react-router-dom";
import { successNotification } from "../../utility/Notification";


const SideBar = () => {
  const links = [
  
    {name:'Dashboard',url:"dashboard",icon:<IconLayoutGrid size={20} className="text-black" stroke={2.5} />},
    {name:'Student',url:"student",icon:<IconUser size={20} className="text-black" stroke={2.5} />},
    {name:'Result',url:"result",icon:<IconFilePercent size={20} className="text-black" stroke={2.5} />},
    {name:'Notice',url:"notice",icon:<IconFileDescription size={20} className="text-black" stroke={2.5} />}

  ]

  const navigate = useNavigate();
  const handleLogout= () => {
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        successNotification("logout Done");
        navigate("/login");
  }


  return (
    
    <nav className="w-72 bg-fuchsia-200 h-screen flex justify-between items-center flex-col">
      <div>
      <div className="flex font-bold text-2xl justify-center items-center">
        AdminDashboard 
      </div>
      <Divider my="lg" color="black"/>
      <div className="flex flex-col gap-2">
        {links.map((link)=>{
          return <NavLink key={link.url} to={link.url} className={({isActive})=>`
          flex items-center gap-2 p-2 rounded-md cursor-pointer ${isActive ? "bg-fuchsia-400":"hover:bg-fuchsia-500" } `}>

            <ActionIcon variant="transparent" size="xl">{link.icon}</ActionIcon>
            <span>{link.name}</span>

            </NavLink>
        })

        }
        
      </div>
      </div>
      <div>
        <button className="flex items-center justify-center bg-fuchsia-300 w-full py-4 rounded-xl cursor-pointer gap-2" onClick={handleLogout}><span className="font-bold"> Log out </span> <IconDoorExit /> </button>
        <Divider my="8" />

          <Flex justify="center" align="center" gap={20}>
            <Avatar size={45} />
            <Text>Admin@gmail.com</Text>
          </Flex>
      </div>
    </nav>
    

    );
}

export default SideBar ;