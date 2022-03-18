import React, {useState} from 'react';

import './styles/Main.css'
import UpdateForm from "./UpdateForm";
import {Header} from "../app";

const Main = () => {
    return(
        <div className={'settings__main'}>
            <Header text={'Settings'}/>
            <UpdateForm/>
        </div>
    )
}

export default Main;