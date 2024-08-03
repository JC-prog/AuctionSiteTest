import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import baseUrl from '../config/baseUrl';
import IUser from '../../interfaces/IUser';
import { toast } from 'react-toastify';

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

// Get Bids
export const fetchBids = (username: string) => {
    const apiUrl = `/api/bids/${username}`;

    const response = apiGet(apiUrl);

    return response;
};

export const bidItem = async (itemId: string): Promise<IUser> => {
  try {
    const accessToken = Cookies.get('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response: AxiosResponse<IUser> = await baseUrl.post(
      `/api/item/bid`,
      { itemId }, 
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    );

    if (response.status === 200) {
      await toast.success('Bid Successful!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else {
      toast.error('Bid Failed. Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};
