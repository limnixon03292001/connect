import React,{ useState, useRef } from 'react'

import EditIcon from '../../svg/edit.svg';
import loadingCat from '../../svg/loadingCat.svg';
import CancelIcon from '../../svg/cancel2.svg';

import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../../redux/actions/post';


const EditModal = ({setSmallModal, post, editModal }) => {
    const [updateData, setupdateData] = useState({description: post.description});
    const [blob, setBlob] = useState(post.postImg);
    const dispatch = useDispatch();
    const postsState = useSelector(state => state.posts)
    const ref = useRef();

    const modalHandler = () => {
        setupdateData({description:'', postImg:''});
        setSmallModal(false);
    }
    const handleBlob = (e) => {
        if(e.target.files[0].type !== "image/jpg" && e.target.files[0].type !== "image/jpeg" && e.target.files[0].type !== "image/png" ) {
            ref.current.reset();
            setBlob('');
            return alert('File type not supported!');
         }
        setBlob(URL.createObjectURL(e.target.files[0]));
    }

    const resetBlob = () => {
        setBlob('');
        ref.current.reset();
    }

    const handleUpdate = (e) => {
        e.preventDefault();

        const myForm = e.target;
        const formData = new FormData(myForm);
        formData.append('imgUrl', blob);

        if(updateData.description.trim() === '' && blob === ''){
            return alert('Input some content!');
        }
    
        dispatch(updatePost(post._id,formData, modalHandler));
    }

  
    return (
         <div className={`fixed inset-y-0 inset-x-0 z-50 w-full h-full ${editModal ? `flex` : `hidden` } justify-center items-center bg-black bg-opacity-25 overflow-auto`}>
            <div className="bg-primary rounded-md w-full md:w-2/4 max-w-screen-md m-3 border border-borderColor shadow-md">
                <div className="flex gap-2 items-center justify-between py-2 px-1 md:py-4 md:px-2 border-b border-borderColor">
                    <div className="flex items-center justify-center gap-2 pl-2">
                        <img src={EditIcon} alt="" className=" w-5 h-5" />  
                        <h1 className="text-xl font-light">Edit post</h1>
                    </div>
                    <div>
                        {postsState.updateLoading ? '' :      
                        <button className="hover:bg-white hover:bg-opacity-10 active:bg-white active:bg-opacity-25 rounded-full  p-2 transition ease-in duration-75" onClick={modalHandler}><img src={CancelIcon} alt="" className="h-4 w-4" /></button> }
                   
                    </div>
                </div>
                <div>
                    {postsState.updateLoading ? 
                    <div className="flex flex-col justify-center items-center p-4">
                        <img src={loadingCat} alt="loading..." className="w-16 h-16" />
                        <p className="text-md">Updating... Meow!</p>
                    </div> : 
                    <div className="relative h-auto overflow-auto">
                        <form onSubmit={handleUpdate} ref={ref}>
                            <textarea placeholder="Create Post..." cols="30" rows="3" className="w-full h-40 bg-primary p-3 focus:outline-none inset-0 m-0 rounded-t-md resize-none relative align-top overflow-auto" name="description" defaultValue={updateData.description} onChange={(e) => setupdateData({...updateData, description: e.target.value})} ></textarea> 

                            <div className="space-y-3 bg-primary p-3 rounded-md">
                                {/* if theres an image go here */}
                                {blob && <div className="relative h-52 overflow-auto">
                                    <img src={blob} alt={blob} className="rounded-md object-cover w-full max-h-37 bg-"/>
                                    <div className="bg-gray-600 bg-opacity-30 shadow-md hover:bg-gray-500 hover:bg-opacity-30  active:bg-white active:bg-opacity-25 rounded-full p-2 transition ease-in duration-75 absolute top-0 right-0 m-2 cursor-pointer" onClick={resetBlob}> <img src={CancelIcon} alt="" className="w-4 h-4 rounded-md "  /> </div>
                                </div> }
                                    <div className="flex flex-col items-center justify-end gap-3">
                                        <div className="flex gap-2 items-center text-xs md:text-sm relative object-cover cursor-pointer overflow-hidden w-full">
                                            <p className="text-md">Upload Picture:</p>
                                            <input type="file" name="image" onChange={handleBlob} />
                                        </div>
                                        <button className="bg-button2 hover:bg-purple-400 active:bg-purple-500 rounded-md p-1 py-2 p transition ease-in duration-75 cursor-pointer w-full text-sm md:text-lg font-light"> Update Post</button> 
                                    </div>
                            </div>
                        </form>
                    </div> }
                    
                </div>
              
            </div>
        </div>
    )
}

export default EditModal
