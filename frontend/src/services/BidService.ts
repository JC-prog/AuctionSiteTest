import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import baseUrl from '../config/baseUrl';
import IUser from '../../interfaces/IUser';
import { toast } from 'react-toastify';

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
