import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import baseUrl from '../config/baseUrl';
import User from '../../interfaces/User';
import { toast } from 'react-toastify';

// Add Item To Watchlist
export const addItemToWatchlist = async (itemId: number, username: string) => {
  
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
export const removeItemFromWatchlist = async (watchlistId: number, username: number): Promise<IUser> => {
  
    const apiUrl = `/api/watchlist/remove`;
    const payload = { watchlistId, username };
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

        return response.data;

    } catch (error) {
        throw error;
    }

};
