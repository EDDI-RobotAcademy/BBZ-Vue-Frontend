<!-- src/components/HotelCard.vue -->
<template>
  <v-card @click="showDetails">
    <v-card-title>{{ hotel.productName }}</v-card-title>
    <v-card-subtitle>{{ hotel.productLocation }}</v-card-subtitle>
    <v-img :src="getImageUrl(hotel.productImageName)" height="200px"></v-img>
  </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
        <v-card-title>{{ hotel.productName }}</v-card-title>
        <v-card-text>
            <p><b>편의시설</b> : {{ hotel.productActivity }}</p>
            <p><b>다이닝</b> : {{ hotel.productDining }}</p>
            <p><b>가격</b> : {{ hotel.productPrice }}</p>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="bookHotel">예약하기</v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false">닫기</v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: {
    hotel: Object
  },
  methods: {
    showDetails() {
      this.$emit('show-details', this.hotel);
    },
    getImageUrl (imageName) {
      return require('@/assets/images/uploadImages/' + imageName)
    },
  }
}
</script>

<style scoped>
.v-card {
  cursor: pointer;
}
</style>
