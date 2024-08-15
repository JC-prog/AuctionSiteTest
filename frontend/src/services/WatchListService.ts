import Cookies from 'js-cookie';
import baseUrl from '../config/baseUrl';

const getAuthConfig = () => {
    const token = Cookies.get('access_token');
    if (!token) {
        
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

// Add Item To Watchlist
export const addItemToWatchlist = async ( itemId: number, username: string | null | undefined ) => {
    const apiUrl = `/api/watchlist/add`;

    const payload = { itemId, username };

    const response = apiPost(apiUrl, payload);

    return response;
};

// Remove Item from Watchlist
export const removeItemFromWatchlist = async ( itemId: number, username: string | null | undefined ) => {
  
    const apiUrl = `/api/watchlist/remove`;
    const payload = { itemId, username };
    
    const response = apiPost(apiUrl, payload);

    return response;
};

// Fetche Item from Watchlist
export const fetchItemsFromWatchlist = async ( username: string | null | undefined, page: number = 0, size: number = 10 ) => {
  
    const apiUrl = `/api/watchlist/items/${username}?page=${page}&size=${size}`;

    const response = apiGet(apiUrl);

    return response;
};
