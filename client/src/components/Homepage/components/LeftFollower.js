import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import UsersLoading from '../../layout/Skeleton Loading/Users';

import loadingCat from '../../../svg/loadingCat.svg';
import defaultImage from '../../../svg/defaultImage.jpg';
 

const Right = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
  
    const addPage = () => {
        dispatch({type:'PAGE_FOLLOWERS'});
    }

   
    return (
        <div className="md:col-span-3 hidden md:block ">
            
                <div className="space-y-5">
                  
                    <div className="border-t py-3 border-button2 border-opacity-30 rounded-xl w-full m-0 flex flex-col justify-center space-y-3 "> 

                        {/* Load Followers */}
                        <p className=" text-md font-bold text-center">Your Followers</p>
                        {users?.currentUserFollowers.length === 0 && users?.userFollowerLoading ?  
                            <>
                                <UsersLoading />
                            </>
                         :
                            users.currentUserFollowers.length === 0 ? 
                                <p className=" text-md font-light text-center">No followers yet.</p> 
                            :
                                <>
                                    <div className="max-h-96 overflow-y-auto w-full space-y-2">
                                        {users?.currentUserFollowers.map(user => (
                                            <div className="relative overflow-hidden h-16 w-full rounded-md shadow-md " key={user?._id}>
                                                <Link to={`/profile/${user.user?._id}`}>
                                                    {user.user?.coverPhoto &&  <img src={user.user?.coverPhoto} alt="" className="object-cover object-center w-full h-full opacity-30"/>}

                                                    <div className="flex space-x-3 items-center absolute inset-0 overflow-hidden">
                                                        <div className="flex-shrink-0 ml-3">
                                                            {user.user?.imageUrl ? <img src={user.user?.imageUrl} alt='User Profile' className="rounded-full w-11 h-11 object-cover m-auto"/> : <img src={defaultImage} alt='User Profile' className="rounded-full w-11 h-11 object-cover m-auto"/>}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h1 className="text-sm font-medium leading-tight">{user.user?.firstname} {user.user?.lastname} </h1>
                                                            <p className="text-xs text-gray-300 mt-0 break-normal ">{user.user?.email}</p>
                                                        </div>
                                                    </div>   
                                                </Link>   
                                            </div>          
                                        ))}
                                        {users?.userFollowerLoading ? 
                                            <div className="flex items-center justify-center w-full">
                                            <img src={loadingCat} alt="loading..." className="h-10 w-10"/>
                                        </div> :
                                            <button className="py-2 underline text-center text-pink-100 font-medium m-auto w-full rounded-md" onClick={addPage}>See more followers.</button>
                                        }
                                    </div>
                                    </>
                            }
                        </div>
                    </div>
        </div>
    )
}

export default Right
