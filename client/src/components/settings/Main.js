import React, {useState} from 'react';

import './styles/Main.css'
import UpdateForm from "./UpdateForm";

const Main = () => {
    const [view, setView] = useState('tweets');
    return(
        <div className={'settings__main'}>
            <h2>Settings</h2>
            <UpdateForm/>
        </div>
    )
}

export default Main;