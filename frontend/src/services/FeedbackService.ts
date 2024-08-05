import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import baseUrl from '../config/baseUrl';
import { toast } from 'react-toastify';

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

// Get Feedback
export const fetchFeedback = () => {
    const apiUrl = `/api/feedback/all`;

    const response = apiGet(apiUrl);

    return response;
};

// Create Feedback
export const createFeedback = async (username: string, message: string) => {
    const apiUrl = `/api/feedback/create`
  
    const payload = { username, message}
  
    const response = apiPost(apiUrl, payload);

    return response;
};