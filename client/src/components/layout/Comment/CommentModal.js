import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { createCommentPost } from '../../../redux/actions/post';
// fetchCommentPost

import loadingCat from '../../../svg/loadingCat.svg';
import CancelIcon from '../../../svg/cancel2.svg';
import rightArrow from '../../../svg/right-arrow.svg';
import Comment from './Comment';

import axios from 'axios';

const initialState = {data: ""};
const CommentModal = ({setModalX, postID, refx}) => {

    const post = useSelector(state => state.posts.posts.find(posts => posts._id === postID));
    // console.log(post);
    const commentLoading = useSelector(state => state.posts.createCommentLoading);
    const loading = useSelector(state => state.posts);
    const [commentData, setCommentData] = useState(initialState);
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(fetchCommentPost(postID));
        console.log("Nagfefetch yung comment!");

        const CancelToken = axios.CancelToken;
        let cancel;

        dispatch({type:'COMMENT_LOADING'});
        axios.get(`/post/comment/${postID}`,{cancelToken: new CancelToken(function executor(c){
            cancel = c;
        })}).then(({data}) => {
            dispatch({type: 'COMMENT', payload: data});
        }).catch((error) => {
            if(axios.isCancel(error)) console.log('Request Canceled, fetching comments');
            dispatch({type: 'ERRORS', payload: error});
        });

        return () => cancel();
    },[dispatch, postID]);

    const handleChange = (e) => {
        setCommentData({data: e.target.value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(commentData.data.trim() === ''){
            return alert('Input some content!');
        }
        dispatch(createCommentPost(postID, commentData));
        setCommentData({data: ""});
    }
    return (
        <div className="fixed inset-y-0 inset-x-0 z-40 w-full h-full flex justify-center items-center bg-black bg-opacity-25 overflow-auto" id="modal">
            <div className="bg-primary rounded-md w-full md:w-2/4 max-w-screen-md m-3 border border-borderColor shadow-md" id="inner" ref={refx}>
                <div className="flex gap-2 items-center justify-between py-2 px-1 md:py-4 md:px-2 border-b border-borderColor">
                    <div className="flex gap-2 pl-2">
                        <h1 className="text-xl">Comments</h1>
                    </div>
                    <div>    
                        <button className="hover:bg-white hover:bg-opacity-10 active:bg-white active:bg-opacity-25 rounded-full  p-2 transition ease-in duration-75" onClick={()=> setModalX(prev => !prev)}><img src={CancelIcon} alt="" className="h-4 w-4" /></button> 
                    </div>
                </div>

                {/* COMMENT */}
                <div className="overflow-auto h-72 p-3">
                    {loading.commentLoading ? 
                        <div className="flex justify-center items-center w-full h-full">
                            <div className="space-y-3">
                                <img src={loadingCat} alt="" className="h-14 w-14 m-auto "/>
                                <p>Collecting comments...</p>
                            </div>
                        </div>
                        : 
                        post?.comment.length === 0 ? 
                            <div className="flex justify-center items-center w-full h-full">
                                <div className="space-y-3">
                                    <p>No Comments found</p>
                                </div>
                            </div> 
                            :
                            <div className="space-y-4">
                                {post.comment.map(commentData => (
                                    <div key={commentData._id}>
                                        <Comment userComment={commentData} postID={postID}/>
                                    </div>
                                ))}
                            </div>    
                    }
                </div>

                <div className="p-2 w-full">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="relative">
                            <input type="text" className="bg-secondary p-2 px-3 pr-10 h-auto w-full rounded-full outline-none resize-none breaks-words" placeholder="Write something..." name="commentData" value={commentData.data} onChange={(e) => handleChange(e)}/>
                            {commentLoading ? 
                            <div className="flex justify-center items-center rounded-full absolute right-2 top-0 bottom-0">
                                <img src={loadingCat} alt="loading..." className="h-6 w-6" />
                            </div>
                            :
                                <button className="flex justify-center items-center rounded-full absolute right-2 top-0 bottom-0"> 
                                    <img src={rightArrow} alt="->" className="h-6 w-6" />
                                </button>
                            }
                        
                        </div>
                    </form>
                </div>
               
            </div>
        </div>
    )
}

export default CommentModal
