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

// Get Transaction as Buyer
export const fetchBuyerTransaction = (username: string) => {
    const apiUrl = `/api/transaction/buyer/${username}`;
    console.log(apiUrl);
    const response = apiGet(apiUrl);
    console.log(response);
    return response;
};

// Get Transaction as Seller
export const fetchSellerTransaction = (username: string) => {
    const apiUrl = `/api/transaction/seller/${username}`;
    console.log(apiUrl);
    const response = apiGet(apiUrl);
    console.log(response);
    return response;
};

// Payment
export const postPayment = (itemId: number) => {
    const apiUrl = `/api/transaction/buyer/payment/${itemId}`;
    console.log(apiUrl);
    const response = apiPost(apiUrl, null);
    console.log(response);
    return response;
};

// Seller Ship
export const postShipment = (itemId: number) => {
    const apiUrl = `/api/transaction/seller/shipped/${itemId}`;
    console.log(apiUrl);
    const response = apiPost(apiUrl, null);
    console.log(response);
    return response;
};

// Seller Deliver
export const postDelivered = (itemId: number) => {
    const apiUrl = `/api/transaction/seller/delivered/${itemId}`;
    console.log(apiUrl);
    const response = apiPost(apiUrl, null);
    console.log(response);
    return response;
};