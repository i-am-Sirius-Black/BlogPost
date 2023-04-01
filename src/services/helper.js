import axios from "axios";
import { getToken } from "../auth";

export const Base_URL='http://localhost:9090/api/v1';

export const myAxios=axios.create({
    baseURL:Base_URL
})


export const privateAxios=axios.create({
    baseURL:Base_URL
})




privateAxios.interceptors.request.use(config=>{

    const token = getToken()
    console.log('token:', token);
    if(token) {

        config.headers.Authorization=`Bearer ${token}`
        
    }
    console.log('config:', config);
    return config;
}, 
  (error) => Promise.reject(error)
);
