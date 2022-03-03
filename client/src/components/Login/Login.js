import React,{ useState, useEffect, useRef } from 'react';
import Loading from '../layout/Loading';
import { useHistory } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';

import {signUp,signIn} from '../../redux/actions/auth';

// import GoogleSvg from '../layout/GoogleSvg';
// import { GoogleLogin } from 'react-google-login';

const initialState = {firstname: '', lastname: '', email: '', confirmPassword: '', password: ''};
const Login = () => {
 
    const [isSignup, setisSignup] = useState(false);
    const [userData, setuserData] = useState(initialState);
    const [blob, setBlob] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    const authData = useSelector(state => state.auth);
    const ref = useRef();

    //Checks if the user is authenticated, then if its true redirect to homepage
    useEffect(()=>{
        if(localStorage.getItem('token')){
        history.push('/');
        }
    },[history])

    const handleSubmit = (e) => {
        e.preventDefault();

        const myForm = e.target;
        const formData = new FormData(myForm);

        if(isSignup){
            for(const [key, value] of Object.entries(userData)){
                if(value.trim() === "") {
                    return alert(`${key} is required!`);
                }
            }
            if(userData.password.trim() !== userData.confirmPassword.trim()){
                return dispatch({type:'ERROR', payload: {password:"Password and Confirm Password doesn't match!"}});
            }
            dispatch(signUp(formData,setisSignup,clear));
        }else{
            dispatch(signIn(userData,history));
        } 
    }
    const handleBlob = (e) => {
        if(e.target.files[0].type !== "image/jpg" && e.target.files[0].type !== "image/jpeg" && e.target.files[0].type !== "image/png" ) {
            ref.current.reset();
            setBlob('');
            return alert('File type not supported!');
         }
        setBlob(URL.createObjectURL(e.target.files[0]));
       
    }
    const handleChange = (e) => {
        setuserData({...userData, [e.target.name]: e.target.value });
    }
    const setSignUp = () => {
        setisSignup(prev => !prev);
        clear();
        dispatch({type:'CLEAR_ERROR'});
    }

    const clear = () => {
        setuserData({firstname: '', lastname: '', email: '', confirmPassword: '', password: ''});
        setBlob('');
    }
    // Google Auth 
    // const googleSuccess = async (res) => {
    //     const profile = res?.profileObj;
    //     const token = res?.tokenId;
    //     try{
    //         dispatch({type: 'LOGIN', payload: {profile, token}});
    //         history.push('/');
    //     }catch(error){
    //         console.log(error);
    //     }
    // }
    // const googleFailure = async (error) => {
    //     console.log(error);
    //     console.log('Google Sign in failed.')
    // } // Google Auth 

    return (
        <div>
            <div className="fixed m-4 z-40 text-sm text-gray-300 text-center bottom-0 right-0 underline">
                <a href="https://www.facebook.com/limnixon03292001/">Developed By: Nixon A. Lim</a>
            </div>

            <div className="relative z-10 w-full max-w-full min-h-screen flex justify-center items-center border-red-500"> 

                {/* <div className="space-y-1 ml-7 tracking-tight">
                    <p className=" text-base">Welcome! to</p>
                    <h1 className="text-7xl font-bold"><span>CONNECT</span> <sup className="text-md text-gray-600">BETA</sup></h1>
                    <p className="text-gray-600">Why connect beta? i don't know either!</p>
                </div> */}

                <div className={`bg-white tracking-wide bg-opacity-13 px-8 py-9 rounded shadow md:w-96 h-auto space-y-10 m-2 ${isSignup && `md:w-1/2 lg:w-2/5 ` }`}>
                
                    <h1 className="text-3xl text-gray-600 text-center w-full">{isSignup ? (blob === '' ? 'Sign Up': <img src={blob} alt={blob} className="rounded-full block w-24 h-24 m-auto object-cover"/>) : 
                    <div className=""><span className="text-xs">Welcome to</span><p className="text-3xl">Connect!</p></div>  } </h1>
                    <form className={`space-y-5 ${isSignup && `sm:space-y-2`}`} onSubmit={handleSubmit} ref={ref}>
                        { isSignup &&  <div className="flex space-x-3">
                                <div className="flex-1">
                                    <label className="block text-gray-600 text-xs md:text-sm">Firstname</label>
                                    {authData.error?.firstname && <span className="text-red-400 text-xs">{authData.error?.firstname}</span>}
                                    <input type="text" name="firstname" placeholder="FirstName" className="w-full border border-gray-200 p-2 rounded mt-2 outline-none focus:border-blue-500" onChange={handleChange} value={userData.firstname} required/>
                                </div>
                                <div className="flex-1">
                                    <label className="block text-gray-600 text-xs md:text-sm">Lastname</label>
                                    {authData.error?.lastname && <span className="text-red-400 text-xs">{authData.error?.lastname}</span>}
                                    <input type="text" name="lastname" placeholder="LastName" className="w-full border border-gray-200 p-2 rounded mt-2 outline-none focus:border-blue-500" onChange={handleChange} value={userData.lastname} required/>
                                </div>
                            </div> }

                        <div>
                            <label className="block text-gray-600 text-xs md:text-sm">Email</label>
                            {authData.error?.email && <span className="text-red-400 text-xs">{authData.error?.email}</span>}
                            <input type="text" name="email" placeholder="Email" className="w-full border border-gray-200 p-2 rounded mt-2 outline-none focus:border-blue-500" onChange={handleChange} value={userData.email} required/>
                        </div>
                        
                        <div>
                            <label className="block text-gray-600 text-xs md:text-sm">Password</label>
                            {authData.error?.password && <span className="text-red-400 text-xs">{authData.error?.password}</span>}
                            <input type="password" name="password" placeholder="Password" className="w-full border border-gray-200 p-2 rounded mt-2 outline-none focus:border-blue-500" onChange={handleChange} value={userData.password} required />
                        </div>

                        { isSignup && <div className="space-y-3">
                            <label className="block text-gray-600 text-xs md:text-sm">Confirm Password</label>
                            {authData.error?.confirmPassword && <span className="text-red-400 text-xs">{authData.error?.confirmPassword}</span>}
                            <input type="password" name="confirmPassword" placeholder="Confirm Password" className="w-full border border-gray-200 p-2 rounded mt-2 outline-none focus:border-blue-500" onChange={handleChange} value={userData.confirmPassword} required />
                            <div >
                                {authData.error?.imageUrl && <span className="text-red-400 text-xs">{authData.error?.imageUrl}</span>}
                                <div className="flex items-center md:gap-2">
                                    <label className="block text-gray-600 text-xs md:text-sm">Upload Picture:</label>
                                        <div className="text-xs md:text-sm p-2 text-gray-600 cursor-pointer ">
                                            <input type="file" name="image" onChange={handleBlob} />
                                        </div>
                                        <p></p>
                                </div>
                            </div>
                               
                        </div>}
                     
                        { isSignup ?  <div className="space-y-3">
                            <button className="bg-purple-700 hover:bg-purple-400 text-white text-lg px-4 py-2 rounded block w-full active:bg-purple-300 transition ease-in duration-75"><span className="flex justify-center items-center text-md md:text-lg">Sign Up</span></button>
                        </div> :  <div className="space-y-3">
                            <button className="bg-purple-700 hover:bg-purple-400 text-white px-4 py-2 rounded block w-full active:bg-purple-500 transition ease-in duration-75 text-md md:text-lg">Login</button>
                            {/* Google Auth */}
                            {/* <p className="text-gray-600 text-center">or</p>
                            <GoogleLogin
                                clientId="215946000983-n9blufh4c7sac7q7ia3qkrhmjvu13h4n.apps.googleusercontent.com"
                                render={(renderProps) => (
                                    <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="bg-white hover:bg-gray-100 border border-gray-200 text-gray-600 text-lg px-4 py-2 rounded block w-full active:bg-gray-200 transition ease-in duration-75"><span className="flex justify-center items-center"> <GoogleSvg />
                                    Login with Google</span></button>
                                )}
                                onSuccess={googleSuccess}
                                onFailure={googleFailure}
                                cookiePolicy={'single_host_origin'}
                            /> */}  {/* Google Auth */}
                        </div> }
                                
                    </form>
                                    
                    <p className="text-gray-500 text-xs text-center cursor-pointer mt-1"
                     onClick={setSignUp} >
                       {isSignup ? " Already have an account?" : "Don't have an account? Click here to Sign up!" }   </p>
                </div>
                {authData.loading && <Loading /> } 
            </div>
        </div>
                
    );
}

export default Login;