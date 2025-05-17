import { notifications } from "@mantine/notifications";
import axiosInstance from "../Interceptor/AxoisInterceptor"
import { errorNotification } from "../utility/Notification";

const CreateStudent = async (student : any) => {
  try{
    const response = await axiosInstance.post(`/admin/students`,student);
    return response.data;
  }catch(err){
    errorNotification("something went wrong..")
    throw err;
  }
};

const getStudent = async () =>{
    try {
       const response = await axiosInstance.get(`/admin/students`);
       return response.data;
    } catch (error) {
        throw error;
    }
}

const updateStudent= async (student : any) => {
  try{
    const response = await axiosInstance.post(`/admin/students/update`,student);
    return response.data;
  }catch(err){
    throw err;
  };
}


export {CreateStudent , getStudent , updateStudent};