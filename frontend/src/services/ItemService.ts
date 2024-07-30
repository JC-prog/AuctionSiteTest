import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import IItem from '../interfaces/IItem';

import baseUrl from '../config/baseUrl';

export const fetchItem = async (itemId: string): Promise<IItem> => {
  try {
    const accessToken = Cookies.get('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response: AxiosResponse<IItem> = await baseUrl.get(`/api/item/${itemId}`, {
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

export const fetchItems = async (page: number = 0): Promise<IItem[]> => {
    try {
      const accessToken = Cookies.get('access_token');
      if (!accessToken) {
        throw new Error('No access token found');
      }
  
      const response: AxiosResponse<IItem[]> = await baseUrl.get(`/api/items?page=${page}`, {
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