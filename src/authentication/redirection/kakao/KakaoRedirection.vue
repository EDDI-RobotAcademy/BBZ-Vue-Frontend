<template>
    <div></div>
</template>

<script>
import { mapActions } from 'vuex'

const authenticationModule = 'authenticationModule'
const accountModule = 'accountModule'
const marketingModule = 'marketingModule'

export default {
    methods: {
        ...mapActions(authenticationModule, [
            'requestAccessTokenToDjangoRedirection',
            'requestUserInfoToDjango',
            'requestAddRedisAccessTokenToDjango',
        ]),
        ...mapActions(accountModule, ['requestEmailDuplicationCheckToDjango']),
        ...mapActions(marketingModule, ['requestCreateLogToDjango']),

        async setRedirectData () {
            const code = this.$route.query.code

            await this.requestAccessTokenToDjangoRedirection({ code })
            const userInfo = await this.requestUserInfoToDjango()
            const email = userInfo.kakao_account.email
            console.log('email:', email)

            const isEmailDuplication = 
                await this.requestEmailDuplicationCheckToDjango(email)

            if (isEmailDuplication === true) {
                console.log('기존 가입 고객입니다!')
                const accessToken = localStorage.getItem("accessToken");

                if (accessToken) {
                    await this.requestAddRedisAccessTokenToDjango({ email, accessToken });  // Fix: Pass as object directly
                } else {
                    console.error('AccessToken is missing');
                }

                this.$router.push('/')
            } else {
                console.log('신규 가입 고객입니다!')

                this.$router.push('/account/register')
            }
        }
    },
    async created () {
        await this.setRedirectData()
        const userToken = localStorage.getItem('userToken')
        if (userToken) {
        const logData = {
            userToken: userToken,
            actionType: 'LOGIN',
            actionTime: Date.now()
            }
        this.requestCreateLogToDjango(logData)
        }
    }
}
</script>
