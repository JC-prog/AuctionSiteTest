import Cookies from 'js-cookie';

// Base URL
import baseUrl from '../config/baseUrl';

// Interface
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
/*
const apiPost = async (url: string, payload: any) => {
    try {
        const response = await baseUrl.post(url, payload, getAuthConfig());

        return response;

    } catch (error) {

        throw error;

    }
};*/

const apiGet = async (url: string) => {
    try {
        const response = await baseUrl.get(url, getAuthConfig());

        return response;

    } catch (error) {

        throw error;

    }
};

// Fetch Categories
export const fetchCategories = () => {
    const apiUrl = `/api/category/all`;

    const response = apiGet(apiUrl);

    return response;
};