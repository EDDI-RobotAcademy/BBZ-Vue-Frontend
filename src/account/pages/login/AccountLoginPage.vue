<template>
    <v-container fluid fill-height class="mt-15">
        <v-row align="center" justify="center">
            <span class="title_text1">S</span>
            <span class="title_text2">IGN &nbsp;</span>
            <span class="title_text1">I</span>
            <span class="title_text2">N</span>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
                <v-card>
                    <v-card-text>
                        <v-form>
                            <v-text-field v-model="email" label="Email" name="email" prepend-icon="mdi-account"
                                type="text" required></v-text-field>
                            <v-text-field v-model="password" label="Password" name="password" prepend-icon="mdi-lock"
                                type="password" required></v-text-field>
                        </v-form>
                        <v-row align="center" justify="center" class="mt-5 mb-5">
                            <v-btn :style="{ backgroundColor: '#333', color: 'white', borderRadius: '0' }"
                                @click="adminLogin">Login</v-btn>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row align="center" justify="center" class="mt-15">
            <v-col cols="auto">
                <p>다른 방법으로 로그인 |</p>
            </v-col>
            <v-col cols="auto" @click="goToKakaoLogin" style="cursor: pointer;">
                <img class="icon" :src="require('@/assets/images/fixed/kakao_login.png')" height="50">
            </v-col>
        </v-row>
    </v-container>
    <v-dialog v-model="isDialogVisible" max-width="350">
        <v-card>
            <v-card-title>로그인 오류</v-card-title>
            <v-card-text>아이디 또는 비밀번호가 잘못되었습니다!</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="isDialogVisible = false">OK</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions, useStore } from 'vuex'

const accountModule = 'accountModule'
const authenticationModule = 'authenticationModule'

export default {
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        hotel: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            email: '',
            password: '',
            dialog: this.value,
            isDialogVisible: false,
        }
    },
    watch: {
        value(val) {
            this.dialog = val;
        },
        dialog(val) {
            this.$emit('input', val);
        },
    },
    setup() {
        const store = useStore()

        const goToKakaoLogin = async () => {
            await store.dispatch('authenticationModule/requestKakaoOauthRedirectionToDjango')
        }

        return {
            goToKakaoLogin,
        }
    },
    methods: {
        ...mapActions(accountModule, ['requestAdminLoginToDjango']),
        async adminLogin() {
            const loginData = {
                email: this.email,
                password: this.password
            }
            const response = await this.requestAdminLoginToDjango(loginData)
            if (response.isAdmin) {
                this.$store.state.authenticationModule.isAdmin = true
                this.$router.push('/')
            } else {
                this.isDialogVisible = true
            }
        }
    },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Gloock&display=swap');

.login_icons {
    margin-top: 20px;
}

.icons {
    cursor: pointer;
}

.title_text1 {
    text-align: center;
    font-size: 100px;
    font-family: 'Gloock';
    color: #333;
}

.title_text2 {
    text-align: center;
    margin-top: 10px;
    font-size: 90px;
    font-family: 'Gloock';
    color: #333;
}

.title_text3 {
    text-align: center;
    margin-top: 10px;
    font-size: 80px;
    font-family: 'Gloock';
    color: #333;
}

.bold-font {
    font-weight: bolder;
    font-size: 20px;
}
</style>