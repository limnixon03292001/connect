import React,{ useState, useEffect } from 'react';
import axios from "axios";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import defaultImage from '../../svg/defaultImage.jpg';
import Loupe from '../../svg/loupe.svg';
import loadingCat from '../../svg/loadingCat.svg';
import { useSmallModalCloser } from '../.././customHooks/hooks'

const Search = () => {

    const user = useSelector(state => state.users);
    const [data, setData]= useState("");
    const history = useHistory();
    const dispatch = useDispatch();

    const {smallRef, smallModal, setSmallModal} = useSmallModalCloser(false);

    useEffect(() => {
        dispatch({type: 'CLEAR_SEARCH_USER'});
    },[data,dispatch]);

    useEffect(() => {
         // this cancelToken is for cancelling an API request everytime the component unmount
         if(data.trim() === ""){
             return
         }
         const CancelToken = axios.CancelToken;
         let cancel;
        setSmallModal(true)
        dispatch({type: 'SEARCH_LOADING'});
        axios.get(`/users/search?q=${data}`, { cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
          }) }).then(({data})=>{
            dispatch({type: 'SEARCH_USER', payload: data});
        }).catch((error) => {
            if (axios.isCancel(error)) {
                console.log('Request Canceled sa search'); 
            }
            else{
                dispatch({type:'ERRORS', payload: error});
                if(error.response?.status === 401){
                    dispatch({type: 'LOGOUT'});
                    history.push('/login');
                }
            }
        });

        return () => cancel();
    },[data,dispatch,history,setSmallModal])


    return (
        <div className="relative"> 
            <form className="relative">
              
                    <input type="text" placeholder="Search user..." className="md:h-14 p-3 w-full bg-primary rounded pl-11 outline-none focus:border-blue-500"  
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        required
                    />
                    <Link to={`/search?user=${data}`}>
                        <button className="absolute left-0 top-0 bottom-0 flex items-center p-3">
                            <img src={Loupe} alt="search" className="w-6 h-5" />
                        </button>
                    </Link>
            </form>
            {smallModal &&
            <div className="bg-primary max-h-64 overflow-y-auto overflow-x-hidden absolute mt-1 shadow-md z-30 w-full rounded-md space-y-1" ref={smallRef}>
                {/* <div> */}
                {user.searchLoading ?
                    <div className="flex items-center space-x-3 p-3">
                        <img src={loadingCat} alt="loading..." className="h-10 w-10 object-cover"/>
                        <p>Looking for {data}</p>
                    </div> : 
                    user.searchUser.map((user) => (
                        <div key={user._id} className="w-full h-20 z-10 relative overflow-hidden shadow">
                        <Link to={`/profile/${user._id}`}>
                            {user?.coverPhoto &&  <img src={user.coverPhoto} alt="" className="object-cover object-center w-full h-full opacity-40"/>}
                        
                            <div className="flex gap-4 items-center space-y-3  absolute inset-0 overflow-hidden">
                                <div className="w-20 h-full rounded-tl-md rounded-bl-md">
                                    {user?.imageUrl ? <img src={user?.imageUrl} alt="" className="w-full h-full object-cover object-center" /> : <img src={defaultImage} alt="" className="w-full h-full object-cover object-center" />}
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h1 className="text-sm font-semibold text-white">{user?.firstname} {user?.lastname}</h1>
                                    <p className="text-xs text-gray-200">{user?.email}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    ))
                    }
                {/* </div> */}
            </div>
             }
        </div>
    )
}

export default Search
