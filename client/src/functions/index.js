import axios from "axios";

const config = {
    headers: {
        'Content-Type': 'application/json',
    },
};

export const pingServer = async () => {
    try {
        let {data}  = await axios.get('api', config);
        return data
    } catch (e) {
        console.log(e);
        return []
    }

};