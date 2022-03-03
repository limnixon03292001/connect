import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import { deleteCommentPost } from '../../../redux/actions/post';

import editIcon from '../../../svg/edit.svg';
import deleteIcon from '../../../svg/delete.svg';
import cancelIcon from '../../../svg/cancel2.svg';
import loadingCat from '../../../svg/loadingCat.svg';

import Edit from './Edit';


const EditDelete = ({setModal, userComment, postID}) => {
    const [editModal, setEditModal] = useState(false);
    const deleteCommentLoading = useSelector(state => state.posts.deleteCommentLoading);
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteCommentPost(postID, userComment._id, setModal));
    }

    return (
        <div className="flex items-center justify-center gap-1 absolute top-7 right-0 bg-secondary border border-borderColor shadow rounded-full w-max overflow-hidden p-1 z-20">
            {deleteCommentLoading ? 
                <div className="flex items-center justify-center px-1 gap-2 text-sm">
                    <img src={loadingCat} alt="loading..." className="h-8 w-8 m-auto" />
                    <p>Removing comment...</p>
                </div> 
                : 
                <>
                    <div className="h-8 w-8 p-2 cursor-pointer hover:bg-white active:bg-gray-500 hover:bg-opacity-10 transition ease-in duration-75 rounded-full" onClick={() => setEditModal(prev => !prev)}>
                    <img src={editIcon} alt="Edit" className="w-full h-full" />
                    </div>
                    <div className="h-8 w-8 p-2 cursor-pointer hover:bg-white active:bg-gray-500 hover:bg-opacity-10 transition ease-in duration-75 rounded-full" onClick={handleDelete}>
                        <img src={deleteIcon} alt="Delete" className="w-full h-full" />
                    </div>
                    <div className="h-7 w-7 p-2 cursor-pointer hover:bg-white active:bg-gray-500 hover:bg-opacity-10 transition ease-in duration-75 rounded-full">
                        <img src={cancelIcon} alt="X" className="w-full h-full" onClick={() => setModal(prev => !prev)} />
                    </div>
                </>
                }
              

                {editModal && <Edit setEditModal={setEditModal} setModal={setModal} userComment={userComment} postID={postID}/>}
        </div>
    )
}

export default EditDelete
