import KakaoRedirection from "@/authentication/redirection/kakao/KakaoRedirection.vue";

const AuthenticaitonRoutes = [
    {
        path: '/oauth/kakao-access-token',
        name: 'kakaoRedirection',
        component: KakaoRedirection
    },
]

export default AuthenticaitonRoutes

