export interface FavoritesItem {
    productId: number;
}

export interface FavoritesState {
    favoritesItemList: FavoritesItem[];
}

const state: FavoritesState = {
    favoritesItemList: []
}

export default state



