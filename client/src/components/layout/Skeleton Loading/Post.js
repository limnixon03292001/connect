import React from 'react'

const Post = () => {
    return (
        <>
            <div className="bg-primary shadow rounded-md p-4 w-full mx-auto">
                <div className="animate-pulse flex flex-col space-y-5">
                    <div className="flex  space-x-4 items-center">
                        <div className="rounded-full bg-purple-400 bg-opacity-80 h-14 w-14"></div>
                        <div className="flex-1 space-y-3 py-1">
                            <div className="h-4 bg-purple-400 rounded w-28"></div>
                            <div className="h-3 bg-purple-400 rounded w-20"></div>
                        </div>
                    </div>
                    <div>
                        <div className="h-4 bg-purple-400 rounded w-full"></div>
                    </div>
                    <div>
                        <div className="h-48 bg-purple-400 rounded w-full"></div>
                    </div>
                </div>
            </div>

            <div className="bg-primary shadow rounded-md p-4 w-full mx-auto">
                <div className="animate-pulse flex flex-col space-y-5">
                    <div className="flex  space-x-4 items-center">
                        <div className="rounded-full bg-purple-400 bg-opacity-80 h-14 w-14"></div>
                        <div className="flex-1 space-y-3 py-1">
                            <div className="h-4 bg-purple-400 rounded w-28"></div>
                            <div className="h-3 bg-purple-400 rounded w-20"></div>
                        </div>
                    </div>
                    <div>
                        <div className="h-4 bg-purple-400 rounded w-full"></div>
                    </div>
                    <div>
                        <div className="h-48 bg-purple-400 rounded w-full"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post
