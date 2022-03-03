import React,{ useState } from 'react'

import EditModal from './EditModal';

import trash from '../../svg/trash.svg';
import EditIcon from '../../svg/edit.svg';
import loadingCat from '../../svg/loadingCat.svg';
import downArrow from '../../svg/down-arrow.svg';

const Modal = ({setSmallModal, handleDelete, deleteLoading, post, smallRef}) => {

    const [editModal, seteditModal] = useState(false);

  
    return (

            <div className="absolute top-12  z-30 right-3 w-1/2 md:w-2/5 h-auto rounded-md border border-borderColor bg-primary shadow-md text-white " ref={smallRef}>
                <div className="relative pt-1">
                    <div className="absolute z-10  -top-4 right-3">
                        <img src={downArrow} alt="" className="w-5 h-5 transform rotate-180 "/>
                    </div>
                    {deleteLoading ? <div className="flex gap-3 items-center px-3 pb-2"><img src={loadingCat} alt="loading..." className="h-14 w-14"/><span>Please wait while deleting the post...</span></div> :  <ul className="p-2">
                        <li className="hover:bg-white hover:bg-opacity-10 rounded-md py-2 px-3 transition duration-75 ">
                            <button className="flex items-center gap-2 w-full" onClick={()=> seteditModal(prev => !prev)}><img src={EditIcon} alt="" className=" w-4 h-4 " />  <span className="text-md">Edit post</span></button>
                        </li>
                        <li className="hover:bg-white hover:bg-opacity-10 rounded-md py-2 px-3 transition duration-75 m-0">
                            <button className="flex items-center gap-2 w-full" onClick={handleDelete}><img src={trash} alt="" className=" w-4 h-4 text-white" /><span className="text-md ">Delete post</span></button>
                        </li> 
                    </ul>}
                    <EditModal seteditModal={seteditModal} setSmallModal={setSmallModal} post={post} editModal={editModal}/>  
                </div>
            </div>
    )
}

export default Modal
