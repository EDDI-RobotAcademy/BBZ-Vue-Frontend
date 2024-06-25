<template>
    <v-container class="register-container" fill-height>
        <v-row align="center" justify="center">
            <v-col cols="12" md="8" lg="6">
                <v-card>
                    <v-card-title>
                        <!-- 글씨 크기 키웠음 -->
                        <h2>
                            <span class="headline">신규 회원 가입</span>
                        </h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="form" v-model="formValid" lazy-validation>
                            <v-text-field
                                    v-model="email"
                                    label="Email"
                                    required
                                    :rules="emailRules"
                                    :disabled="true"/>
                                <!-- 닉네임 입력칸/중복검사 버튼 비율 조정 -->
                            <v-row align="center">
                                <v-col cols="9">
                                    <v-text-field
                                            v-model="nickname"
                                            label="사용하실 닉네임을 입력하세요..."
                                            required
                                            :rules="nicknameRules"
                                            :error-message="nicknameErrorMessages"/>
                                </v-col>
                                <v-col cols="3">
                                    <!-- 색상 노란색으로 변경(추후 수정 가능) -->
                                    <v-btn color="yellow"
                                            @click="checkNicknameDuplication"
                                            class="check-button"
                                            small>
                                        중복 검사
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <!-- 이후 버튼 우측으로 밀어놓기 -->
                        <v-spacer></v-spacer>
                        <v-btn color="primary" 
                                @click="submitForm" 
                                :disabled="!isValidForSubmission">
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
    data () {
        return {
            formValid: false,
            email: '',
            nickname: '',
        }
        
    },
    async checkNicknameDuplication () {
        console.log('닉네임 중복 검사 눌럿음')
    },
    async submitForm () {
        console.log('신청하기 누름')
    },
}
</script>