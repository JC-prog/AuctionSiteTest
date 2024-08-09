interface Item {
    itemId: number;
    itemTitle: string;
    itemCategory: string;
    itemCondition: string;
    description: string;
    sellerName: string | null | undefined ;
    auctionType: string;
    endDate: Date;
    duration: string;
    bidWinner: string;
    currentPrice: number;
    startPrice: number;
    itemPhoto: string | ArrayBuffer | null;
    status: string;
  }
  
export default Item