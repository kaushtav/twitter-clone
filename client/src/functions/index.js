import axios from "axios";
import auth from './auth'
import user from './user'
import tweet from './tweet'

const config = {
    headers: {
        'Content-Type': 'application/json',
    },
};

const ping = async () => {
    try {
        let {data}  = await axios.get('api', config);
        return data
    } catch (e) {
        console.log(e);
        return []
    }

};

export {auth, ping, user, tweet}