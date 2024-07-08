<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-title>주문 상세 내역 보기</v-card-title>
                    <v-card-text>
                        <v-table v-if="orders">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <td>{{ orders.orders_items.product_name }}</td>
                                <td>{{ orders.orders_items.product_price }}</td>
                            </tbody>
                        </v-table>
                        <v-divider></v-divider>
                        <v-row>
                            <v-col class="text-right">
                                <v-btn color="green" @click="goToBack">돌아가기</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';
const orderModule = 'orderModule'

export default {
    props: {
        orderId: {
            type: Number,
            required: true,
        }
    },
    data() {
        return {
            orders: null,
        };
    },
    methods: {
        ...mapActions("orderModule", ["requestReadOrdersToDjango"]),
        async fetchOrderData() {
            const ordersId = this.orderId
            console.log('OrderReadPage ordersId:', ordersId)

            try {
                const response = await this.requestReadOrdersToDjango({ ordersId })
                this.orders = response
                console.log('ordersItemInfo:', this.orders)
            } catch (error) {
                console.error('주문 내역 확인 중 에러:', error)
            }
        },
        goToBack() {
            this.$router.push('/')
        }
    },
    created() {
        this.fetchOrderData();
    }
};
</script>

<style>
/* 필요한 스타일을 여기에 추가합니다. */
</style>