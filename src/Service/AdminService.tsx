
import axiosInstance from "../Interceptor/AxoisInterceptor"
import { errorNotification, successNotification } from "../utility/Notification";

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

const addNotice = async (notice : any) =>{
  try{
    const response = await axiosInstance.post(`/notice/save` , notice);
    return response.data;
  }catch (error){
    throw error;
  }
}
const updateNotice = async (notice : any) =>{
  try{
    const response = await axiosInstance.post(`/notice/update` , notice);
    return response.data;
  }catch (error){
    throw error;
  }
}

const getResultsOfAllStudents = async () => {
  try {
    const response = await axiosInstance.get(`/admin/results`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const getSubjectsDetailsWithClass = async () =>{
  try {
    const response = await axiosInstance.get('admin/subject-combinations');
    return response.data;
  }catch (error) {
    throw error;
  }
}

const addResultOfStudentSubjectwise = async (result : any) => {
  try{
    const response =await axiosInstance.post(`admin/results`,result);
    successNotification("result added");
    
    return response.data;
  }catch(error){
    errorNotification("something went wrong...")
    throw error;
  }
}

export {CreateStudent , getStudent , updateStudent, addNotice ,updateNotice,getResultsOfAllStudents,getSubjectsDetailsWithClass,addResultOfStudentSubjectwise};