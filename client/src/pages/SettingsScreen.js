import React, {useEffect, useState} from 'react';
import './styles/StatusScreen.css'
import {Sidebar} from '../components/app'
import {Main} from '../components/settings'
import {useUser} from "../context/user";


const StatusScreen = () => {
    const {id, name, picture, handle} = useUser();


    return(
        <div className={'statusScreen'}>
            <Sidebar />
            <Main/>
        </div>)
};

export default StatusScreen;