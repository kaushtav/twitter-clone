import React from 'react';
import {SidebarItems} from '../../constants'
import './styles/Sidebar.css'
import {ReactComponent as TwitterIcon} from '../../assets/icons/twitter-icon.svg'
import {ReactComponent as More} from '../../assets/icons/sidebar/more.svg'
import {useUser} from '../../context/user'
import {useNavigate} from "react-router-dom";

const Item = ({image,title}) => {
    return (
        <div className={'sidebar__item'}>
            <img className={'sidebar__itemImage'} src={image} alt={title}/>
            <p className={'sidebar__itemTitle'}>{title}</p>
        </div>
    )
}



const Sidebar = () => {
    const {id,name,handle,handleLogout} = useUser()

    const navigate = useNavigate();
    const user = {
        picture: 'https://pbs.twimg.com/profile_images/657118778707218432/t54TjLw6_400x400.jpg',
        name: name,
        handle: handle
    }
    return(
        <div className={'sidebar'}>
            <TwitterIcon/>
            {SidebarItems.map(item => <Item title={item.title} image={item.image}  key={item.title}/>)}
            <div className={'sidebar__tweetButton'}>
                <p>Tweet</p>
            </div>
            <div className={'sidebar__profile'} onClick={()=> {
                handleLogout();
                navigate('/')
            }}>
                <img src={user.picture} alt={'user'}/>
                <div>
                    <p className={'name'}>{user.name}</p>
                    <p>@{user.handle}</p>
                </div>
                <More style={{marginLeft:'20px'}} height={'20px'}/>
            </div>
        </div>
    )
}

export default Sidebar;