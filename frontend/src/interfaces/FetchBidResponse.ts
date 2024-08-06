interface FetchBidResponse {
    id: number;
    bidAmount: number;
    itemId: number;
    itemTitle: string;
    endDate: Date;
    itemStatus: string;
}

export default FetchBidResponse