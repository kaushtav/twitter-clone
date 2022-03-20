import React from "react";
import "./styles/Header.css";
import {useNavigate} from "react-router-dom";
import {ReactComponent as Back} from "../../assets/icons/back.svg";

const Header = ({text}) => {
    const navigate = useNavigate();
    return (
        <div className="header">
            {text!=='Home'&&<Back className={'buttonh'} onClick={()=>{navigate(-1)}}/>}
            <h2>{text}</h2>
        </div>
    );
}

export default Header;