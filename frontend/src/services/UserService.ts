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

// Get User by Username
export const fetchUser = (username: string | null | undefined) => {
    const apiUrl = `/api/user/${username}`;

    const response = apiGet(apiUrl);

    return response;
};

// Get Users
export const fetchUsers = (page: number = 0) => {
    const apiUrl = `/api/user/all?page=${page}`;

    const response = apiGet(apiUrl);

    return response;
};

// Save User
export const saveUser = (user: Partial<User>) => {
    const apiUrl = `/api/user/edit`;
    const payload = user;

    return apiPost(apiUrl, payload);
};

// Deactivate User
export const deactivateUser = (username: string | undefined ) => {
    const apiUrl = `/api/user/deactivate`;
    const payload = { username };

    return apiPost(apiUrl, payload);
}

// Mark User Interest as True
export const checkInterestUser = (username: string | null | undefined) => {
    const apiUrl = `/api/user/check-interest/${username}`;

    return apiPost(apiUrl, null);
}

// Upload Profile Photo
export const uploadUserPhoto = (user: User) => {
    const apiUrl = `/api/user/upload-photo`;
    const payload = user;

    return apiPost(apiUrl, payload);
};