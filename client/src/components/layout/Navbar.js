import React,{useState} from 'react'


const Navbar = () => {

    const [open, setOpen] = useState(false);
    return (
        <div className={`fixed left-0 h-screen bg-blue-500 p-3 ${open ? `w-40`: `w-20`} transition ease-in-out duration-75  overflow-x-hidden  flex flex-col`}>

            <button className="w-min hover:bg-blue-400 active:bg-blue-600 transition ease-in-out duration-75 cursor-pointer rounded-full p-2" onClick={() => setOpen(prev => !prev)}>
                <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28px" height="30px"><path fill="white" d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"/></svg>
            </button>
      
                <div className="mt-10 mb-auto space-y-7 border border-red-600">

                    <div className="flex items-center justify-between">
                   <i  className="w-56"> <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="42px" height="40px"><path fill="white" d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"/></svg></i>
                        <span className="ml-2 text-white">Nixon Lim</span>
                    </div>

                    <div className="flex items-center">
                    <i  className="w-56"> <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="42px" height="40px"><path fill="white" d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"/></svg></i>
                        <span className="ml-2 text-white">Nixon Lim</span>
                    </div>
                    
                    <div className="w-10 h-10 bg-blue-400 rounded-full">

                    </div>

                </div>

                <div className="border border-green-600">
                    <div className="w-10 h-10 bg-blue-400 rounded-full place-end ">

                    </div>
                </div>
            
        </div>
    )
}

export default Navbar
