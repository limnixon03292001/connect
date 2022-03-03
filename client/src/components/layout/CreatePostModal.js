import React,{useEffect} from 'react'

import CancelIcon from '../../svg/cancel2.svg';
import loadingCat from '../../svg/loadingCat.svg';

const CreatePostModal = ({setModalOpen, postData, setpostData, handleSubmit, post, handleBlob, setBlob, blob, formx}) => {

    document.addEventListener('click', (e) => {
        if(e.target.id === 'modal'){
            setModalOpen(false);
        }
    });

    useEffect(()=>{
        return () => {
            setBlob('');
            setpostData({...postData, description: '' })
        }
    },[setBlob,setpostData])
    const resetBlob = () => {
        setBlob('');
        formx.current.reset();
    }
    return (
        <div className="fixed inset-0 z-50 w-full h-full bg-black bg-opacity-25 flex justify-center items-center" id="modal">
            <div className="bg-primary w-full md:w-2/4 max-w-screen-md m-3 h-auto shadow-md border border-borderColor rounded-md">
                <div className="p-2 flex justify-between items-center border-b border-borderColor tracking-wide font-light">
                    <div className="p-2 text-lg">Create Post</div>
                    {!post.newPostLoading && 
                    <button className="hover:bg-white hover:bg-opacity-10 active:bg-white active:bg-opacity-25 rounded-full  p-2 transition ease-in duration-75" onClick={() => setModalOpen(prev => !prev)}><img src={CancelIcon} alt="" className="h-4 w-4" /></button>}
                </div>
                    {post.newPostLoading  ? <div className="text-md text-white flex flex-col justify-center items-center gap-1 p-5"><img src={loadingCat} alt={loadingCat} className="w-14 h-14"/> <span>Posting...</span></div> :
                    <>
                    <form onSubmit={handleSubmit} ref={formx}>
                        <textarea placeholder="Create Post..."  cols="30" rows="3" className="w-full h-32 bg-primary p-3 focus:outline-none inset-0 m-0 rounded-t-md resize-none relative align-top overflow-auto" name="description" value={postData.description} onChange={(e) => setpostData({...postData, description: e.target.value })} ></textarea>

                        <div className="space-y-3 bg-primary p-3 rounded-b-md">
                            {/* if theres an image go here */}
                            {blob && <div className="relative h-52 overflow-auto">
                            <img src={blob} alt={blob} className="rounded-md object-cover object-center h-full w-full max-h-full"/>
                            <div className="bg-gray-600 bg-opacity-30 hover:bg-gray-500 hover:bg-opacity-30 active:bg-white active:bg-opacity-25 rounded-full p-2 transition ease-in duration-75 absolute top-0 right-0 m-2 cursor-pointer">  <img src={CancelIcon} alt="" className="w-4 h-4 rounded-md " onClick={resetBlob}/> </div>
                            </div>}
                        
                            <div className="flex items-center gap-3">
                                <p className="text-xs md:text-sm ">Upload Picture:</p> 
                                    <div className="text-xs md:text-sm relative overflow-hidden">
                                        <input type="file" name="image" onChange={handleBlob}/>
                                    </div>
                            </div>
                        {/* button */}
                            <div>
                            <button className="bg-button2 active:bg-white active:bg-opacity-25 rounded-md py-1 px-2 transition ease-in duration-75 text-sm md:text-lg w-full">Post</button>   
                            </div>
                        </div> 
                    </form>
                    </>
                }
            </div>
        </div>
    )
}

export default CreatePostModal
