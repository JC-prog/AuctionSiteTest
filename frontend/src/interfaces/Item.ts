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
    minSellPrice: number;
    currentPrice: number;
    startPrice: number;
    itemPhoto: string | ArrayBuffer | null | Uint8Array;
    status: string;
  }
  
export default Item