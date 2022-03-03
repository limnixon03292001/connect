import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';

import home from '../.././svg/home.svg';
import logout from '../.././svg/logout.svg';
import defaultImage from '../.././svg/defaultImage.jpg';

const MobileNav = () => {
    const authUser = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();

    const Logout = () => {
        dispatch({type: 'LOGOUT'});
        history.push('/login');
    }

    return (
        <div className="fixed z-20 lg:hidden bottom-0 right-0 left-0 bg-primary rounded-t-md shadow-md p-1">
            <div className="text-white flex justify-evenly items-center gap-3">
                <Link to="/" className="hover:bg-white hover:bg-opacity-10 active:bg-white active:bg-opacity-25 rounded-full p-2 transition ease-in duration-75">
                    <img src={home} alt="Home" className="h-5 w-5 m-auto"  />
                </Link>
                <Link to={`/profile/${authUser.authData?._id}`}>
                    {authUser.authData?.imageUrl ?  <img src={authUser.authData?.imageUrl} alt="" className="bg-purple-400 h-12 w-12 rounded-full object-cover object-center border-2 border-borderProfile cursor-pointer" /> : <img src={defaultImage} alt="" className="bg-purple-400 h-12 w-12 rounded-full object-cover object-center border-2 border-borderProfile cursor-pointer" />}
                </Link>
                <button className="hover:bg-white hover:bg-opacity-10 active:bg-white active:bg-opacity-25 rounded-full  p-2 transition ease-in duration-75" onClick={Logout}>
                    <img src={logout} alt="Logout" className="h-5 w-5 m-auto"  />
                </button>
            </div>
        </div>
    )
}

export default MobileNav
