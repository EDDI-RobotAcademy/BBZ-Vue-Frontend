export interface OrderState {
    orderList: OrderItem[];
    order: OrderItem | null
}

export interface OrderItem {
    orderId: number;
    cartItemId: number;
    quantity: number;
    price: number;
}

const state: OrderState = {
    orderList: [],
    order: null,
}

export default state
