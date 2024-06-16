export interface ProductState {
    productList: Product[]
}

export interface Product {
    productId: number
    productName: string
    productLocation: string
    productActivity: string
    productDining: string
    productPrice: number
    productImageName: string
    regDate: string
    updDate: string
}

const state: ProductState = {
    productList: []
}

export default state