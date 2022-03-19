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

const auth = {signUp};
export default auth