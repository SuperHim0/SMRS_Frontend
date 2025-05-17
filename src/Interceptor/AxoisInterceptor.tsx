import axios, { type InternalAxiosRequestConfig } from 'axios';

const axoisIntstance = axios.create({
    baseURL: 'http://localhost:8888',

});


axoisIntstance.interceptors.request.use(
    
    (config : InternalAxiosRequestConfig) => {
        console.log('Request Interceptor:', config);
        return config;
    }

)
export default axoisIntstance;