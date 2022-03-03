import React, {useEffect} from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom';

import MobileNav from '../layout/MobileNav';

import decode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

const PrivateRoute = ({component: Component,...rest}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const page = useSelector(state => state.users.page)
    const pageFollowers = useSelector(state => state.users.pageFollowers);

    //For fetching authenticated user
    useEffect(() => {
        const CancelToken = axios.CancelToken;
        let cancel;

        dispatch({type:'LOADING'});

        axios.get(`/login/user`,{cancelToken: new CancelToken(function executor(c){
            cancel = c;
        })}).then(({data})=>{
            dispatch({type:'INSERT_USER',payload: data.result});
        }).catch((error)=>{
            if(axios.isCancel(error)) console.log("Request Canceled, fetching autheticated user");
            dispatch({type:'ERROR', payload: error});
        })

        return () =>{
            cancel();
            dispatch({type: 'SETPAGE_DEFAULT'});
            dispatch({type: 'SETPAGEFOLLOWERS_DEFAULT'});
            dispatch({type: 'CLEAR_USERS'});
        } 
    },[dispatch]);

    //For fetching all users
    useEffect(() => {
        // Cancelling axios request
        const CancelToken = axios.CancelToken;
        let cancel;
        dispatch({type:'USERS_LOADING'});
        axios.get(`/users/all?page=${page}`, {cancelToken: new CancelToken(function executor(c){
            cancel = c;
        })}).then(({data}) => {
            dispatch({type: 'USERS', payload: data});
        }).catch((error) => {
            if(axios.isCancel(error)) console.log('Request Canceled users');
            if(error.response?.status === 401){
                dispatch({type: 'LOGOUT'});
                history.push('/login');
            }
        });
        
        return () => cancel();
      
      },[dispatch,history,page]);

      //for fetching current users followers
      useEffect(() => {

        const CancelToken = axios.CancelToken;
        let cancel;
        dispatch({type: 'USER_FOLLOWERS_LOADING'});
        axios.get(`/users/followers?page=${pageFollowers}`,{cancelToken: new CancelToken(function executor(c){
            cancel = c;
        })}).then(({data})=> {
            dispatch({type:'USERS_FOLLOWERS', payload: data});
        }).catch((error)=>{
            if(axios.isCancel(error)) console.log("Reques Canceled, fetching user's follower");
            dispatch({type:'USERS_ERROR', payload: error.message});
        });

        return ()=> cancel(); 
    }, [dispatch, pageFollowers]);

  
    const checkToken = () => {
        const token = localStorage.token;
        if(token){
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()){
            
               localStorage.removeItem('token');
              return false;
            }else{
                return true
            }
        }
    }
  
    return (
        <>
            <Route 
                {...rest}
                render={props =>{

                            if(!checkToken()){
                                return <Redirect to="/login" />
                            }
                            else{
                                return <Component {...props} />
                            }  
                        } 
                    }  
            />
             <MobileNav />
        </>
        
    )
}

export default PrivateRoute
