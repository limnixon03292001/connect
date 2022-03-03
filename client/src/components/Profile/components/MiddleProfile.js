import React,{useState, useEffect, useRef, useCallback} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router';

import UserPost from './UserPost';

import { followUser } from '../../../redux/actions/users';
// getUserProfile
// import { fetchUserPostsLimit } from '../../../redux/actions/post';

import loadingCat from '../../../svg/loadingCat.svg';
import follow from '../../../svg/follow.svg';
import following from '../../../svg/following.svg';
import edit from '../../../svg/edit.svg';
import defaultImage from '../../../svg/defaultImage.jpg';

import MainProfileLoading from '../../layout/Skeleton Loading/MainProfile';
import PostLoading from '../../layout/Skeleton Loading/Post';
import Search from '../../layout/Search';
import EditUserProfile from '../../layout/EditUserProfile';
import ProfilePictureModal from '../../layout/ProfilePictureModal';
import CoverPhotoModal from '../../layout/CoverPhotoModal';

import axios from 'axios';


const MiddleProfile = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const history = useHistory();
    const [modal,setModal] = useState(false);
    const [coverPhotoModal, setcoverPhotoModal] = useState(false);
    const [profilePictureModal, setprofilePictureModal] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const user = useSelector(state => state.users);
    const post = useSelector(state => state.posts);
    const authenticatedUserId = useSelector(state => state.auth.authData._id);
    const location = useLocation();
    const observer = useRef();
    const [hasMore, setHasMore] = useState(false);
   //turn the post state to an empty array every render 
   useEffect(() => {
        //since we are making a new request every time we click on a different user we want to set our page number to default value of 1.
        setPageNumber(1);
        dispatch({type: 'RESET_POSTS'});

        // dispatch(getUserProfile(id,history));

        const CancelToken = axios.CancelToken;
        let cancel;
        dispatch({type: 'USER_LOADING'});
        axios.get(`/users/user/${id}`,{cancelToken: new CancelToken(function executor(c){
            cancel = c;
        })}).then(({data}) => {
            dispatch ({type: 'USER', payload: data});
        }).catch((error) => {
            if(axios.isCancel(error)) console.log('Request Canceled! getting User Profile')
            dispatch({type: 'USERS_ERROR', payload: error});
        })
        return () => cancel();
    },[location,dispatch,id, history]);

    useEffect(()=> {
        // dispatch(fetchUserPostsLimit(history,id ,pageNumber, setHasMore));

        // this cancelToken is for cancelling an API request everytime the components unmount
        const CancelToken = axios.CancelToken;
        let cancel;

        dispatch({type:'POSTS_LOADING'});
        axios.get(`/post/user?user=${id}&page=${pageNumber}`, { cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
          }) }).then(({data})=>{
            setHasMore(data.result.length > 0);
            dispatch({type: 'POSTS', payload: data});
        }).catch((error) => {
            if (axios.isCancel(error)) {
                console.log('Request Canceled!'); 
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
    },[dispatch, history, pageNumber,location,id]);

    //intersection observer, request another set of posts when reaching the bottom or last post
   
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



    const handleFollowUser = () => {
        dispatch(followUser(user.user?._id)); 
    }
 
    const followOrfollowing = user.user?.followers?.some(followerx => followerx.user === authenticatedUserId)
    const ButtonFollowOrFollowing = () => {
        if(followOrfollowing){
            return <button className="bg-button2 hover:bg-opacity-100 active:bg-opacity-80 transition  ease-out duration-100 text-sm font-light px-6 py-1 rounded-full flex gap-2 items-center justify-center" onClick={handleFollowUser} >
            {user.userFollowingLoading ? <img src={loadingCat} alt="" className="h-5 w-5 m-auto" /> : 
                <>
                    <div className="flex-shrink-0"><img src={following} alt="" className="h-4 w-4 m-auto" /></div> <span>Following</span>
                </>
            }
            </button>
        
        }else{
            return <button className="bg-button2 hover:bg-opacity-100 active:bg-opacity-80 transition  ease-out duration-100 text-sm font-light px-6 py-1 rounded-full flex gap-2 items-center justify-center" onClick={handleFollowUser}>
                {user.userFollowingLoading ? <img src={loadingCat} alt="" className="h-5 w-5 m-auto" /> : 
                    <>
                        <div className="flex-shrink-0"><img src={follow} alt="" className="h-4 w-4 m-auto" /></div> <span>Follow</span>
                    </>
                }
            </button>
        }

    }
    const FollowersOrFollow = () => {
        if(user.user.followers?.length > 1){
            return <span> {user.user.followers?.length} followers </span>
        }else{
            return <span>{user.user.followers?.length} follower</span>
        }
    }
  
    return (
    <>
        <div className="lg:col-span-9 xl:col-span-6 col-span-full space-y-4 mb-16 md:mb-0">
            <Search />

            {/* USER PROFILE SECTION */}
            {/*  */}
            {user.userLoading ?  <MainProfileLoading /> :   
                <div>
                    {/* cover image section */}
                    <div className="w-full h-56 rounded-t-md overflow-y-contain relative">
                        {/* overlay */}
                        <div className="bg-black bg-opacity-20 absolute inset-0"></div>

                        {/* checks if theres a cover photo */}
                        {user.user?.coverPhoto && <img src={user.user?.coverPhoto} alt="" className="w-full h-full object-cover border-none" /> }  
                        {user.user?._id === authenticatedUserId && 
                            <button className="bg-button2 p-2 absolute rounded-full bottom-0 right-0 m-3 flex items-center justify-center gap-1 bg-opacity-50" onClick={() => setcoverPhotoModal(prev => !prev)}> <img src={edit} alt="edit" className="h-4 w-4" /><p className="text-xs hidden sm:block">Edit Cover photo</p></button> 
                        }
                        
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-center flex-col sm:flex-row sm:justify-between bg-primary rounded-b-md">
                            <div className="flex flex-col justify-center items-center gap-3 px-4 pt-2 pb-1 md:pb-none sm:pb-5 z-10 sm:flex-row sm:justify-start">
                                <div className="-mt-20 flex-shrink-0 relative ">
                                    {user.user?.imageUrl ? <img src={user.user?.imageUrl} alt="" className="rounded-full h-28 w-28 border-4 border-borderProfile object-cover relative bg-purple-400" /> : 
                                    <img src={defaultImage} alt="" className="rounded-full h-28 w-28 border-4 border-borderProfile object-cover relative bg-purple-400" /> 
                                    }
                                    {user.user?._id === authenticatedUserId && 
                                        <button className="flex items-center justify-center p-2 absolute bottom-0 right-2 bg-button2 rounded-full bg-opacity-50" onClick={() => setprofilePictureModal(prev => !prev)}><img src={edit} alt="" className="h-4 w-4"/></button>
                                    }
                                </div>
                                <div className="text-center sm:text-left space-y-1">
                                    <div>
                                        <h1 className="text-lg font-semibold">{user.user?.firstname} {user.user?.lastname}</h1>
                                        <p className="text-sm text-gray-300">{user.user?.email}</p>
                                    </div>
                                    <p className="text-md text-gray-300 font-light"> <FollowersOrFollow/> </p>
                                </div>
                            
                            </div>
                            
                            {user.user?._id === authenticatedUserId ?
                                    null :   
                                    <div className="p-3 flex items-start justify-center">
                                      <ButtonFollowOrFollowing />
                                    </div>
                                }
                            
                        </div>
                        {/* Edit Profile */}
                        {user.user?._id === authenticatedUserId && 
                        <>
                            <button className="bg-primary border-borderColor border w-full flex gap-2 justify-center items-center p-3 rounded-md" onClick={() => setModal(prev => !prev)}>
                                <div>
                                    <img src={edit} alt="edit" className="h-4 w-4 m-auto" />
                                </div>
                                <p className="font-light">Change Name</p>
                            </button>
                        </>
                        }
                    </div>

                </div>
                
            }
            
            {/* END USER PROFILE SECTION */}
        
            {/* USER POST */}
            <div className="space-y-4">
                {  
                post.loading && post?.posts.length === 0 ? <PostLoading/> :
                   <div className="space-y-5">
                   {post.posts.map((postx, index) => {
                       if(post?.posts.length === index + 1){
                           return (  <div key={postx._id} ref={lastBookElementRef}>
                                        <UserPost post={postx} />
                                   </div> 
                               )
                       } else if( postx === 0){
                        return null
                        }
                       else{
                           return ( <div key={postx._id}>
                                        <UserPost post={postx} />
                                    </div>)
                       }
                       })
                   }    
                   {!hasMore && post?.posts.length > 0? <p className="text-center font-light text-sm">There are no more posts to show right now.</p> : post?.posts.length === 0 ? <p className="text-center font-light text-sm">No post found..</p> : null }
                   {post.loading && <PostLoading/>} 
                   </div>
                    
                }
            </div>
            {/* END USER POST */} 
        </div>
        
        {modal && <EditUserProfile setModal={setModal} userInfo={user}/>} 
        {profilePictureModal&& <ProfilePictureModal setModal={setprofilePictureModal} userInfo={user}/>}
        {coverPhotoModal && <CoverPhotoModal  setModal={setcoverPhotoModal} userInfo={user}/>}
    </>
    )
}

export default MiddleProfile
