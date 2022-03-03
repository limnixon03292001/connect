import React,{useState, useRef} from 'react'
import { useDispatch } from 'react-redux';
import CancelIcon from '../.././svg/cancel2.svg';
import loadingCat from '../.././svg/loadingCat.svg';

import { updateProfilePicture } from '../../redux/actions/users';


const ProfilePictureModal = ({setModal, userInfo}) => {
    const [profilePictureData, setprofilePictureData] = useState(userInfo.user?.imageUrl);
    const dispatch = useDispatch();
    const ref = useRef();

    const handleChange = (e) => {
         if(e.target.files[0].type !== "image/jpg" && e.target.files[0].type !== "image/jpeg" && e.target.files[0].type !== "image/png" ) {
            ref.current.reset();
            setprofilePictureData(null);
            return alert('File type not supported!');
         }
        setprofilePictureData(URL.createObjectURL(e.target.files[0]));
    }
    const resetProfilePictureData = () => {
        setprofilePictureData('');
        ref.current.reset();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const myForm = e.target;
        const formData = new FormData(myForm);
        formData.append('imgUrl', profilePictureData);
        dispatch(updateProfilePicture(userInfo.user?._id, formData, setModal));
    }
    return (
            <div className="fixed inset-0 z-40 w-full h-full flex justify-center items-center bg-black bg-opacity-25 overflow-auto" >
                <div className="bg-primary m-2 w-full md:w-96 h-auto shadow-md border border-borderColor rounded-md">
                    <div className="p-2 flex justify-between items-center border-b border-borderColor tracking-wide font-light">
                        <div className="p-1 text-md md:text-lg">Change Profile Picture</div>
                        {!userInfo.userUpdateLoading && 
                        <button className="hover:bg-white hover:bg-opacity-10 active:bg-white active:bg-opacity-25 rounded-full p-2 transition ease-in duration-75" onClick={() => setModal(prev => !prev)}><img src={CancelIcon} alt="" className="h-4 w-4" /></button>}
                    </div>

                    {/* fires during update  */}
                    {userInfo.userUpdateLoading ? 
                        <div className="p-4 w-full h-full flex flex-col items-center justify-center space-y-2">
                            <img src={loadingCat} alt="" className="w-14 h-14" /> 
                            <p>Updating...Meow!!</p>
                            <p className="text-sm font-light text-gray-400">Full page reload after..</p>
                        </div> 
                    :
                        <>
                        {profilePictureData && 
                            <div className="relative m-auto h-max w-max p-3">
                                <img src={profilePictureData} alt="userProfileImg" className="m-auto h-24 w-24 rounded-full bg-purple-400 object-cover object-center" />
                                <button className="bg-gray-600 bg-opacity-40 shadow-md hover:bg-gray-500 hover:bg-opacity-30 active:bg-white active:bg-opacity-25 rounded-full p-2 transition ease-in duration-75 absolute top-2 right-2"> <img src={CancelIcon} alt="" className="w-4 h-4 rounded-md" onClick={resetProfilePictureData} /> </button>
                            </div>}
                            <form onSubmit={handleSubmit} ref={ref}>
                                <div className="flex gap-2 items-center self-start m-3">
                                    <p className="text-xs md:text-sm break-words ">Cover Photo:</p>
                                    <div className="text-xs md:text-sm relative overflow-hidden">
                                        <input type="file" name="image" onChange={handleChange} />
                                    </div>
                                </div>
                                <button className="bg-button2 rounded-b-md mt-2 py-1 px-1 w-full text-center font-light text-md md:text-lg">Save Changes</button> 
                            </form>
                        </>
                    }
                </div>
            </div>
    )
}
export default ProfilePictureModal
