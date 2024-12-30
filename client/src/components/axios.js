import axios from 'axios';


const api = axios.create({
    baseURL: 'https://project-assignment-2-27638-27628-27643-3dd5.onrender.com',
    withCredentials: true,
});


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
