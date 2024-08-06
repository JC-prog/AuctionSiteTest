import React, { useEffect, useState } from 'react';
import UserItemBidsList from '../Components/List/UserItemBidsList';
import { AxiosResponse } from 'axios';
import FetchBidResponse from '../interfaces/FetchBidResponse';
import { fetchBids } from '../services/BidService';

interface AuthProps {
    isAuth: boolean;
    user: string;
}

const MyBidsPage: React.FC<AuthProps> = ({ isAuth, user }) => {
    const [bids, setBids] = useState<FetchBidResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchUserBids = async () => {
            try {
                const response: AxiosResponse<FetchBidResponse[]> = await fetchBids(user);

                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }

                console.log(response.data); // Log the response data
                setBids(response.data);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserBids();
    }, [user]); // Add 'user' to dependency array

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <UserItemBidsList listTitle="My Bids" bids={bids} />
        </div>
    );
};

export default MyBidsPage;
