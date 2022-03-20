import React from 'react';
import './styles/StatusScreen.css'
import {Sidebar} from '../components/app'
import Main from '../components/settings/Main'


const StatusScreen = () => {
    return(
        <div className={'statusScreen'}>
            <Sidebar />
            <Main/>
        </div>)
};

export default StatusScreen;