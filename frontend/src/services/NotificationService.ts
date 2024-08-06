import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import User from '../interfaces/User';
import baseUrl from '../config/baseUrl';

const getAuthConfig = () => {
    const token = Cookies.get('access_token');
    if (!token) {
        throw new Error('No access token found');
    }

    return {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };
};

const apiPost = async (url: string, payload: any) => {
    try {
        const response = await baseUrl.post(url, payload, getAuthConfig());

        return response;

    } catch (error) {

        throw error;

    }
};

const apiGet = async (url: string) => {
    try {
        const response = await baseUrl.get(url, getAuthConfig());

        return response;

    } catch (error) {

        throw error;

    }
};

// Get Notification by User
export const fetchNotification = (username: string) => {
    const apiUrl = `/api/notification/${username}`;
    console.log(apiUrl);
    const response = apiGet(apiUrl);
    console.log(response);
    return response;
};
