import React,{useEffect} from 'react';
import { useLocation, Link, useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
// import { searchUser } from '../../../redux/actions/users';

import Search from '../../layout/Search';
import loadingCat from '../../../svg/loadingCat.svg';
import defaultImage from '../../../svg/defaultImage.jpg';

import axios from 'axios';

const MiddleSearch = () => {
    const {search} = useLocation();
    const query = new URLSearchParams(search);
    const searchData = query.get('user');
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.users);

    useEffect(()=>{

        // dispatch(searchUser(searchData));

        const CancelToken = axios.CancelToken;
        let cancel;
        dispatch({type: 'SEARCH_LOADING'});
        axios.get(`/users/search?q=${searchData}`, { cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
        })}).then(({data})=>{
            dispatch({type: 'SEARCH_USER', payload: data});
        }).catch((error) => {
            if (axios.isCancel(error)) {
                console.log('Request Canceled sa search2'); 
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
    },[dispatch,searchData,history]);

    return (
        <div className="lg:col-span-9 xl:col-span-6 col-span-full space-y-5 mb-16 md:mb-0">
            <Search />
        {user.searchLoading ?
        <div className="flex flex-col items-center space-y-3">
            <img src={loadingCat} alt="loading..." className="h-18 w-18 object-cover"/>
            <p>Looking for {searchData}</p>
        </div> : 
        <div className="space-y-3">
            <p className="text-2xl text-gray-200 mb-2">Search: {searchData}</p>
            {/* checking the array if theres a data  */}
           { user.searchUser.length === 0 ? <p>User doesn't exist.</p> :
           <div className="space-y-3">
            {user.searchUser.map((user) => (
                <div key={user._id} className="w-full h-20 z-10 relative overflow-hidden rounded-md shadow">
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
            ))}
            </div>}
        </div>
        }
        </div>
    )
}

export default MiddleSearch
