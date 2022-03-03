import * as api from '../../api/users';

// const redirect = (err,history,dispatch) => {
//     if(err.response?.status === 401){
//         dispatch({type:'LOGOUT'});
//         history.push('/login');
//     }
// }

// export const allUser = (history) => async (dispatch) => {
//     try{
//         dispatch({type:'USERS_LOADING'});
//         const {data} = await api.allUser();
//         dispatch({type: 'USERS', payload: data});
//     }catch(err){
//         dispatch({type:'USERS_ERROR', payload: err});
//         redirect(err,history,dispatch);
//     }
// }

// export const getUserProfile  = (id,history) => async (dispatch) => {
//     try {
//         dispatch({type: 'USER_LOADING'});
//         const {data} = await api.getUser(id);
//         dispatch ({type: 'USER', payload: data});
//     } catch (err) {
//         dispatch({type: 'USERS_ERROR', payload: err});
//         redirect(err,history,dispatch);
//     }
// }

// export const searchUser = (name) => async (dispatch) => {
//     try {
//         dispatch({type: 'SEARCH_LOADING'});
//         const {data} = await api.searchUser(name);
//         dispatch({type: 'SEARCH_USER', payload: data});
//     } catch (err) {
//         dispatch({type: 'USERS_ERROR', payload: err});
//     }
// }
//this function is for changename only
export const updateUserProfile = (id, updateData, setModal) => async (dispatch) => {
    try {
        dispatch({type:'UPDATE_LOADING'});
        const {data} = await api.updateUserProfile(id, updateData);
        dispatch({type:'UPDATE_USER', payload: data});
        setModal(false);
        window.location.reload();
    } catch (err) {
        dispatch({type: 'USERS_ERROR',payload: err});
    }
}

export const updateCoverPhoto = (id, updatedata,setModal) => async (dispatch) => {
    try {
        dispatch({type:'UPDATE_LOADING'});
        const {data} = await api.updateCoverPhoto(id,updatedata);
        dispatch({type:'UPDATE_USER', payload: data});
        setModal(false);
        window.location.reload();
    } catch (err) {
        dispatch({type: 'USERS_ERROR',payload: err});
    }
}

export const updateProfilePicture = (id, updatedata,setModal) => async (dispatch) => {
    try {
        dispatch({type:'UPDATE_LOADING'});
        const {data} = await api.updateProfilePicture(id,updatedata);
        dispatch({type:'UPDATE_USER', payload: data});
        setModal(false);
        window.location.reload();
    } catch (err) {
        const errors = err.response?.data.errors;
        dispatch({type: 'USERS_ERROR',payload: errors});
    }
}

export const followUser = (id) => async (dispatch) => {
    try {
        dispatch({type:'USER_FOLLOWING_LOADING'});
        const {data} = await api.followUser(id);
        dispatch({type: 'FOLLOW_USER', payload: data});
    } catch (err) {
        dispatch({type: 'USERS_ERROR',payload: err});
    }
}