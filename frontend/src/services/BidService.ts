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

// Get Bids
export const fetchBids = (username: string | null | undefined) => {
    const apiUrl = `/api/bid/${username}`;

    const response = apiGet(apiUrl);

    return response;
};

// Count Bids
export const countBids = (itemId: string) => {
    const apiUrl = `/api/bid/count-bid/${itemId}`;

    const response = apiGet(apiUrl);

    return response;
}

// Bid Item
export const bidItem = async (itemId: number | null | undefined, username: string | null | undefined, bidAmount: number) => {
    const apiUrl = `/api/bid`
  
    const payload = { itemId, username, bidAmount }
  
    const response = apiPost(apiUrl, payload);

    return response;
};