<template>
  <v-container>
    <h2>BZZ Hotel</h2>
    <router-link :to="{ name: 'ProductRegisterPage' }">
      호텔 등록
    </router-link>
    <v-row v-if="productList.length > 0">
      <v-col v-for="hotel in productList" :key="hotel.productId" 
                cols="4" class="mb-4">
        <HotelCard :hotel="hotel" @show-details="showHotelDetails" />

        <HotelDetailsDialog
          v-model="dialog"
          :hotel="selectedHotel"
          @book-hotel="bookHotel"
          @close-dialog="closeDialog"
        />
      </v-col>
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
    mounted () {
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
    data () {
      return {
        headerTitle: [
          {
            title: 'No',
            align: 'start',
            sortable: true,
            key: 'productId',
          },
          { title: '호텔 이름', align: 'end', key: 'productName' },
          { title: '호텔 가격', align: 'end', key: 'productPrice'},
        ],
        selectedHotel: {},
        dialog: false,
      }
    },
  }
</script>
  
<style scoped>
  .hotel-image {
    width: 100%;
    height: auto;
  }
</style>
  