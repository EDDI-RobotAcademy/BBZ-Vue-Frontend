<!-- src/components/HotelCard.vue -->
<template>
  <v-card @click="showDetails" height="250px" hover="true">
    <!-- 가로 한줄로 엮음 -->
    <v-row rows="12">
      <v-col cols="4" class="text-center">
        <!-- 이미지만 제일 왼쪽으로 보내고 -->
        <!-- 이미지가 상단부에 붙어버리는 상황 발생하는 -->
          <v-img :src="getImageUrl(hotel.productImageName)" height="250px"></v-img>
      </v-col>
      <!-- 이미지 오른쪽에 해당하는 부분 -->
      <v-col>
        <v-row>
          <v-col>
            <v-card-title style="font-weight: bold">{{ hotel.productName }}</v-card-title>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card-subtitle>{{ hotel.productLocation }}</v-card-subtitle>
          </v-col>
          <v-col>

          </v-col>
          <v-col>
            <v-text style="color:red; font-weight:bold">
              가격정보
            </v-text>
          </v-col>
        </v-row>
        <v-row>
          <v-card-text style="background-color: #F5F5F5">
            호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오세부우 정보오호텔 세부우 정보오호텔 세부우 정보오호텔 세부우 정보오
          </v-card-text>
        </v-row>
      </v-col>
    </v-row>
  </v-card>

  <!-- 클릭시 발생하는 다이알로그 부분임...! -->
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
    getImageUrl(imageName) {
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
