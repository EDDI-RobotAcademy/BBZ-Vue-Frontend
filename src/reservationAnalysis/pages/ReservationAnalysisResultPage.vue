<template>
    <v-container>
        <v-divider></v-divider>
        <h1 style="text-align: center; " class="mb-2">호텔 예약 추천 시스템</h1>
        <v-divider></v-divider>
        <v-form @submit.prevent="submitForm" class="">
            <v-row class="ml-4 mb-5 mr-8">
                <v-col cols="8">
                    <v-slider focused="true" v-model="form.len_of_reservation" min="2" max="15" step="1"
                        thumb-label="always" ticks="always" tick-size="5" label="숙박 일수" class="mt-13"></v-slider>
                </v-col>
                <v-col cols="4">
                    <v-container fluid>
                        <v-radio-group v-model="form.is_exist_car" inline label="차량유무">
                            <v-radio label="O" :value="1"></v-radio>
                            <v-radio label="X" :value="0"></v-radio>
                        </v-radio-group>
                    </v-container>
                </v-col>
            </v-row>
            <v-row class="mt-7 ml-7 mr-8">
                <v-slider focused="true" v-model="form.num_of_adult" min="1" max="10" step="1"
                    thumb-label="always" label="성인 인원"></v-slider>
                <v-slider focused="true" v-model="form.num_of_child" min="0" max="10" step="1"
                    thumb-label="always" label="아동인원"></v-slider>
            </v-row>
            <v-row class="ml-1">
                <v-btn type="submit" color="black" class="ml-8 mb-10 mt-1" large raised>Predict</v-btn>
            </v-row>
        </v-form>
        <v-divider class="mb-7"></v-divider>

        <div if="prediction">
            <p>추천하는 호텔의 번호: {{ prediction }}</p>
            <p>이곳에는 호텔의 카드가 들어갈 예정입니다</p>
        </div>
    </v-container>
</template>

<script>
import axiosInst from "@/utility/axiosInstance"
// import * as d3 from 'd3'

export default {
    data() {
        return {
            form: {
                len_of_reservation: 2,
                num_of_adult: 1,
                num_of_child: 0,
                is_exist_car: 0,
            },
            prediction: null,
        }
    },
    methods: {
        async submitForm() {
            try {
                const {
                    len_of_reservation,
                    num_of_adult,
                    num_of_child,
                    is_exist_car
                } = this.form;

                const response = await axiosInst.fastapiAxiosInst.post(
                    '/reservation-predict', {
                    len_of_reservation,
                    num_of_adult,
                    num_of_child,
                    is_exist_car
                });

                console.log('prediction:', response.data)
                this.prediction = response.data
            } catch (error) {
                alert('서버에서 요청을 처리 할 수 없습니다')
            }
        },
    }
}
</script>