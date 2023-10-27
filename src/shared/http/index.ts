import axios from 'axios';
import { IAuthResponse } from '../../modules/Authentication';

const $api = axios.create({
    withCredentials: true,
    baseURL: '/',
});

export default $api;

$api.interceptors.request.use((config) => {
    // config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    // TODO re-think authorization process, 
    // probably we should not call /refresh endpoint at all
    const origin = error.config;
    if(error.response.status === 401 && !origin._retry) {
        console.log('[Response Interceptor]; Retry on 401')
        origin._retry = true;
        const { data } = await axios.get<IAuthResponse>('/user/refresh', { withCredentials: true });
        if (!data?.user) {
            console.log('[Response Interceptor error]; User not found');
        }
    }
})