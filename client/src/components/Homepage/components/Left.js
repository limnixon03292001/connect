import React from 'react'
import { useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileLoading from '../../layout/Skeleton Loading/Profile';
import logo from './../../../svg/global-network.svg';
import defaultImage from './../../../svg/defaultImage.jpg';

import LeftFollower from '../components/LeftFollower'
const Left = () => {

    const authUser = useSelector(state => state.auth);
    
     return (
        <div className="hidden col-span-3 lg:col-span-3 xl:col-span-3 lg:block"> 
        <div className="space-y-5 sticky top-0 ">
            <Link to="/" >  
                <div className="text-2xl flex gap-2 justify-center items-center h-14 w-full font-light">
                    <img src={logo} alt="" className="h-8 w-8" />
                    <span>CONNECT</span>
                </div>
            </Link>

            {authUser?.loading  ? 
                <ProfileLoading />
            : 
            <div className="px-2 py-3 rounded-md ">
                <Link to={`/profile/${authUser.authData?._id}`}>
                    <div className="flex justify-center space-x-3 ">
                        {authUser.authData?.imageUrl ? <img src={authUser.authData?.imageUrl} alt="" className="h-12 w-12 rounded-full object-cover border-0 bg-purple-400 flex-shrink-0" /> : 
                        <img src={defaultImage} alt="" className="h-12 w-12 rounded-full object-cover border-0 bg-purple-400 flex-shrink-0" />
                        }
                       
                        <div className="flex flex-col justify-center">
                            <h1 className="text-md font-semibold leading-tight">{authUser.authData?.firstname} {authUser.authData?.lastname}</h1>
                            <p className="text-xs text-gray-200">{authUser.authData?.email}</p>
                        </div>
                    </div> 
                </Link>
                </div>
                }

            <LeftFollower />
            </div>
            
        </div>
    )
}

export default Left
