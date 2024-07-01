import FavoritesListPage from "@/favorites/pages/list/FavoritesListPage.vue";

const FavoritesRoutes = [
    {
        path: '/favorites/list',
        name: 'FavoritesListPage',
        components: {
            default: FavoritesListPage
        },
    },
]

export default FavoritesRoutes