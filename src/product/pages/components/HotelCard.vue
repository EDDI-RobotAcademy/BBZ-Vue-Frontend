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
              {{ hotel.productPrice }}원
            </v-text>
          </v-col>
        </v-row>
        <v-row>
          <v-card-text style="background-color: #F5F5F5">
            <v-row v-if="hotel.productActivity !== '없음'">
              편의시설 있음
            </v-row>
            <v-row v-else>
              편의시설 없음
            </v-row>
            <v-row v-if="hotel.productDining !== '없음'">
              다이닝 있음
            </v-row>
            <v-row v-else>
              다이닝 없음
            </v-row>
          </v-card-text>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
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
