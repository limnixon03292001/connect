import React from 'react'
import { useSelector } from 'react-redux';

import CreatePostModal from './CreatePostModal';

import defaultImage from '../../svg/defaultImage.jpg';

const CreatePost = ({handleSubmit, postData, setpostData, post, modalOpen, setModalOpen, handleBlob, setBlob, blob, formx}) => {

    const user = useSelector(state => state.auth);

    return (
        <div className="relative h-20 bg-primary flex justify-start items-center rounded-md p-2 px-1 md:px-3 gap-1 overflow-hidden">
                <div className="w-20">
                    {user.loading ? <div className="w-14 h-14 object-cover rounded-full m-auto bg-purple-400 animate-pulse"></div> :
                    user.authData?.imageUrl ? 
                        <img src={user.authData?.imageUrl} alt="" className="w-11 h-11 md:w-12 md:h-12 object-cover rounded-full m-auto bg-purple-400"/> :
                        <img src={defaultImage} alt="" className="w-11 h-11 md:w-12 md:h-12 object-cover rounded-full m-auto bg-purple-400"/>
                    }
                
                </div>
                    <button className="w-full h-11 text-gray-400 flex items-center justify-start bg-secondary mr-1 p-3 focus:outline-none m-0 rounded-full px-4 cursor-pointer hover:bg-gray-100 hover:bg-opacity-10 transition ease-in duration-75" name="description" onClick={() => setModalOpen(prev => !prev)}> <span className="text-md">Share something!</span> </button>

                {/* Modal Create Post */}
                {modalOpen &&  <CreatePostModal setModalOpen={setModalOpen} postData={postData} setpostData={setpostData} handleSubmit={handleSubmit} post={post} handleBlob={handleBlob} setBlob={setBlob} blob={blob} formx={formx} />}
            
        </div>
    )
}

export default CreatePost
 