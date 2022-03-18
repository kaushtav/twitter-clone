import React from "react";
import {ReactComponent as More} from "../../assets/icons/sidebar/more.svg";
import {useNavigate} from "react-router-dom";
import {useUser} from "../../context/user";
import './styles/ProfileMin.css'

const ProfileMin = ({user, button}) => {
    const {handleLogout} = useUser();
    const navigate = useNavigate();
   return(
       <div className={button?'profile button':'profile'} onClick={()=> {
           if (button) {
               handleLogout();
               navigate('/')
           } else {
               navigate(`/user/${user._id}`);
           }
       }}>
           <div>
               <img src={user.picture} alt={'user'}/>
               <div>
                   <p className={'name'}>{user.name}</p>
                   <p>@{user.handle}</p>
               </div>
           </div>
           {button && <More style={{marginLeft: '20px'}} height={'20px'}/>}
       </div>
   )
};

export default ProfileMin;