import React, {useState} from "react";
import './styles/UpdateForm.css'
import {useNavigate} from "react-router-dom";
import {user} from '../../functions'
import {useUser} from "../../context/user";
import axios from "axios";

const UpdateForm = () => {
    const navigate = useNavigate();
    const {name, picture, email, handle, updateUser} = useUser();
    const [emailData, setEmail] = useState(email);
    const [handleData, setHandle] = useState(handle);
    const [nameData, setName] = useState(name);
    const [pictureData, setPicture] = useState(picture);
    const [error, setError] = useState("");

    const register = async event => {
        event.preventDefault()
        if(!nameData) {
            setError('You must enter a name.');
            return false;
        }
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!emailData||!re.test(emailData)) {
            setError('You must enter a valid email address.');
            return false;
        }
        if (!handleData){
            setError('You must enter a valid handle.');
            return false;
        }
        await user.updateProfile({name:nameData, email:emailData, handle:handleData, picture:pictureData})
        updateUser();
        navigate('/')

    };

    const uploadPicture = async event => {
        event.preventDefault();
        for (const image of Object.keys(event.target.files)) {
            const formData = new FormData();
            formData.append("file", event.target.files[image]);
            formData.append("tags", `review`);
            formData.append("upload_preset", "e2wh4uwf"); // Replace the preset name with your own
            formData.append("api_key", "1234567"); // Replace API key with your own Cloudinary key

            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dwajyh7fn/image/upload",
                formData,
                {
                    headers: {"X-Requested-With": "XMLHttpRequest"},
                });
            const {secure_url} = response.data;
            setPicture(secure_url)
        }
    };

    return(
        <div className={'settings__form'}>
            <input
                type="file"
                accept=".png, .jpg, .jpeg"
                name="images"
                className={'images'}
                onChange={uploadPicture}
            />

            <img src={pictureData} alt={'profile'}/>
            <input
                value={nameData}
                onChange={(e)=>setName(e.target.value)}
                type={'text'}
                placeholder={'Name'}
            />
            <input
                value={'@'+handleData}
                onChange={(e)=>setHandle(e.target.value.substring(1))}
                type={'text'}
            />
            <input
                value={emailData}
                onChange={(e)=>setEmail(e.target.value)}
                type={'email'}
                placeholder={'Email'}
            />
            <p id={'signupScreen__error'}>{error}</p>
            <button onClick={register}>Update Profile</button>
        </div>
    )
}

export default UpdateForm;
