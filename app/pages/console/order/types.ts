// types/order.ts
export interface Order {
    orderNo: string;
    createdAt: string;
    productName: string;
    billingMethod: string;
    orderType: string;
    status: 'paid' | 'unpaid' | 'cancelled' | 'refunded';
    amount: number;
}