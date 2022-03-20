import React from "react";
import {useNavigate} from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import './styles/ProfileMin.css'

const ProfileMin = ({user}) => {
    const navigate = useNavigate();
    return(
       <div className={'profile'}  onClick={()=> {navigate(`/user/${user._id}`)}}>
           <ReactTooltip
               id={'logout'}
               className={'tweet__reactTooltip'}
               place={'bottom'}
               backgroundColor={'rgba(0,0,0,0.4)'}
           />
           <div>
               <img src={user.picture} alt={'user'}/>
               <div>
                   <p className={'name'}>{user.name}</p>
                   <p>@{user.handle}</p>
               </div>
           </div>
       </div>
    )
};

export default ProfileMin;