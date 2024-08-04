import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import baseUrl from '../config/baseUrl';
import IUser from '../../interfaces/IUser';
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

// Get Bids
export const fetchBids = (username: string) => {
    const apiUrl = `/api/bid/${username}`;

    const response = apiGet(apiUrl);

    return response;
};

export const bidItem = async (itemId: string) => {
    const apiUrl = `/api/item/bid`
  
    const payload = itemId
  
    const response = apiPost(apiUrl, payload);

    return response;
};
