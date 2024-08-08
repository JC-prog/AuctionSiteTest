export default interface TradeRequest {
    id: number;
    buyername: string;
    buyerItemId: number;
    buyerItemTitle: string;
    sellerName: string;
    sellerItemId: string;
    sellerItemTitle: string;
    status: string;
    timestamp: Date;
  }
  