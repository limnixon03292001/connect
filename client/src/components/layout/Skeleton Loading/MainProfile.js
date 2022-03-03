import React from 'react'

const MainProfile = () => {
    return (
        <div className="w-full bg-primary animate-pulse rounded-md">
            <div className="h-48 w-full bg-purple-400 rounded-t"></div>
            <div className="flex flex-col justify-center items-center gap-3 px-4 bg-primary rounded-b-md pt-2 p-6 z-10 sm:flex-row sm:justify-start">
                <div className="-mt-20 ">
                    <div className="bg-purple-400 border-4 border-borderColor w-28 h-28 rounded-full"></div>
                </div>
                <div className="space-y-3">
                    <div className="bg-purple-400 h-5 w-48 rounded"></div>
                    <div className="bg-purple-400 h-4 w-36 rounded m-auto sm:m-0"></div>
                </div>
            </div>
        </div>


    )
}

export default MainProfile
