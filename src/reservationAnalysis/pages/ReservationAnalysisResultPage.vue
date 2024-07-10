<template>
    <v-container>
        <v-divider></v-divider>
        <h1 style="text-align: center; " class="mb-2">호텔 예약 추천 시스템</h1>
        <v-divider></v-divider>
        <v-form @submit.prevent="submitForm" class="mt-12">
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
                <v-slider focused="true" v-model="form.num_of_adult" min="1" max="10" step="1" thumb-label="always"
                    label="성인 인원"></v-slider>
                <v-slider focused="true" v-model="form.num_of_child" min="0" max="10" step="1" thumb-label="always"
                    label="아동 인원"></v-slider>
            </v-row>
            <v-row class="ml-1">
                <v-btn type="submit" color="#333333" class="ml-8 mb-10 mt-1" large raised>Predict</v-btn>
            </v-row>
        </v-form>
        <v-divider class="mb-7"></v-divider>

        <div v-if="prediction != null">
            
            <h2 style="text-align: center; justify-self: center;">👍아래 호텔을 추천드립니다!<br/>▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼</h2>
            <v-row v-for="hotel in productList" :key="hotel.productId" cols="12" class="">
                <v-row v-if="hotel.productId === prediction">
                    <v-col cols="12" class="mb-4 mt-10">
                        <HotelCard :hotel="hotel" @show-details="showHotelDetails" />
                        <HotelDetailsDialog v-model="dialog" :hotel="selectedHotel" @book-hotel="bookHotel"
                            @close-dialog="closeDialog" />
                    </v-col>
                </v-row>
            </v-row>
        </div>
    </v-container>
</template>

<script>
import axiosInst from "@/utility/axiosInstance"
import { mapActions, mapState } from "vuex";

import HotelCard from '@/product/pages/components/HotelCard.vue';
import HotelDetailsDialog from '@/product/pages/components/HotelDetailsDialog.vue';
// import * as d3 from 'd3'

const productModule = 'productModule'

export default {
    components: {
        HotelCard,
        HotelDetailsDialog,
    },
    computed: {
        ...mapState(productModule, ['productList']),
    },
    mounted() {
        this.requestProductListToDjango()
    },
    data() {
        return {
            form: {
                len_of_reservation: 2,
                num_of_adult: 1,
                num_of_child: 0,
                is_exist_car: 0,
            },
            prediction: null,
            headerTitle: [
                {
                    title: 'No',
                    align: 'start',
                    sortable: true,
                    key: 'productId',
                },
                { title: '호텔 이름', align: 'end', key: 'productName' },
                { title: '호텔 가격', align: 'end', key: 'productPrice' },
            ],
            selectedHotel: {},
            dialog: false,
        }
    },
    methods: {
        ...mapActions(productModule, ['requestProductListToDjango']),
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
        showHotelDetails(hotel) {
            this.selectedHotel = hotel;
            this.dialog = true;
        },
        bookHotel(hotelId) {
            this.$router.push({ name: 'Booking', params: { hotelId } });
        },
        closeDialog() {
            this.dialog = false;
        },
    },
}
</script>

<style scoped>
.hotel-image {
    width: auto;
    height: auto;
}
</style>