import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import baseUrl from '../config/baseUrl';

// Add Item To Watchlist
export const addItemToWatchlist = async ( itemId: number, username: string | null | undefined ) => {
  
    const apiUrl = `/api/watchlist/add`;
    const payload = { itemId, username };
    const config = {
        headers: {
            Authorization: 'Bearer ' + Cookies.get('access_token'),
        },
    };

    try {
        const response: AxiosResponse = await baseUrl.post(apiUrl, payload, config);

        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }

        return response;

    } catch (error) {
        throw error;
    }

};

// Remove Item from Watchlist
export const removeItemFromWatchlist = async ( itemId: number, username: string | null | undefined ) => {
  
    const apiUrl = `/api/watchlist/remove`;
    const payload = { itemId, username };
    const config = {
        headers: {
            Authorization: 'Bearer ' + Cookies.get('access_token'),
        },
    };

    try {
        const response: AxiosResponse = await baseUrl.post(apiUrl, payload, config);

        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }

        return response;

    } catch (error) {
        throw error;
    }
};

// Fetche Item from Watchlist
export const fetchItemsFromWatchlist = async ( username: string | null | undefined ) => {
  
    const apiUrl = `/api/watchlist/items/${username}`;

    const config = {
        headers: {
            Authorization: 'Bearer ' + Cookies.get('access_token'),
        },
    };

    try {
        const response: AxiosResponse = await baseUrl.get(apiUrl, config);

        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }

        return response;

    } catch (error) {
        throw error;
    }

};
