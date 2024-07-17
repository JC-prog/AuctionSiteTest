interface IItem {
    itemId: number;
    itemTitle: string;
    itemCategory: string;
    itemCondition: string;
    description: string;
    auctionType: string;
    endDate: Date;
    duration: string;
    currentPrice: number;
    startPrice: number;
  }
  
export default IItem