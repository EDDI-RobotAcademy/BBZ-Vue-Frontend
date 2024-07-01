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
                            <v-text-field
                                v-model="email" label="Email" name="email"
                                prepend-icon="mdi-account"
                                type="text" required
                            ></v-text-field>
                            <v-text-field
                                v-model="password" label="Password" name="password"
                                prepend-icon="mdi-lock"
                                type="password" required
                            ></v-text-field>
                        </v-form>
                    <v-row align="center" justify="center" class="mt-5 mb-5">
                        <v-btn  :style="{ backgroundColor: '#333', color: 'white', borderRadius: '0' }"
                                @click="selflogin">Login</v-btn>
                    </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
                <v-row align="center" justify="center" class="mt-15">
                    <v-col cols="auto">
                        <p>다른 방법으로 로그인  |</p>
                    </v-col>
                    <v-col cols="auto" @click="goToKakaoLogin" style="cursor: pointer;">
                        <img class="icon"
                            :src="require('@/assets/images/fixed/kakao_login.png')"
                            height="50">
                    </v-col>
                </v-row>
    </v-container>
</template>

<script>
import { useStore } from 'vuex'

const authenticationModule = 'authenticationModule'

export default {
    setup () {
        const store = useStore()

        const goToKakaoLogin = async () => {
            await store.dispatch('authenticationModule/requestKakaoOauthRedirectionToDjango')
        }
        const selflogin = async () => {
            // TODO: admin 계정 로그인 구현
        }

        return {
            goToKakaoLogin,
            selflogin
        }
    },
    data () {
        return {
            email: '',
            password: ''
        }
    },
}
</script>

<style scoped>
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
</style>