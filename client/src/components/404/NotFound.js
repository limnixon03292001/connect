import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../../svg/global-network.svg';

const NotFound = () => {
    return (
        <>
        <div className="fixed flex items-center gap-2 right-0 bottom-0 text-white w-auto m-3">
            <img src={logo} alt="" className="h-9 w-9"/>
            <h1 className="font-light text-lg">CONNECT</h1>
        </div>
            <div className="flex gap-2 items-center justify-center text-white h-screen w-full">
                <h1 className="text-center font-bold text-lg ">
                    Oops! Page not found... 
                </h1>
                <Link to="/" className="text-blue-400 underline cursor-pointer">Go back.</Link>
            </div>
        </>
    )
}

export default NotFound
