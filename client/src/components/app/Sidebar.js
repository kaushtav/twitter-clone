import React from 'react';
import {SidebarItems} from '../../constants'
import './styles/Sidebar.css'
import {ReactComponent as TwitterIcon} from '../../assets/icons/twitter-icon.svg'
import {ReactComponent as More} from '../../assets/icons/sidebar/more.svg'

const Item = ({image,title}) => {
    return (
        <div className={'sidebar__item'}>
            <img className={'sidebar__itemImage'} src={image} alt={title}/>
            <p className={'sidebar__itemTitle'}>{title}</p>
        </div>
    )
}
const user = {
    picture: 'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640',
    name: 'Kaushtav Atri',
    handle: 'kaushtav'
}


const Sidebar = () => {
    return(
        <div className={'sidebar'}>
            <TwitterIcon/>
            {SidebarItems.map(item => <Item title={item.title} image={item.image}  key={item.title}/>)}
            <div className={'sidebar__tweetButton'}>
                <p>Tweet</p>
            </div>
            <div className={'sidebar__profile'}>
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