import React from 'react';
import {SidebarItems} from '../../constants'
import './styles/Sidebar.css'
import {ReactComponent as TwitterIcon} from '../../assets/icons/twitter-icon.svg'
import {useUser} from '../../context/user'
import ProfileMin from "./ProfileMin";
import {useNavigate} from "react-router-dom";

const Item = ({image,title, link}) => {
    const navigate =useNavigate();
    return (
        <div className={'sidebar__item'} onClick={()=>navigate(link)}>
            <img className={'sidebar__itemImage'} src={image} alt={title}/>
            <p className={'sidebar__itemTitle'}>{title}</p>
        </div>
    )
}



const Sidebar = () => {
    const {name,handle, picture} = useUser();
    return(
        <div className={'sidebar'}>
            <TwitterIcon/>
            {SidebarItems.map(item => <Item title={item.title} image={item.image} link={item.link} key={item.title}/>)}
            {/*<div className={'sidebar__tweetButton'}>*/}
            {/*    <p>Tweet</p>*/}
            {/*</div>*/}
            <div style={{position:'absolute', bottom:0, right:'10%'}}>
                <ProfileMin user={{name,handle,picture}} button={true}/>
            </div>
        </div>
    )
}

export default Sidebar;