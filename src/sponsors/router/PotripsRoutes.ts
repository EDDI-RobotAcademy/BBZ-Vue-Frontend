import PotripsPage from "@/sponsors/pages/PotripsPage.vue";

const PotripsRoutes = [
    {
        path: "/sponsor/potrips",
        name: "PotripsPage",
        component: PotripsPage,
        beforeEnter() {
            window.open("http://192.168.0.46:8080/");
        },
    },
]

export default PotripsRoutes