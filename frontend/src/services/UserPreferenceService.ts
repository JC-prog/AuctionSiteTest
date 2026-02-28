import Cookies from 'js-cookie';
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

// Get User category preference
export const fetchUserCategoryPreference = (username: string | null | undefined) => {
    const apiUrl = `/api/user-preference/category/${username}`;

    const response = apiGet(apiUrl);

    return response;
};