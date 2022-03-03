import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import logout from './../../../svg/logout.svg';
import defaultImage from './../../../svg/defaultImage.jpg';

import UsersLoading from '../../layout/Skeleton Loading/Users';

import loadingCat from '../../../svg/loadingCat.svg';
// import { allUser } from '../../../redux/actions/users';

const Right = () => {
    const dispatch = useDispatch();
    const history = useHistory(); 
    const users = useSelector(state => state.users);
  
    const Logout = () => {
        dispatch({type: 'LOGOUT'});
        history.push('/login');
    }   

    const addPage = () => {
     
        dispatch({type:'PAGE'});
    }

    return (
        <div className="xl:col-span-3 hidden xl:block ">
            
                <div className="space-y-5 sticky top-0">
                    <div className="h-14 w-full rounded flex justify-start items-center">
                        <button className="transition ease-in duration-75 px-3 py-2 rounded-sm text-sm font-light flex gap-2 items-center justify-center" onClick={Logout}>
                            <img src={logout} alt="" className="h-6 w-6" />
                            <span>Logout</span>
                        </button>
                    </div>
                 
                    
                    <div className="border-t border-button2 border-opacity-30 py-3 rounded-xl w-full m-0 flex flex-col justify-center space-y-3 "> 
                        {/* Load users */}
                        <p className=" text-md font-bold text-center">Connect Users.</p>
                        {users?.users.length === 0?  
                            <>
                                <UsersLoading />
                            </>
                         :
                        <>
                            
                            <div className="max-h-96 overflow-y-auto w-full space-y-2">
                                {users?.users.map(user => (
                                <div key={user?._id}  className="relative overflow-hidden h-16 w-full rounded-md shadow-md" >
                                    <Link to={`/profile/${user._id}`}>
                                        {user?.coverPhoto &&  <img src={user?.coverPhoto} alt="" className="object-cover object-center w-full h-full opacity-30"/>}

                                        <div className="flex items-center absolute inset-0 overflow-hidden space-x-3">

                                            <div className="flex-shrink-0 ml-3">
                                                {user.imageUrl ?  <img src={user.imageUrl} alt="" className="rounded-full w-12 h-12 object-cover "/> : <img src={defaultImage} alt="" className="rounded-full w-12 h-12 object-cover "/>} 
                                            </div>
                                    
                                            <div className="flex-1">
                                                <h1 className="text-sm font-medium leading-tight">{user.firstname} {user.lastname} </h1>
                                                <p className="text-xs text-gray-300 mt-0 break-normal ">{user.email}</p>
                                            </div>
                                        </div>    
                                    </Link>
                                </div>              
                                ))}
                                {users?.loading ? 
                                    <div className="flex items-center justify-center w-full">
                                      <img src={loadingCat} alt="loading..." className="h-10 w-10"/>
                                   </div> :
                                    <button className="text-center text-pink-100 font-medium underline m-auto w-full rounded-md" onClick={addPage}>Load more users.</button>
                                }
                            </div>
                            </>
                            }
                        </div>
                        <div className="fixed m-4 z-40 text-sm text-gray-300 text-center bottom-2 right-0 underline">
                            <a href="https://www.facebook.com/limnixon03292001/" target="_blank" rel="noreferrer">Developed By: Nixon A. Lim</a>
                        </div>
                    </div>
        </div>
    )
}

export default Right
