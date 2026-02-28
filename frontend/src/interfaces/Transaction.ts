interface Transaction {
    id: number;
    itemId: number;
    itemTitle: string;
    buyerName: string;
    sellerName: string;
    saleAmount: number;
    status: string;
    transactionTimestamp: Date;
}

export default Transaction