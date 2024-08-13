import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

// Base URL
import baseUrl from '../config/baseUrl';

// Interface
import Item from '../interfaces/Item';

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
export const fetchItems = async (page: number = 0) => {
    try {
      const accessToken = Cookies.get('access_token');
      if (!accessToken) {
        throw new Error('No access token found');
      }
  
      const response = await baseUrl.get(`/api/item/all?page=${page}`, {
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
export const fetchItemByItemId = async (itemId: string) => {
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
  export const fetchItemsByKeyword = async (keyword: string): Promise<Item[]> => {
    try {
      const accessToken = Cookies.get('access_token');
      if (!accessToken) {
        throw new Error('No access token found');
      }
  
      const response: AxiosResponse<Item[]> = await baseUrl.get(`/api/item/search?keyword=${keyword}`, {
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

    const response: AxiosResponse<Item[]> = await baseUrl.get(`/api/item?page=${page}`, {
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
  
      const response: AxiosResponse<Item[]> = await baseUrl.get(`/api/item?page=${page}`, {
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
export const fetchItemsByUsername = async (username: string | null | undefined): Promise<Item[]> => {
    try {
        const accessToken = Cookies.get('access_token');
        if (!accessToken) {
        throw new Error('No access token found');
        }

        const response: AxiosResponse<Item[]> = await baseUrl.get(`/api/item/seller?sellerName=${username}`, {
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
export const launchItem = async (itemId: number) => {
    
    const apiUrl = `/api/item/launch`;
    const payload = { itemId };
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
export const uploadItemPhoto = (user: string) => {
    const apiUrl = `/api/item/upload-photo`;
    const payload = user;

    return apiPost(apiUrl, payload);
};

// Accept Bid
export const acceptBid = (itemId: number) => {
    const apiUrl = `/api/item/accept-bid/${itemId}`;

    return apiPost(apiUrl, null);
}

// Reject Bid
export const rejectBid = (itemId: number) => {
  const apiUrl = `/api/item/reject-bid/${itemId}`;

  return apiPost(apiUrl, null);
}

// Fetch Items that are in CREATED
export const fetchCreatedItem = (username: string) => {
  const apiUrl = `/api/created-items/${username}`;

  const response = apiGet(apiUrl);

  return response;
};

// Stop Listing
export const stopListing = (itemId: number) => {
    const apiUrl = `/api/item/stop/${itemId}`;
  
    return apiPost(apiUrl, null);
  }