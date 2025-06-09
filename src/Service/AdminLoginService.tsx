import axoisIntstance from "../Interceptor/AxoisInterceptor";
import { errorNotification } from "../utility/Notification";

const AdminLoginService = async (userInfo: { username: string; password: string }) => {
  try {
    // const formData = new URLSearchParams();
    // formData.append("username", userInfo.username);
    // formData.append("password", userInfo.password);

    const response = await axoisIntstance.post(`/auth/login`, userInfo, {
      
    });

    return response.data;
  } catch (error) {
    errorNotification("Username or password is incorrect");
    throw error;
  }
};

export default AdminLoginService;
