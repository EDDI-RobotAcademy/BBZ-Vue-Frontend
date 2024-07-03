<template>
    <v-container class="register-container" fill-height>
        <v-row align="center" justify="center">
            <span class="title_text1">R</span>
            <span class="title_text2">egister</span>  
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
                <v-card class="mt-10">
                    <v-card-title align="center" justify="center" class="mt-3">
                        <!-- 글씨 크기 키웠음 -->
                        <h2 class="headline">신규 회원 가입</h2>
                    </v-card-title>
                    <v-card-text class="mt-5">
                        <v-form ref="form" v-model="formValid" lazy-validation>
                            <v-text-field v-model="email" label="Email" required :rules="emailRules" :disabled="true" 
                                            prepend-icon="mdi-account"/>
                            <!-- 닉네임 입력칸/중복검사 버튼 비율 조정 -->
                            <v-row align="center">
                                <v-col cols="9">
                                    <v-text-field v-model="nickname" label="사용하실 닉네임을 입력하세요..." required
                                        :rules="nicknameRules" :error-message="nicknameErrorMessages" 
                                        prepend-icon="mdi-star-four-points"/>
                                </v-col>
                                <v-col cols="3">
                                    <v-btn color="#333" @click="checkNicknameDuplication" class="check-button" small>
                                        중복 검사
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <!-- 이후 버튼 우측으로 밀어놓기 -->
                        <v-spacer></v-spacer>
                        <v-btn color="#333" @click="submitForm" :disabled="!isValidForSubmission">
                            신청하기
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<!-- <template>
    <v-container>
        <v-row align="center" justify="center">
            <v-card>
                <h2>제목</h2>
                <v-card-text>이메일 들고오기</v-card-text>
                <v-row align="center">
                    <v-col cols="10">
                        <v-text-field>닉네임 입력하기</v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-btn>
                            중복검사
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-row>
    </v-container>
</template> -->
<script>
import { mapActions } from 'vuex'

const authenticationModule = 'authenticationModule'
const accountModule = 'accountModule'

export default {
    data() {
        return {
            formValid: false,
            email: '',
            nickname: '',
            emailRules: [
                v => !!v || 'Email 은 필수입니다!',
                v => /.+@.+\..+/.test(v) || '유효한 Email 주소를 입력하세요!'
            ],
            nicknameRules: [v => !!v || 'Nickname은 필수입니다!'],
            nicknameErrorMessage: [],
            isNicknameValid: false,
        }
    },
    async created() {
        await this.requestUserInfo()
    },
    computed: {
        isValidForSubmission() {
            return this.formValid && this.isNicknameValid
        }
    },
    methods: {
        ...mapActions(authenticationModule, [
            'requestUserInfoToDjango',
            'requestAddRedisAccessTokenToDjango'
        ]),
        ...mapActions(accountModule, [
            'requestNicknameDuplicationCheckToDjango',
            'requestCreateNewAccountToDjango',
        ]),
        async requestUserInfo() {
            try {
                const userInfo = await this.requestUserInfoToDjango()
                this.email = userInfo.kakao_account.email
            } catch (error) {
                console.error('에러:', error)
                alert('사용자 정보를 가져오는데 실패하였습니다!')
            }
        },
        async checkNicknameDuplication() {
            console.log('닉네임 중복 검사 눌럿음')

            try {
                const isDuplicate = await this.requestNicknameDuplicationCheckToDjango({
                    newNickname: this.nickname.trim()
                })

                if (isDuplicate) {
                    this.nicknameErrorMessages = ['이 nickname은 이미 사용중입니다!']
                    this.isNicknameValid = false
                } else {
                    this.nicknameErrorMessages = []
                    this.isNicknameValid = true
                }
            } catch (error) {
                alert('닉네임 중복 확인에 실패했습니다!')
                this.isNicknameValid = false
            }
        },
        async submitForm() {
            console.log('신청하기 누름')

            if (this.$refs.form.validate()) {
                const accountInfo = {
                    email: this.email,
                    nickname: this.nickname,
                }

                await this.requestCreateNewAccountToDjango(accountInfo)
                console.log('전송한 데이터:', accountInfo)

                const accessToken = localStorage.getItem("accessToken");
                const email = accountInfo.email
                console.log('register submitForm email:', email)
                await this.requestAddRedisAccessTokenToDjango({ email, accessToken })

                this.$router.push('/')
            }
        }
    }
}
</script>