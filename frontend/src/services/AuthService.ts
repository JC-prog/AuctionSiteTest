import { AxiosResponse } from 'axios';
import User from '../interfaces/User';
import baseUrl from '../config/baseUrl';

const handleResponse = (response: AxiosResponse) => {
    if (response.status !== 200) {
        throw new Error('Network response was not ok');
    }

    return response;
};

const apiPost = async (url: string, payload: any) => {
    try {
        const response = await baseUrl.post(url, payload);

        return handleResponse(response);

    } catch (error) {

        throw error;

    }
};

// Register User
export const registerUser = (user: User) => {
    const apiUrl = `/api/auth/register`;
    const payload = { user };

    return apiPost(apiUrl, payload);
};

// Login User
export const loginUser = (username: string | null | undefined, password: string | null | undefined) => {
    const apiUrl = `/api/auth/login`;
    const payload = { username, password };

    return apiPost(apiUrl, payload);
};

// Change Password
export const changePassword =(username: string | null | undefined, password: string | null | undefined) => {
    const apiUrl = `/api/auth/change-password`;
    const payload = { username, password };

    console.log(payload);

    return apiPost(apiUrl, payload);
}

// Reset Password
export const resetPassword =(username: string | null | undefined) => {
    const apiUrl = `/api/auth/reset-password`;
    const payload = { username }

    console.log(payload);

    return apiPost(apiUrl, payload);
}