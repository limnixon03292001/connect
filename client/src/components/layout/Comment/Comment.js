import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

import defaultImage from '../../../svg/defaultImage.jpg';
import MoreIcon from '../../../svg/ellipsis.svg';
import EditDelete from './EditDelete';

const Comment = ({userComment, postID}) => {

    const [modal, setModal] = useState(false);
    const user = useSelector(state => state.auth);

    // clean up!
    useEffect(() => {
        return () => userComment
    },[userComment])

    return (
        <div className="flex gap-2 text-white w-full">
            <div className="flex-shrink-0 w-11 min-w-max">
                {userComment.user?.imageUrl ?  <img src={userComment.user?.imageUrl} alt="" className="h-11 w-11 rounded-full object-cover bg-purple-400"/> : <img src={defaultImage} alt="" className="h-11 w-11 rounded-full object-cover bg-purple-400"/>  }
               
            </div>
            <div className="relative flex-initial w-max h-auto bg-secondary bg-opacity-30 shadow rounded-lg p-3">
                <div className="flex gap-2 items-center ">
                    <Link to={`/profile/${userComment.user._id}`}className="text-md font-semibold">{userComment.user?.firstname} {userComment.user?.lastname}</Link>
                    <span className="text-xs text-gray-200"> - {moment(userComment.commentDate).fromNow()}</span>

                    {user.authData?._id === userComment.user._id &&   
                    <div className="absolute -top-2 -right-3">
                        <div className="relative">
                            <button className="hover:bg-white active:bg-gray-500 hover:bg-opacity-10 transition ease-in duration-75 bg-secondary bg-opacity-30 shadow rounded-full p-1" onClick={() => setModal(prev => !prev)}>
                                <img src={MoreIcon} alt="..." className="h-4 w-4 m-auto" />
                            </button>
                            {modal && <EditDelete setModal={setModal} userComment={userComment} postID={postID}/>}
                        </div>
                    </div>
                    }
                </div>
               <div className="text-sm font-normal">
                   <p className="break-words">{userComment?.commentData}</p>
                </div> 
            </div> 
        </div>
    )
}

export default Comment
   