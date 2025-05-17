import axiosInstance from "../Interceptor/AxoisInterceptor"

const getResult = async (rollNumber: string) => {
  try {
    const response = await axiosInstance.get(`/student/result/${rollNumber}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getNotices = async () =>{
  try{
    const response = await axiosInstance.get(`/student/notices`);
    return response.data;
  }catch(err){
    throw err;
  }
};

export {getResult, getNotices};