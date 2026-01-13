
import Api from '../config/AoxisConfig';

export  const RegisterApi = async (data) => {
    return Api.post('users/register', data);
}

export  const LoginApi = async (data) => {
    return await Api.post('users/login', data);
}   


export const ProfileApi = async () => {
    return Api.get('users/profile');
};
