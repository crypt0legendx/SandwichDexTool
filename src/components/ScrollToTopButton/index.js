

import { useEffect } from "react";
import {MdVerticalAlignTop} from "react-icons/md";

import "./style.css";

function ScrollToTopButton(props){

    useEffect(()=>{
        const scrollfunction = () => {
            let scrollbutton = document.getElementById("scroll-to-top");
            if ( document.getElementById(props.refId) > 30 ||  document.getElementById(props.refId).scrollTop > 30) {
                scrollbutton.style.display = "block";
              } else {
                scrollbutton.style.display = "none";
              }
        }
        document.getElementById(props.refId).addEventListener('scroll',(e)=>{
            scrollfunction();
        })
    },[props.refId])


    useEffect(() => {
        topFunction();
    }, [window.location.pathname])// eslint-disable-line react-hooks/exhaustive-deps

    

    const topFunction=()=>{
        document.getElementById(props.refId).scrollTo({top: 0, behavior: 'smooth'});
    }

    return (
        <button id="scroll-to-top" className="scroll-to-top" onClick={()=>topFunction()}><MdVerticalAlignTop /></button>
    )
}

export default ScrollToTopButton;