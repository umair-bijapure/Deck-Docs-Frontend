'use client';
import CommonTabs from "@/app/components/common/tabs"
import EmployeeTab from "./employeeTab";
import { Reportstab } from "./reportsTab";
import Image from 'next/image'; 
import { useEffect, useState } from "react";
import BottomMenu from "@/app/components/bottomNavbar";
import SubContractor from "./sub_contractor";
import ClientTab from "./clientTab";
import { ProjectsTab } from "./projectTab";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { NotificationsList } from "@/app/components/common/notifications";
import { getLoggedInUserData } from "@/app/components/utils/utils";


 interface DashboardPageProps{
  username:string;
  organisationId:string;
 }

const DashboardPage = (props: any): JSX.Element => {

  const {username}=props as DashboardPageProps
  const {organisationId}=props as DashboardPageProps


  const [employees, setEmployees] = useState<any>([]);


  // const getData = async () => {
  
  //   const response = await axios.get(`http://localhost:5000/api/user/${username}`);
  //   const respData = response.data;
    
  //   setEmployees(respData)
  // };

  // useEffect(()=>{

  //   getData();
  // }, [])

  const [profile_data, setProfileData] = useState<any>([]);
  const getUserData = async() => {
    const response = await axios.get(`http://localhost:5000/api/user/singleuser/${username}`);
    setProfileData(response.data);
  
  }

  useEffect(()=>{
    getUserData();
  }, [username]);



  
  // Now profile_data is guaranteed to be defined
  
  
  const handleEmployeeAdded = async (id:string) => {
   
 
    const response = await axios.get(`http://localhost:5000/api/user/${id}`);
    const respData = response.data;
    setEmployees((prevData:any)=>[...prevData,...respData])
    // getData(); // Fetch the updated employee list
  };
  const [notifications, setNotifications] = useState([]);

    useEffect(() => {
      if (username) {
        fetchNotifications(username);
      }
    }, [username]);

  const fetchNotifications = async (userId: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/notification/notifications/${userId}`);
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleDeleteNotification = async (notificationId: string) => {
    try {
      await axios.delete(`/api/notifications/${username}/${notificationId}`);
      setNotifications(notifications.filter((n: any) => n._id !== notificationId));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };


  
    return (
        <>
        <div className="z-10 ">
          <div className="hidden sm:flex flex-col justify-center  align-middle  overflow-y-auto items-stretch w-full no-scrollbar  ">
            <CommonTabs username={username}  organisationId={organisationId}  profile_data={profile_data} userType={"contractor"} />
          </div>


        </div>
        </>
    )
  }

  export default DashboardPage