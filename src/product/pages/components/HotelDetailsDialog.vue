<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>{{ hotel.name }}</v-card-title>
      <v-card-text>
        <p><b>편의시설:</b> {{ hotel.productActivity }}</p>
        <p><b>다이닝:</b> {{ hotel.productDining }}</p>
        <p><b>가격:</b> {{ hotel.productPrice }}</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="bookHotel">
          <v-icon>mdi-currency-krw</v-icon>
          <span class="button-text">예약하기</span>
        </v-btn>
        <v-btn colo="secondary" text @click="favoritesHotel">
          <v-icon>mdi-star-box-multiple</v-icon>
          <span class="button-text">즐겨찾기에 추가</span>
        </v-btn>
        <v-btn color="error" text @click="closeDialog">닫기</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

const favoritesModule = 'favoritesModule'

export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    hotel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialog: this.value,
    };
  },
  watch: {
    value(val) {
      this.dialog = val;
    },
    dialog(val) {
      this.$emit('input', val);
    },
  },
  methods: {
    ...mapActions(favoritesModule, ['requestAddFavoritesToDjango']),
    closeDialog() {
      this.$emit('close-dialog');
    },
    bookHotel() {
      console.log('예약하기 버튼 누름')
    },
    async favoritesHotel() {
      console.log('즐겨찾기에 추가 버튼 누름')
      try {
        const favoritesData = {
          productId: this.hotel.productId,
        }
        await this.requestAddFavoritesToDjango(favoritesData)
        // this.$router.push({ name: 'FavoritesListPage' })
      } catch (error) {
        console.log('장바구니 추가 과정에서 에러 발생:', error)
        throw error
      }
    }
  },
};
</script>

<style scoped>
/* 필요한 스타일을 여기에 추가할 수 있습니다. */
</style>
