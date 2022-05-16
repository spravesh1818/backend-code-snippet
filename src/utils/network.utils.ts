import axios from 'axios';

const http = axios.create();

http.interceptors.response.use(
    (response: any) => {
        return response.data;
    },
    (error: any) => {
        if (error.response) {
            return Promise.reject(error);
        }

        return Promise.reject('new network error');
    }
);

export { http };
