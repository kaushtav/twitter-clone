import React from 'react';
import './HomeScreen.css'
import {Tweets, More} from '../components/home'
import {Sidebar} from '../components/app'



const HomeScreen = () => {
    return(
        <div className={'homeScreen'}>
            <Sidebar />
            <Tweets/>
            <More/>
        </div>)
}

export default HomeScreen;