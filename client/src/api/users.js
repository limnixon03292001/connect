import axios  from 'axios';

axios.interceptors.request.use((req) => { 
    if(localStorage.getItem('token')){
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }

    return req;
})


// export const userProfile = (id) => axios.get(`/users/${id}`); //user Profile

//I'll just leave this API ENDPOINT here since we are not using it and we are handling the api request inside the components

// export const searchUser = (name) => axios.get(`/users/search?q=${name}`); // search user
// export const allUser = () => axios.get(`/users`); //get all users
// export const getUser = (id) => axios.get(`/users/user/${id}`); // get single user


export const updateUserProfile = (id, data) => axios.patch(`/users/${id}` ,data); //update user profile name only
export const updateCoverPhoto = (id,data) => axios.patch(`/users/coverPhoto/${id}`, data); //update user profile coverPhoto
export const updateProfilePicture = (id,data) => axios.patch(`/users/profilePicture/${id}`, data); //update user profile profilePicture

export const followUser = (id) => axios.patch(`/users/follow/${id}`);
