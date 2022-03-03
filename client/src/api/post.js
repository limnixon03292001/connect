import axios from 'axios';

axios.interceptors.request.use((req) => { 
    if(localStorage.getItem('token')){
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }

    return req;
})


export const createPost = (data) => axios.post('/post/create', data);
export const deletePost = (id) => axios.delete(`/post/delete/${id}`);
export const updatePost = (id, updateData) => axios.patch(`/post/update/${id}`, updateData);
export const likePost = (id) => axios.patch(`/post/like/${id}`);
export const createCommentPost = (id,data) => axios.post(`/post/comment/${id}`, data);
export const updateCommentPost = (id, data) => axios.patch(`/post/comment/${id}`, data);
export const deleteCommentpost = (postID, commentID) => axios.delete(`/post/${postID}/comment/${commentID}`);


//I'll just leave these API ENDPOINTS here since we are not using it and we are handling the api request inside the components

// export const fetchPostsLimit = (pageNumber) => axios.get(`/post/post?page=${pageNumber}`);
// export const fetchUserPostsLimit = (pageNumber, id) => axios.get(`/post/user?user=${id}&page=${pageNumber}`)
// export const fetchCommentPost = (id) => axios.get(`/post/comment/${id}`);