import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import baseUrl from '../config/baseUrl';
import User from '../interfaces/User'
import { toast } from 'react-toastify';

export const suspendUser = async (username: string | null | undefined): Promise<User> => {
  try {
    const accessToken = Cookies.get('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response: AxiosResponse<User> = await baseUrl.post(
      `/api/user/suspend`,
      { username }, 
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    );

    if (response.status === 200) {
      await toast.success('User Suspension Successful!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else {
      toast.error('Failed to suspend user. Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const activateUser = async (username: string | null | undefined): Promise<User> => {
  try {
    const accessToken = Cookies.get('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response: AxiosResponse<User> = await baseUrl.post(
      `/api/user/activate`,
      { username }, 
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    );

    if (response.status === 200) {
      await toast.success('User Activation Successful!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else {
      toast.error('Failed to activate user. Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const suspendItem = async (itemId: number): Promise<User> => {
  try {
    const accessToken = Cookies.get('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response: AxiosResponse<User> = await baseUrl.post(
      `/api/item/suspend`,
      { itemId }, 
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    );

    if (response.status === 200) {
      await toast.success('Item Suspension Successful!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else {
      toast.error('Failed to suspend item. Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const activateItem = async (itemId: number): Promise<User> => {
  try {
    const accessToken = Cookies.get('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response: AxiosResponse<User> = await baseUrl.post(
      `/api/item/activate`,
      { itemId }, 
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    );

    if (response.status === 200) {
      await toast.success('User Activation Successful!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else {
      toast.error('Failed to activate user. Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};