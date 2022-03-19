import axios from "axios";
import auth from './auth'
import user from './user'
import tweet from './tweet'

const baseURL = process.env.REACT_APP_BASE_URL
console.log(process.env.REACT_APP_BASE_URL)

const api = axios.create({
    baseURL
})

const config = {
    headers: {
        'Content-Type': 'application/json',
    },
};

const ping = async () => {
    try {
        let {data}  = await api.get('api', config);
        return data
    } catch (e) {
        console.log(e);
        return []
    }

};

export {api,auth, ping, user, tweet}