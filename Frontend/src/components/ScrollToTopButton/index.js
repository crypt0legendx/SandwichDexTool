

import { useEffect } from "react";
import {MdVerticalAlignTop} from "react-icons/md";

import "./style.css";

function ScrollToTopButton(props){

    let pathname = window.location.pathname;

    useEffect(()=>{
        document.getElementById(props.refId).addEventListener('scroll',(e)=>{
            scrollfunction();
        })
    },[props.refId])


    useEffect(() => {
        let pathname = window.location.pathname;
        topFunction();
    }, [window.location.pathname]);

    const scrollfunction = () => {
        let scrollbutton = document.getElementById("scroll-to-top");
        if ( document.getElementById(props.refId) > 30 ||  document.getElementById(props.refId).scrollTop > 30) {
            scrollbutton.style.display = "block";
          } else {
            scrollbutton.style.display = "none";
          }
    }

    const topFunction=()=>{
        document.getElementById(props.refId).scrollTo({top: 0, behavior: 'smooth'});
    }

    return (
        <button id="scroll-to-top" className="scroll-to-top" onClick={()=>topFunction()}><MdVerticalAlignTop /></button>
    )
}

export default ScrollToTopButton;