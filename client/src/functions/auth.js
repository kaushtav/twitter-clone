import axios from "axios";

const config = {
    headers: {
        'Content-Type': 'application/json',
    },
};

const signUp = async ({name, handle, email, password}) => {
    const {data} = await axios.post('/api/auth/signUp',{
        name, email, password,handle
    },config);
    return data
};

const auth = {signUp};
export default auth