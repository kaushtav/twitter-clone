import {api} from "./index";

const config = {
    headers: {
        'Content-Type': 'application/json',
    },
};

const signUp = async ({name, handle, email, password}) => {
    const {data} = await api.post('/api/auth/signUp',{
        name, email, password,handle
    },config);
    return data
};

const signIn = async ({handle, password}) => {
    const {data} = await api.post('/api/auth/signIn', {
        handle, password
    },config)
    return data
};

const auth = {signUp, signIn};
export default auth