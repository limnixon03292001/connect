import * as api from '../../api/post';

//I'll just leave these actions here since we are not using it and we are handling the api request inside the components

// export const fetchPostsLimit = (history, pageNumber, setHasMore) => async (dispatch) => {
//     try {
//         dispatch({type: 'POSTS_LOADING'});
//         const {data} = await api.fetchPostsLimit(pageNumber);
//         console.log('post data: ', data);
//         setHasMore(data.result.length > 0);
//         dispatch({type: 'POSTS', payload: data});
//     } catch (err) {
//         dispatch({type:'ERRORS', payload: err});
//         if(err.response?.status === 401){
//             dispatch({type:'LOGOUT'});
//             history.push('/login');
//         }
//     }
// }
// export const fetchUserPostsLimit = (history, id, pageNumber,setHasMore) => async (dispatch) => {

//     try {
//         dispatch({type:'POSTS_LOADING'});
//         const {data} = await api.fetchUserPostsLimit(pageNumber, id);
//         setHasMore(data.result.length > 0);
//         console.log(data);
//         dispatch({type: 'POSTS', payload: data});
//     } catch (err) {
//         dispatch({type:'ERRORS', payload: err});
//         if(err.response?.status === 401){
//             dispatch({type: 'LOGOUT'});
//             history.push('/login');
//         }
//     }
// }

export const createPost = ( postData, setModalOpen ) => async (dispatch) => {
    try {
        dispatch({type: 'NEWPOST_LOADING'});
        const {data}= await api.createPost(postData);
        dispatch({type:'NEW_POST',payload: data});
        setModalOpen(false);
        
    } catch (err) {
        console.log('error sa created post',err);
        dispatch({type:'ERRORS', payload: err});
    }
}

export const deletePost = (id) => async (dispatch) => {
    try{
        dispatch({type: 'DELETE_LOADING'});
        await api.deletePost(id);
        dispatch({type:'DELETE_POST', payload: id});
    }catch(err) {
        console.log(err);
        dispatch({type:'ERRORS', payload: err});
    }
}

export const updatePost = (id,updateData,modalHandler) => async (dispatch) => {
    try {
        dispatch({type: 'UPDATEPOST_LOADING'});
        const {data} = await api.updatePost(id,updateData);
        dispatch({type: 'UPDATED_POST', payload: data});
        modalHandler();
   
    } catch (err) {
        dispatch({type:'ERRORS', payload: err});
    }
}


export const likePost = (id) => async(dispatch) => {
    try{
        const {data} = await api.likePost(id);
        dispatch({type: 'LIKE_POST', payload: data});
    
    } catch(err) {
        dispatch({type: 'ERRORS', payload: err})
    }
}


// export const fetchCommentPost = (id) => async(dispatch) => {
//     try{
//         dispatch({type:'COMMENT_LOADING'});
//         const {data} = await api.fetchCommentPost(id);
//         dispatch({type: 'COMMENT', payload: data});
//     } catch(err){
//         dispatch({type: 'ERRORS', payload: err});
//     }
// }

export const createCommentPost = (id, commentData) => async(dispatch) => {
    try{
        dispatch({type: 'CREATE_COMMENT_LOADING'});
        const {data} = await api.createCommentPost(id,commentData);
        dispatch({type:'NEW_COMMENT', payload: data});
    
    }catch(err){
        dispatch({type: 'ERRORS', payload: err});
    }
}

export const updateCommentPost = (id, commentData, modalHandler) => async(dispatch) => {
    try{
        dispatch({type:'UPDATE_COMMENT_LOADING'});
        const {data} = await api.updateCommentPost(id, commentData);
        dispatch({type:'UPDATE_COMMENT', payload: data});
        modalHandler();
    }catch(err){
        dispatch({type:'ERRORS', payload: err});
    }
}

export const deleteCommentPost = (postID, commentID, setModal) => async(dispatch) => {
    try{
        dispatch({type:'DELETE_COMMENT_LOADING'});
        const {data} = await api.deleteCommentpost(postID, commentID);
        dispatch({type:'DELETE_COMMENT', payload: {postID: postID, commentID: commentID}});
        console.log(data.msg);
        setModal(false);
    }catch(err){
        dispatch({type:'ERRORS', payload: err});
    }
}