<template>
    <v-container>
        <v-row align="center" justify="center">
            <h2 class="title_text3">Reservation Form</h2>
        </v-row>
        <v-form @submit.prevent="submitForm">
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="hotelName" label="예약 호텔명" readonly />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-text-field v-model="survey.numOfAdult" label="성인 인원 수" type="number" min="1"
                        required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field v-model="survey.numOfChild" label="미성인 인원 수" type="number" min="0"
                        required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-text-field v-model="survey.haveBreakfast" label="조식 신청 인원 수" type="number" min="0"
                        required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-checkbox v-model="survey.isExistCar" label="차량 여부"></v-checkbox>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="survey.lenOfReservation" label="숙박 일수" type="number" readonly></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="1"></v-col>
                <v-col cols="12" sm="5">
                    <v-date-picker v-model="survey.checkInDate" title="입실 날짜" required
                        @update:modelValue="updateCheckInDate" header="날짜를 선택해주세요."></v-date-picker>
                </v-col>
                <v-col cols="1"></v-col>
                <v-col cols="12" sm="5">
                    <v-date-picker v-model="survey.checkOutDate" title="퇴실 날짜" required :min="survey.checkInDate"
                        @update:modelValue="calculateStayDuration" header="날짜를 선택해주세요."></v-date-picker>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="auto">
                    <v-btn color="primary" @click="submitForm">제출</v-btn>

                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script>
import { ref } from 'vue'
import { mapActions } from 'vuex'

const surveyModule = 'surveyModule'
const orderModule = 'orderModule'
const marketingModule = 'marketingModule'

export default {
    setup() {
        const survey = ref({
            numOfAdult: 1,
            numOfChild: 0,
            haveBreakfast: 0,
            isExistCar: false,
            checkInDate: null,
            checkOutDate: null,
            lenOfReservation: 0
        })

        const updateCheckInDate = (newDate) => {
            survey.value.checkInDate = newDate
            if (survey.value.checkOutDate && new Date(survey.value.checkOutDate) <= new Date(newDate)) {
                survey.value.checkOutDate = null
            }
            calculateStayDuration()
        }

        const calculateStayDuration = () => {
            if (survey.value.checkInDate && survey.value.checkOutDate) {
                const checkIn = new Date(survey.value.checkInDate)
                const checkOut = new Date(survey.value.checkOutDate)
                const diffTime = Math.abs(checkOut - checkIn)
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                survey.value.lenOfReservation = diffDays + 1
            } else {
                survey.value.lenOfReservation = 1
            }
        }

        return {
            survey,
            updateCheckInDate,
            calculateStayDuration,
        }
    },
    data() {
        return {
            hotelId: null,
            hotelName: null,
        }
    },
    created() {
        const hotelId = history.state.hotelId
        const hotelName = history.state.hotelName
        this.hotelId = hotelId
        this.hotelName = hotelName
    },
    methods: {
        ...mapActions(surveyModule, ['requestCreateSurveyToDjango']),
        ...mapActions(orderModule, ['requestCreateOrdersToDjango']),
        ...mapActions(marketingModule, ['requestCreateLogToDjango']),

        async submitForm() {
            console.log("제출 버튼 누름")
      
            const userToken = localStorage.getItem('userToken')
            if (userToken) {
                const logData = {
                    userToken: userToken,
                    actionType: 'ORDER',
                    actionTime: Date.now()
                }
                this.requestCreateLogToDjango(logData)
            }

            const payload = {
                productId: this.hotelId,
                numOfAdult: this.survey.numOfAdult,
                numOfChild: this.survey.numOfChild,
                haveBreakfast: this.survey.haveBreakfast,
                isExistCar: this.survey.isExistCar,
                lenOfReservation: this.survey.lenOfReservation,
            }

            await this.requestCreateSurveyToDjango(payload)

            try {
                const userToken = localStorage.getItem('userToken')
                const productId = this.hotelId
                const data = {
                    userToken,
                    productId
                }
                const response = await this.requestCreateOrdersToDjango(data)
                this.$router.push({ 'name': 'OrderReadPage', params: { orderId: response.toString() } })

            } catch (error) {
                console.error("requestCreateOrdersToDjango() 중 에러 발생", error)
            }
        }
    }
}
</script>