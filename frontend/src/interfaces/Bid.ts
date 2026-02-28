interface Bid {
    id: number;
    bidderName: string;
    itemId: number;
    bidAmount: number;
    bidTimestamp: Date;
}

export default Bid