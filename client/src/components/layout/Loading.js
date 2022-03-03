import React from 'react'
import loadingCat from '../../svg/loadingCat.svg';

const Loading = () => {
    return (
        <div className="fixed inset-y-0 z-20 w-full h-full flex justify-center items-center bg-black transiton-opacity bg-opacity-30">
            <div className="text-center">
                <img src={loadingCat} alt="loadingCat" className="m-auto" />
                <p className="text-white">Checking credentials...</p>
            </div>
        </div>
    )
}

export default Loading
