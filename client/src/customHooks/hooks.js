import { useRef, useState, useEffect } from "react";


// these custom hooks are used to close modals when clicking, either outside of the modal or pressing esc button

export const useModalCloser = (bool) => {
    const ref = useRef(null);
    const[modalX, setModalX] = useState(bool);

    const handleClickOutside = (event) => {
        if(ref.current && !ref.current?.contains(event.target)){
            setModalX(false);
        }
    }
    const  handleClickEsc = (event) => {
        if(event.key === "Escape") setModalX(false)
    }
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
         document.addEventListener('keydown', handleClickEsc, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
            document.addEventListener('keydown', handleClickEsc, true);
        }
    }, [ref])
   

    return {ref, modalX, setModalX};
}

// these custom hook are used to close the small modal.. btw i hate to repeat codes, i can't think of anything!!!!
export const useSmallModalCloser = (bool) => {
    const smallRef = useRef(null);
    const[smallModal, setSmallModal] = useState(bool);

    const handleClickOutside = (event) => {
        if(smallRef.current && !smallRef.current?.contains(event.target)){
            setSmallModal(false);
        }
    }
    const  handleClickEsc = (event) => {
        if(event.key === "Escape")  setSmallModal(false)
    }
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
         document.addEventListener('keydown', handleClickEsc, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
            document.addEventListener('keydown', handleClickEsc, true);
        }
    }, [smallRef])
   

    return {smallRef, smallModal, setSmallModal};
}