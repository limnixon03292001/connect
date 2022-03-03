import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import cancelIcon from '../../../svg/cancel2.svg';
import loadingCat from '../../../svg/loadingCat.svg';

import { updateCommentPost } from '../../../redux/actions/post';

const Edit = ({setEditModal, setModal, userComment, postID}) => {

    const [updateComment , setUpdateComment] = useState({commentID: userComment._id, data: userComment?.commentData});
    const dispatch = useDispatch();
    const updateCommentLoading = useSelector(state => state.posts.updateCommentLoading);

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateCommentPost(postID, updateComment, modalHandler));
    }
    const modalHandler = () => {
        setEditModal(false);
        setModal(false);
    }
    return (
        <div className="fixed inset-y-0 inset-x-0 z-50 w-full h-full flex justify-center items-center bg-black bg-opacity-25 overflow-auto">
            <div className="bg-primary rounded-md w-full md:w-2/4 max-w-screen-md m-3 border border-borderColor shadow-md">
                <div className="flex gap-2 items-center justify-between py-2 px-1 md:py-4 md:px-2 border-b border-borderColor">
                    <div className="flex gap-2 pl-2">
                        <h1 className="text-xl">Edit Comment</h1>
                    </div>
                    <div>    
                        <button className="hover:bg-white hover:bg-opacity-10 active:bg-white active:bg-opacity-25 rounded-full p-2 transition ease-in duration-75" onClick={modalHandler} ><img src={cancelIcon} alt="" className="h-4 w-4" /></button> 
                    </div>
                </div>

                {/* Edit starts */}
                {updateCommentLoading ?  
                    <div className="w-full h-full flex flex-col gap-2 items-center justify-center p-3">
                        <img src={loadingCat} alt="loading..." className="h-14 w-14 m-auto" />
                        <p>Updating comment... Meow!</p>
                    </div> 
                    : 
                    <div>
                        <form onSubmit={(e) => handleUpdate(e)}>
                            <textarea placeholder="Create Post..." cols="30" rows="3" className="w-full h-52 bg-primary p-3 focus:outline-none inset-0 m-0 rounded-t-md resize-none relative align-top overflow-auto" name="description" defaultValue={userComment.commentData} onChange={(e) => setUpdateComment({...updateComment, data: e.target.value})} required></textarea> 
                            <div className="p-2">
                                <button className="bg-button2 hover:bg-purple-400 active:bg-purple-500 rounded-md p-1 py-2 p transition ease-in duration-75 cursor-pointer w-full text-sm md:text-lg" onClick={handleUpdate}> Update Comment</button> 
                            </div>
                        </form>
                    </div>
                    }
            </div>
        </div>
    )
}

export default Edit
 