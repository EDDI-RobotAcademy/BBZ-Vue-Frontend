<template>
    <v-container>
        <v-form @submit.prevent="submitForm">
            <v-text-field label="쑥빡일쑤" v-model="form.len_of_reservation" type="number" />
            <v-text-field label="으른 개쑤" v-model="form.num_of_adult" type="number" />
            <v-text-field label="애들 개쑤" v-model="form.num_of_child" type="number" />
            <v-text-field label="오빠 차 있어?" v-model="form.is_exist_car" type="number" />

            <v-btn type="submit" color="primary">Predict</v-btn>
        </v-form>

        <div if="prediction">
            <p>추천하는 호텔의 번호: {{ prediction }}</p>
            
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
                len_of_reservation: 1,
                num_of_adult: 0,
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
                    'http://localhost:33333/reservation-predict', {
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