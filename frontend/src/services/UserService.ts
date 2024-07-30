import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import IUser from '../interfaces/IUser';

import baseUrl from '../config/baseUrl';

export const fetchUser = async (username: string): Promise<IUser> => {
  try {
    const accessToken = Cookies.get('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response: AxiosResponse<IUser> = await baseUrl.get(`/api/user/${username}`, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUsers = async (page: number = 0): Promise<IUser[]> => {
  try {
    const accessToken = Cookies.get('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response: AxiosResponse<IUser[]> = await baseUrl.get(`/api/user/all?page=${page}`, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};
