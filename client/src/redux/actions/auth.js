import * as api from '../../api/auth';

export const signUp = (data, setisSignup, clear) =>  async (dispatch) => {
    try{
        dispatch({type:'LOADING'});
        await api.signUp(data);
        dispatch({type:'LOADING_DONE'});
        setisSignup(prev => !prev);
        clear();
    }catch(err){
        console.log(err);
        const errors = err.response?.data.errors;
        dispatch({type:'ERROR', payload: errors});
    }
}

export const signIn = (data,history) => async (dispatch) => {
    try{
       dispatch({type:'LOADING'});
       const result = await api.signIn(data);
       dispatch({type:'LOGIN',payload: result});
        history.push('/');
    }catch(err){
        console.log(err);
        const errors = err.response?.data.errors;
        dispatch({type:'ERROR', payload: errors});
    }
}

// export const getUser = () => async (dispatch) => {
//     try{
//         dispatch({type:'LOADING'});
//         const {data} = await api.getUser();
//         dispatch({type:'INSERT_USER',payload: data.result});

//     }catch(err){
//         console.log('err', err);
//         dispatch({type:'ERROR', payload: err});
//     }
// }


export const autoLogout = (history) => async(dispatch) => {
    dispatch({type: 'LOGOUT'});
    history.push('/login');
}

 