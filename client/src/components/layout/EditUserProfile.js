import React, { useState } from 'react'

import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../../redux/actions/users';

import CancelIcon from '../.././svg/cancel2.svg';
import loadingCat from '../.././svg/loadingCat.svg';
const EditUserProfile = ({setModal, userInfo}) => {

    const [updateData, setUpdateData] = useState({firstname: userInfo.user?.firstname, lastname: userInfo.user?.lastname});
    const dispatch = useDispatch();
  
    const handleUpdate = (e) => {
        e.preventDefault();
        if(updateData.firstname.trim() === '' && updateData.lastname.trim() === '' ){
           return alert('Firstname, Lastname are required!');
        }
        dispatch(updateUserProfile(userInfo.user?._id, updateData, setModal));
    }

    return (
        <div className="fixed inset-0 z-40 w-full h-full flex justify-center items-center bg-black bg-opacity-25 overflow-auto" >
            <div className="bg-primary m-2 w-full md:w-96 h-auto shadow-md border border-borderColor rounded-md">
                <div className="p-2 flex justify-between items-center border-b border-borderColor tracking-wide font-light">
                    <div className="p-1 text-lg">Edit name</div>
                   {!userInfo.userUpdateLoading &&
                    <button className="hover:bg-white hover:bg-opacity-10 active:bg-white active:bg-opacity-25 rounded-full  p-2 transition ease-in duration-75" onClick={() => setModal(prev => !prev)}><img src={CancelIcon} alt="" className="h-4 w-4" /></button>
                   }
                </div>
                
                {/* form */}
                     {/* execute during update */}
                     {userInfo.userUpdateLoading ?
                        <div className="p-4 w-full h-full flex flex-col items-center justify-center space-y-2">
                            <img src={loadingCat} alt="" className="w-14 h-14" /> 
                            <p>Updating...Meow!!</p>
                            <p className="text-sm font-light text-gray-400">Full page reload after..</p>
                        </div> 
                        : 
                        <div className="p-3 space-y-2">
                            <form onSubmit={ handleUpdate}>
                            <div className="space-y-3 gap-2">
                                <div className="space-y-1">
                                    <label>Firstname</label>
                                    <input type="text" placeholder="Firstname" value={updateData.firstname} className="w-full p-2 bg-secondary rounded-md outline-none" onChange={(e) => setUpdateData({...updateData, firstname: e.target.value})} name="firstname" />
                                </div>
                                <div className="space-y-1">
                                    <label>Lastname</label>
                                    <input type="text" placeholder="Lastname" value={updateData.lastname} className="w-full p-2 bg-secondary rounded-md outline-none" onChange={(e) => setUpdateData({...updateData, lastname: e.target.value})} name="lastname" />
                                </div>
                            </div>
                            
                            <button className="bg-button2 rounded-md mt-3 py-1 px-1 w-full text-center font-light text-md md:text-lg" >Save Changes</button>
                            </form>
                        </div>
                        }
                </div>
        </div>
    )
}

export default EditUserProfile
