import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

// Base URL
import baseUrl from '../config/baseUrl';

// Interface
import Item from '../interfaces/Item';

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
export const fetchItemByItemId = async (itemId: number) => {
    const apiUrl = `/api/item/${itemId}`;

    const response = apiGet(apiUrl);
    console.log(response);
    return response;
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

// Fetch List Items By User
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
export const fetchCreatedItem = (username: string | null | undefined) => {
  const apiUrl = `/api/item/created/${username}`;

  const response = apiGet(apiUrl);

  return response;
};

// Fetch Items that are is Up for Trade
export const fetchTradeItem = (username: string | null | undefined, page: number = 0, size: number = 10) => {
    const apiUrl = `/api/item/trade?username=${username}&page=${page}&size=${size}`;
  
    const response = apiGet(apiUrl);
  
    return response;
  };


// Fetch User Items
export const fetchUserItemsByStatus = (username: string | null | undefined, status: string, page: number = 0, size: number = 10) => {
    const apiUrl = `/api/item/${status.toLowerCase()}/${username}?page=${page}&size=${size}`;

    const response = apiGet(apiUrl);

    return response;
};

// Stop Listing
export const stopListing = (itemId: number) => {
    const apiUrl = `/api/item/stop/${itemId}`;
  
    return apiPost(apiUrl, null);
  }

// Get Top 10 Items
export const fetchTopTenItems = (username: string | null | undefined) => {
    const apiUrl = `/api/item/top10/${username}`;

    const response = apiGet(apiUrl);

    return response;

}

export const fetchItemsByCategory = async (username: string | null | undefined, category: string) => {

  let apiUrl: string;

  if (username === null || username === undefined) {
      apiUrl = `/api/item/category?name=${category}`;
  } else {
      apiUrl = `/api/item/${category}/exclude/${username}`;
  }

  const response = await apiGet(apiUrl);

  return response;
};

// Fetch Items Search from Keyword
export const fetchItemsByKeyword = async (sellername: string | null | undefined, keyword: string | null, page: number = 0, size: number = 20) => {
    const apiUrl = `/api/item/search?sellerName=${sellername}&keyword=${keyword}&page=${page}&size=${size}`

    const response = apiGet(apiUrl);

    return response;
};