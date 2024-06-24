<template>
    <v-app-bar color="orange" app dark height="64">
        <v-btn @click="goToHome">
            <v-toolbar-title class="text-uppercase text--darken-4">
                <span>BBZ Hotel</span>
            </v-toolbar-title>
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn text @click="goToProductList" class="btn-text">
            <v-icon left>mdi-bed</v-icon>
            <span>호텔 예약</span>
        </v-btn>
        <v-btn text @click="goToBoardList" class="btn-text">
            <v-icon left>mdi-forum</v-icon>
            <span>게시판</span>
        </v-btn>
        <v-btn v-if="!isLogin" text @click="signIn" class="btn-text">
            <v-icon left>mdi-login</v-icon>
            <span>로그인</span>
        </v-btn>
    </v-app-bar>
</template>

<script>
import '@mdi/font/css/materialdesignicons.css'
import router from '@/router'

export default {
    data() {
        return {
            navigation_drawer: false,
            accessToken: null,
            isLogin: false,
        }
    },
    methods: {
        goToHome() {
            router.push('/')
        },
        goToProductList() {
            router.push('/product/list')
        },
        goToBoardList() {
            router.push('/board/list')
        },
        signIn() {
            router.push('/account/login')
        },
    },
}
</script>