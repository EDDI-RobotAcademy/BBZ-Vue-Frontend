<template>
  <v-container>
    <v-row align="center" justify="center">
      <h2 class="title_text1">Hotel</h2>
      <span class="title_text2">&</span>
      <h2 class="title_text1">Resort</h2>
    </v-row>
    <v-row v-for="hotel in productList" :key="hotel.productId" cols="12" class="mb-4">
      <v-row v-if="productList.length > 0">
        <v-col cols="12" class="mb-4">
          <HotelCard :hotel="hotel" @show-details="showHotelDetails" />
          <HotelDetailsDialog v-model="dialog" :hotel="selectedHotel" @book-hotel="bookHotel"
            @close-dialog="closeDialog" />
        </v-col>
      </v-row>
    </v-row>

    <!-- 하단은 호텔 등록하는 버튼 우측으로 밀어버린 코드 -->
    <v-row v-if="this.isAdmin">
      <v-col cols="10">
      </v-col>
        <v-btn color="pink">
            <router-link :to="{ name: 'ProductRegisterPage' }">
              호텔 등록
            </router-link>
        </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import accountModule from '@/account/store/accountModule';
import HotelCard from '@/product/pages/components/HotelCard.vue';
import HotelDetailsDialog from '@/product/pages/components/HotelDetailsDialog.vue';

import { mapActions, mapState } from 'vuex'

const productModule = 'productModule'
const authenticationModule = 'authenticationModule'
const marketingModule = 'marketingModule'

export default {
  components: {
    HotelCard,
    HotelDetailsDialog,
  },
  computed: {
    ...mapState(productModule, ['productList']),
    ...mapState(authenticationModule, ['isAdmin']),
  },
  mounted() {
    this.requestProductListToDjango()
  },
  methods: {
    ...mapActions(productModule, ['requestProductListToDjango']),
    ...mapActions(marketingModule, ['requestCreateLogToDjango']),

    showHotelDetails(hotel) {
      this.selectedHotel = hotel;
      this.dialog = true;
    },
    bookHotel(hotelId) {
      // 예약 페이지로 이동
      this.$router.push({ name: 'Booking', params: { hotelId } });
    },
    closeDialog() {
      this.dialog = false;
    },
  },
  data() {
    return {
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
  created() {
    const userToken = localStorage.getItem('userToken')
    if (userToken) {
      const logData = {
        userToken: userToken,
        actionType: 'VIEW_PRODUCT_LIST',
        actionTime: Date.now()
      }
      this.requestCreateLogToDjango(logData)
    }
  },
}
</script>

<style scoped>
.hotel-image {
  width: auto;
  height: auto;
}
</style>