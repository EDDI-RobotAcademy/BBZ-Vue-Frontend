<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>{{ hotel.name }}</v-card-title>
      <!-- <v-card-text>
        <p><b>편의시설:</b> {{ hotel.productActivity }}</p>
        <p><b>다이닝:</b> {{ hotel.productDining }}</p>
        <p><b>가격:</b> {{ hotel.productPrice }}원</p>
      </v-card-text> -->
      <v-row>
        <v-col cols="1"></v-col>
        <v-col cols="4">
          <v-text class="bold-font">편의시설</v-text><br>
          <template v-for="(c, index) in reActivity" :key="index">
            {{ c }}<br>
          </template>
        </v-col>
        <v-col cols="1"></v-col>
        <v-col cols="5">
          <v-text class="bold-font">다이닝</v-text><br>
          <template v-for="(c, index) in reDining" :key="index">
            {{ c }}<br>
          </template>
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="this.isAuthenticated" color="secondary" text @click="shareHotel">
          <v-icon>mdi-share-circle</v-icon>
          <span class="button-text">공유하기</span>
        </v-btn>
        <v-btn v-if="!this.isAuthenticated" color="secondary" text @click="isDialogVisible = true">
          <v-icon>mdi-share-circle</v-icon>
          <span class="button-text">공유하기</span>
        </v-btn>
        <v-btn v-if="this.isAuthenticated" color="secondary" text @click="goToSurveyPage">
          <v-icon>mdi-currency-krw</v-icon>
          <span class="button-text">예약하기</span>
        </v-btn>
        <v-btn v-if="!this.isAuthenticated" color="secondary" text @click="isDialogVisible = true">
          <v-icon>mdi-currency-krw</v-icon>
          <span class="button-text">예약하기</span>
        </v-btn>
        <v-btn v-if="this.isAuthenticated" color="secondary" text @click="favoritesHotel">
          <v-icon>mdi-star-box-multiple</v-icon>
          <span class="button-text">즐겨찾기에 추가</span>
        </v-btn>
        <v-btn v-if="!this.isAuthenticated" color="secondary" text @click="isDialogVisible = true">
          <v-icon>mdi-star-box-multiple</v-icon>
          <span class="button-text">즐겨찾기에 추가</span>
        </v-btn>
        <v-btn color="error" text @click="closeDialog">닫기</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="isDialogVisible" max-width="300">
      <v-card>
        <v-card-title>로그인 오류</v-card-title>
        <v-card-text>로그인 먼저 진행해주세요!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="loginFirst">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex';

const favoritesModule = 'favoritesModule'
const authenticationModule = 'authenticationModule'
const marketingModule = 'marketingModule'

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
      isDialogVisible: false,
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
  computed: {
    ...mapState(authenticationModule, ['isAuthenticated']),
    reActivity: function () {
      return this.hotel.productActivity.split("\n")
    },
    reDining: function () {
      return this.hotel.productDining.split("\n")
    }
  },
  methods: {
    ...mapActions(favoritesModule, ['requestAddFavoritesToDjango']),
    ...mapActions(marketingModule, ['requestCreateLogToDjango']),

    closeDialog() {
      this.$emit('close-dialog');
    },
    async shareHotel() {
      try {
        const userToken = localStorage.getItem('userToken')
        if (userToken) {
          const logData = {
            userToken: userToken,
            actionType: 'BUTTON_REFERRAL',
            actionTime: Date.now()
          }
          await this.requestCreateLogToDjango(logData)
        }

      } catch (error) {
        console.log('공유하기 버튼 누르고나서 에러 발생', error)
        throw error
      }
    },
    goToSurveyPage() {
      console.log('예약하기 버튼 누름')
      try {
        const hotelId = this.hotel.productId
        const hotelName = this.hotel.productName
        console.log('hotelName:', hotelName)
        this.$router.push({ name: 'SurveyRegisterPage', state: { hotelId: hotelId, hotelName: hotelName } })
      } catch (error) {
        console.log('예약하기 버튼 누르고나서 에러 발생:', error)
        throw error
      }
    },
    async favoritesHotel() {
      console.log('즐겨찾기에 추가 버튼 누름')

      const userToken = localStorage.getItem('userToken')
      if (userToken) {
        const logData = {
          userToken: userToken,
          actionType: 'BUTTON_FAVORITE',
          actionTime: Date.now()
        }
        this.requestCreateLogToDjango(logData)
      }
      try {
        const favoritesData = {
          productId: this.hotel.productId,
        }
        await this.requestAddFavoritesToDjango(favoritesData)
        this.$router.push({ name: 'FavoritesListPage' })
      } catch (error) {
        console.log('장바구니 추가 과정에서 에러 발생:', error)
        throw error
      }
    },
    loginFirst() {
      this.isDialogVisible = false
      this.$router.push({ name: 'AccountLoginPage' })
    },
  },
};
</script>

<style scoped>
/* 필요한 스타일을 여기에 추가할 수 있습니다. */
</style>
