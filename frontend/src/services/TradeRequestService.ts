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

// Fetch Buyer Trade Request
export const fetchBuyerTradeRequest = (username: string | null | undefined) => {
    const apiUrl = `/api/trade/buyer/${username}`;
    console.log(apiUrl);
    const response = apiGet(apiUrl);
    console.log(response);
    return response;
};

// Fetch Seller Trade Request 
export const fetchSellerTradeRequest = (username: string | null | undefined) => {
    const apiUrl = `/api/trade/buyer/${username}`;
    console.log(apiUrl);
    const response = apiGet(apiUrl);
    console.log(response);
    return response;
};

// Initiate Trade
export const initiateTrade = (buyerItemId: number, buyerName: string | null | undefined, sellerItemId: number | null |  undefined) => {
    const apiUrl = `/api/trade`;
    console.log(apiUrl);

    const payload = { buyerItemId, buyerName, sellerItemId }

    const response = apiPost(apiUrl, payload);
    console.log(response);
    return response;
};

// Accept Trade
export const postAccept = (tradeId: number) => {
    const apiUrl = `/api/trade/accept/${tradeId}`;
    console.log(apiUrl);
    const response = apiPost(apiUrl, null);
    console.log(response);
    return response;
};

// Rejecat Trade
export const postReject = (tradeId: number) => {
    const apiUrl = `/api/trade/reject/${tradeId}`;
    console.log(apiUrl);
    const response = apiPost(apiUrl, null);
    console.log(response);
    return response;
};

