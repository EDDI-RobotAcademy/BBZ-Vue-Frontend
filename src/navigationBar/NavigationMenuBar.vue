<template>
    <v-app-bar color="#333" app dark height="64">
        <v-btn @click="goToHome">
            <v-toolbar-title class="text-uppercase text--darken-4">
                <span class="hero-content">Walkerhill</span>
            </v-toolbar-title>
        </v-btn>
        <v-spacer></v-spacer>

        <v-menu close-on-content-click>
            <template v-slot:activator="{ props }">
                <v-btn v-if="isAuthenticated" v-bind="props">
                    <v-icon left> mdi-account</v-icon>
                    <b>회원 메뉴</b>
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="(item, index) in items" :key="index" @click="item.action">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <v-btn v-if="isAdmin" text @click="goToChurnAnalysis" class="btn-text">
            <v-icon left>mdi-file-find</v-icon>
            <span>이탈율 예측</span>
        </v-btn>

        <v-btn text @click="goToProductList" class="btn-text">
            <v-icon left>mdi-bed</v-icon>
            <span>호텔 예약</span>
        </v-btn>
        <v-btn text @click="goToBoardList" class="btn-text">
            <v-icon left>mdi-forum</v-icon>
            <span>게시판</span>
        </v-btn>
        <v-btn v-if="!isAuthenticated && !isAdmin" text @click="signIn" class="btn-text">
            <v-icon left>mdi-login</v-icon>
            <span>로그인</span>
        </v-btn>
        <v-btn v-else text @click="signOut" class="btn-text">
            <v-icon left>mdi-logout</v-icon>
            <span>로그아웃</span>
        </v-btn>
    </v-app-bar>
</template>

<script>
import '@mdi/font/css/materialdesignicons.css'
import router from '@/router'
import { mapActions, mapState } from 'vuex';

const authenticationModule = 'authenticationModule'

export default {
    data() {
        return {
            navigation_drawer: false,
            accessToken: null,
            isLogin: !!localStorage.getItem("userToken"),
            items: [
                { title: '찜목록', action: () => { router.push('/favorites/list') } },
                { title: 'AI호텔추천', action: () => { router.push('/reservation-analysis-result') } },
            ]
        }
    },
    computed: {
        ...mapState(authenticationModule, ['isAuthenticated', 'isAdmin']),
    },
    methods: {
        ...mapActions(authenticationModule, ['requestLogoutToDjango']),
        goToHome() {
            router.push('/')
        },
        goToProductList() {
            router.push('/product/list')
        },
        goToBoardList() {
            router.push('/board/list')
        },
        goToChurnAnalysis() {
            router.push('/customer-churn-analysis')
        },
        signIn() {
            router.push('/account/login')
        },
        signOut() {
            if (this.$store.state.authenticationModule.isAdmin) {
                this.$store.state.authenticationModule.isAdmin = false
            } else {
                this.requestLogoutToDjango()
            }
            router.push('/')
        }
    },
    mounted() {
        console.log('navigation bar mounted()')

        const userToken = localStorage.getItem("userToken")

        if (userToken) {
            console.log('You already has a userToken!!!')

            this.$store.state.authenticationModule.isAuthenticated = true
        }

        if (this.$store.state.authenticationModule.isAdmin) {
            this.isAdmin = true
        }
        console.log("isAdmin:", this.isAdmin)
    }
}
</script>