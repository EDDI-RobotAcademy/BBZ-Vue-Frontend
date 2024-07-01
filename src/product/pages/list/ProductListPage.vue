<template>
  <v-container>
    <!-- <h2>BZZ Hotels</h2> -->
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
    <v-row>
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
import HotelCard from '@/product/pages/components/HotelCard.vue';
import HotelDetailsDialog from '@/product/pages/components/HotelDetailsDialog.vue';

import { mapActions, mapState } from 'vuex'

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
  methods: {
    ...mapActions(productModule, ['requestProductListToDjango']),
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
}
</script>

<style scoped>
.hotel-image {
  width: auto;
  height: auto;
}
</style>