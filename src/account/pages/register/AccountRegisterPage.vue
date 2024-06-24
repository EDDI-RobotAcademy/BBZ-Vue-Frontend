<template>
    <v-container class="register-container" fill-height>
        <v-row align="center" justify="center">
            <v-col cols="12" md="8" lg="6">
                <v-card>
                    <v-card-title>
                        <span class="headline">신규 회원 신청</span>
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="form" v-model="formValid" lazy-validation>
                            <v-text-field
                                    v-model="email"
                                    label="Email"
                                    required
                                    :rules="emailRules"
                                    :disabled="true"/>
                            <v-row align="center">
                                <v-col cols="10">
                                    <v-text-field
                                            v-model="nickname"
                                            label="Nickname"
                                            required
                                            :rules="nicknameRules"
                                            :error-message="nicknameErrorMessages"/>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn color="primary"
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