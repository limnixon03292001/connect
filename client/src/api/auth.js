

import axios from 'axios';

axios.interceptors.request.use((req) => {
    if(localStorage.getItem('token')){
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }

    return req;
})

export const signUp = (data) => axios.post(`/login/signup`, data); 
export const signIn = (data) => axios.post(`/login`, data);


//I'll just leave these API ENDPOINTS here since we are not using it and we are handling the api request inside the components

// export const getUser = () => axios.get(`/login/user`);



