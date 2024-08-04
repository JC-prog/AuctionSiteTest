import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';


// Base URL
import baseUrl from '../config/baseUrl';

// Interface
import Item from '../interfaces/IItem';

interface PaginatedResponse {
  content: Item[];
}

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

// Fetch Items
export const fetchItems = async (page: number = 0): Promise<IItem[]> => {
    try {
      const accessToken = Cookies.get('access_token');
      if (!accessToken) {
        throw new Error('No access token found');
      }
  
      const response: AxiosResponse<PaginatedResponse> = await baseUrl.get(`/api/items?page=${page}`, {
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

// Fetch Item by ItemId
export const fetchItemByItemId = async (itemId: string): Promise<Item> => {
    try {
      const accessToken = Cookies.get('access_token');
      if (!accessToken) {
        throw new Error('No access token found');
      }
  
      const response: AxiosResponse<Item> = await baseUrl.get(`/api/item/${itemId}`, {
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

  // Fetch Items By Keyword
  export const fetchItemsByKeyword = async (keyword: string, page: number = 0): Promise<Item[]> => {
    try {
      const accessToken = Cookies.get('access_token');
      if (!accessToken) {
        throw new Error('No access token found');
      }
  
      const response: AxiosResponse<Item[]> = await baseUrl.get(`/api/items/search?keyword=${keyword}`, {
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

// Fetch Items from Category
export const fetchItemsByCategory = async (page: number = 0): Promise<Item[]> => {
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

// Fetch Recent Items
export const fetchItemsByEndDate = async (page: number = 0): Promise<Item[]> => {
    try {
      const accessToken = Cookies.get('access_token');
      if (!accessToken) {
        throw new Error('No access token found');
      }
  
      const response: AxiosResponse<Item[]> = await baseUrl.get(`/api/items?page=${page}`, {
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

// Fetch Items By User
export const fetchItemsByUsername = async (username: string, page: number = 0): Promise<IItem[]> => {
    try {
        const accessToken = Cookies.get('access_token');
        if (!accessToken) {
        throw new Error('No access token found');
        }

        const response: AxiosResponse<Item[]> = await baseUrl.get(`/api/items/seller?sellerName=${username}`, {
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

// Launch Item
export const launchItem = async (itemId: number): Promise<Item[]> => {
    
    const apiUrl = `/api/item/launch`;
    const payload = { itemId };
    const config = {
        headers: {
            Authorization: 'Bearer ' + Cookies.get('access_token'),
        },
    };
    
    try {
        const response: AxiosResponse<Item[]> = await baseUrl.post(apiUrl, payload, config);

        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }

        return response.data;

    } catch (error) {
        throw error;
    }
};

// Create Item
export const createItem = async (item: Item): Promise<Item[]> => {
    
    const apiUrl = `/api/item/create`;
    const payload = { item };
    const config = {
        headers: {
            Authorization: 'Bearer ' + Cookies.get('access_token'),
        },
    };
    
    try {
        const response: AxiosResponse<Item[]> = await baseUrl.post(apiUrl, payload, config);

        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }

        return response.data;

    } catch (error) {
        throw error;
    }
};

// Upload Item Image
export const uploadUserPhoto = (user: string) => {
    const apiUrl = `/api/item/upload-photo`;
    const payload = user;

    return apiPost(apiUrl, payload);
};