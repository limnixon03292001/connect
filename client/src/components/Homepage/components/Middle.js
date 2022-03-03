import React, { useState, useEffect, useRef ,useCallback } from 'react'
import { useSelector } from 'react-redux';
import {useHistory, Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {createPost} from '../../../redux/actions/post';

import Post from './Post/Post';

import defaultImage from '../../../svg/defaultImage.jpg';

import CreatePost from '../../layout/CreatePost';
import PostLoading from '../../layout/Skeleton Loading/Post';
import Search from '../../layout/Search';
import MobileProfile from '../../layout/Skeleton Loading/MobileProfile';

import axios from 'axios';

const initialState = { description: '', postImg: ''};
const Middle = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [postData,setpostData] = useState(initialState);
    const [pageNumber, setPageNumber] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const authUser = useSelector(state => state.auth);
    const [blob, setBlob] = useState('');

    let post = useSelector(state => state.posts);
    const history = useHistory();
    const dispatch = useDispatch();
    const formx = useRef();

    const clear = () => {
        setpostData({description: '', postImg:''});
    }

    const handleBlob = (e) => {
        if(e.target.files[0].type !== "image/jpg" && e.target.files[0].type !== "image/jpeg" && e.target.files[0].type !== "image/png" ) {
            formx.current.reset();
            setBlob(null);
            return alert('File type not supported!');
         }
        setBlob(URL.createObjectURL(e.target.files[0]));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const myForm = e.target;
        const formData = new FormData(myForm);

        if(postData.description.trim() === '' && blob === '' ){
            alert('Posting without a content is not allowed!');
        }else{
            dispatch(createPost(formData, setModalOpen));
        }
     
        clear();
    }; 
  

    //turn the post state to an empty array every first render 
    useEffect(() => {
        dispatch({type: 'RESET_POSTS'});
    },[dispatch]);

    useEffect(()=> {
         
        // dispatch(fetchPostsLimit(history, pageNumber, setHasMore, CancelToken, cancel));

         // this cancelToken is for cancelling an API request everytime the components unmount
         const CancelToken = axios.CancelToken;
         let cancel;

        dispatch({type:'POSTS_LOADING'});
        axios.get(`/post/post?page=${pageNumber}`, { cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
          }) }).then(({data})=>{
            setHasMore(data.result.length > 0);
            dispatch({type: 'POSTS', payload: data});
        }).catch((error) => {
            if (axios.isCancel(error)) {
                console.log('Request Canceled sa post!'); 
            }
            else{
                dispatch({type:'ERRORS', payload: error});
                if(error.response?.status === 401){
                    dispatch({type: 'LOGOUT'});
                    history.push('/login');
                }
            }
        });

        return () => cancel();
    },[dispatch,history,pageNumber]);


    const observer = useRef();
   
    const lastBookElementRef = useCallback((node) => {
        if(post.loading) return 
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore){
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        }, {rootMargin: "-150px"})
        if(node) observer.current.observe(node);
    },[post.loading, hasMore])
    
    return (
        <div className="lg:col-span-9 xl:col-span-6 col-span-full space-y-3 mb-16 md:mb-0">
            <Search />
            
        <div className="space-y-4 md:space-y-5">
            <div className="p-2 md:hidden">
                {authUser?.loading ? <MobileProfile /> :
                 <Link to={`/profile/${authUser.authData?._id}`} className="flex items-center justify-center gap-3">
                    {authUser.authData?.imageUrl ?  <img src={authUser.authData?.imageUrl} alt="" className="h-12 w-12 rounded-md object-cover bg-pruple-400"/> : <img src={defaultImage} alt="" className="h-12 w-12 rounded-md object-cover bg-pruple-400"/>}
                    <div className="flex flex-col justify-center">
                    <h1 className="text-md font-semibold">{authUser.authData?.firstname} {authUser.authData?.lastname}</h1>
                        <p className="text-xs text-gray-200">{authUser.authData?.email}</p>
                    </div>
                </Link>
                }
            </div> 
            
            <CreatePost handleSubmit={handleSubmit} postData={postData} setpostData={setpostData} post={post} modalOpen={modalOpen} setModalOpen={setModalOpen} handleBlob={handleBlob} setBlob={setBlob} blob={blob} formx={formx}/>
    
            {/* posts  */}
    
                {post?.posts.length === 0 ?  <PostLoading /> :
                    <div className="space-y-5">
                    {post.posts.map((postx, index) => {
                        
                        if(post?.posts.length === index + 1){
                         
                            return ( <div key={postx._id} ref={lastBookElementRef}>
                                        <Post post={postx} />
                                    </div> )

                        } else if(postx === 0){
                            return null
                        }
                            else{
                            return ( <div key={postx._id}>
                                        <Post post={postx} />
                                     </div>)
                        }
                       
                        })
                    }    
                    {!hasMore && <p className="text-center text-sm">There are no more posts to show right now.</p>}
                    {post.loading && <PostLoading/>}
                    </div>
            }
            
        </div>



        </div>
    )
}

export default Middle;
