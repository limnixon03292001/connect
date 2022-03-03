import React from 'react'

const Profile = () => {
    return (
        <div className="w-full rounded px-2 py-3">
            <div className="flex gap-2 animate-pulse items-center justify-center">
                <div className="h-14 w-14 bg-purple-400 rounded-full"></div>
                <div className=" space-y-3 ">
                    <div className="bg-purple-400 rounded h-4 w-28"></div>
                    <div className="bg-purple-400 rounded h-3 w-20"></div>
                </div>
            </div> 
        </div>
    )
}

export default Profile
