import React from 'react';
import {SidebarItems} from '../../context/constants'
import './styles/Sidebar.css'
import {ReactComponent as TwitterIcon} from '../../assets/icons/twitter-icon.svg'
import {useUser} from '../../context/user'
import {useNavigate} from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Logout from "../../assets/icons/sidebar/logout.svg";

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
    const {name,handle, picture, handleLogout,id} = useUser();
    const navigate = useNavigate();
    return(
        <div className={'sidebar'}>
            <TwitterIcon/>
            {SidebarItems.map(item => <Item title={item.title} image={item.image} link={item.link} key={item.title}/>)}
            {/*<div className={'sidebar__tweetButton'}>*/}
            {/*    <p>Tweet</p>*/}
            {/*</div>*/}
            <div style={{position:'absolute', bottom:0, right:'10%'}}>
                <div className={'profile button'}>
                    <ReactTooltip
                        id={'logout'}
                        className={'tweet__reactTooltip'}
                        place={'bottom'}
                        backgroundColor={'rgba(0,0,0,0.4)'}
                    />
                    <div onClick={()=> {navigate(`/user/${id}`)}}>
                        <img src={picture} alt={'user'}/>
                        <div>
                            <p className={'name'}>{name}</p>
                            <p>@{handle}</p>
                        </div>
                    </div>
                    <img
                        data-tip={'Log Out'}
                        data-for={'logout'}
                        src={Logout}
                        alt={'logout'}
                        className={'logout'}

                        height={'20px'}
                        onClick={() => {
                            handleLogout();
                            navigate('/');
                        }}
                    />

                </div>
            </div>
        </div>
    )
}

export default Sidebar;