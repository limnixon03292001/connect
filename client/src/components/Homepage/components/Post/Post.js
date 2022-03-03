import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import moment from 'moment';
import {Link} from 'react-router-dom';

import MoreIcon from '../../../../svg/ellipsis.svg';
import defaultImage from '../../../../svg/defaultImage.jpg';
import Modal from '../../../layout/Modal';
import { deletePost, likePost } from '../../../../redux/actions/post';
import CommentModal from '../../../layout/Comment/CommentModal';
import { useModalCloser, useSmallModalCloser } from '../../../../customHooks/hooks';
const Post = ({ post }) => {

    const dispatch = useDispatch();
    const postState = useSelector(state => state.posts);
    //checking the owners post
    const user = useSelector(state => state.auth);

    const handleDelete = () => {
        dispatch(deletePost(post._id));
    }
    // inserting post.likes to like state
    const [likes,setLikes] = useState(post.likes);
    //check if user already liked the post
    const hasLikedPost = likes?.some((like) => like === user.authData?._id);
    
    //Dispatching like 
    const handleLike = () => {
        dispatch(likePost(post._id));
    
        if(hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== user.authData._id));
        } else {
            setLikes([...post.likes, user.authData._id]);
        }
    }

    const NumberLike = () => {
        if(likes?.length > 0){
            return <span className="text-md text-white">{likes?.length} {likes?.length > 1 ? 'Likes' : 'Like'}</span>
        }
        return  <span></span>
    }

    const NumberComment = () => {
        if(post?.comment?.length > 0){
            return <span>{post?.comment?.length} {post?.comment?.length > 1 ? 'Comments' : 'Comment'}</span>
        }
        return <span>Comment</span>
    }


    const {ref, modalX, setModalX} = useModalCloser(false);
    const {smallRef, smallModal, setSmallModal} = useSmallModalCloser(false);

    return (
  
        <div className="bg-primary rounded-md space-y-3 relative -z-10 overflow-hidden">
               
            <div className="flex gap-3 p-3">
                {post.users?.imageUrl ? <img src={post.users?.imageUrl} alt="" className="w-11 h-11 md:w-12 md:h-12  rounded-full object-cover mx-0 " /> : <img src={defaultImage} alt="" className="w-11 h-11 md:w-12 md:h-12  rounded-full object-cover mx-0 "/>  }
                
                    <div className="leading-none mr-auto self-center space-y-4">
                        <Link to={`/profile/${post.users?._id}`} className="text-md font-semibold block">{post.users?.firstname} {post.users?.lastname}</Link>
                        <span className="text-xs text-gray-300">{moment(post?.postDate).fromNow()}</span>
                    </div>
                    {post.users?._id === user.authData?._id &&
                        <div className="self-end " >
                       
                                <button className="hover:bg-white active:bg-gray-500 hover:bg-opacity-10 transition ease-in duration-75 rounded-full py-1 px-1 absolute top-3 right-5 " onClick={() => {
                                setSmallModal(prev => !prev)}} > 
                                    <img src={MoreIcon} alt="" className=" w-5 h-5  rounded-full" /> 
                                </button>
                         
                                {smallModal && <Modal setSmallModal={setSmallModal} handleDelete={handleDelete} deleteLoading={postState.deleteLoading} post={post} smallRef={smallRef} /> } 
                        </div>
                    }
                
            </div>
            {/* description section */}
            <div className="font-normal px-5 "><pre className=" text-sm md:text-md font-sans break-words whitespace-pre-wrap">{post?.description}</pre></div>
            {/* //fix the height issue */}
           {post?.postImg === '' ? '' :<img src={post?.postImg} alt={post?.postImg} className="w-full object-cover rounded-md" /> } 
            {/* like comment section */}
           <div className="p-3 font-light flex justify-between">
               <div> 
                    <button className="flex gap-2 items-center font-light" onClick={handleLike}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill={hasLikedPost ? 'white' : 'none'}  viewBox="0 0 24 24" stroke={hasLikedPost ? 'gray' : 'white'} >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg> 
                            <NumberLike />
                        </button>
                </div>
               <button className="font-light" onClick={()=> setModalX(prev => !prev)}>
                    <NumberComment /> 
               </button>
               {modalX && <div><CommentModal setModalX={setModalX} postID={post._id}  refx={ref}/> </div>}
           </div>
        </div> 
    )
}

export default Post
