export interface OrderState {
    orderList: OrderItem[];
    order: OrderItem | null
}

export interface OrderItem {
    productId: number
}

const state: OrderState = {
    orderList: [],
    order: null,
}

export default state
