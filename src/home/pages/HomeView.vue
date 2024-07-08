<template>
  <v-container class="hero">
    <div class="hero-content">
      <h1>WALKERHILL</h1>
      <p><br><i>Inspiring Sense & Touching Place</i></p>
    </div>
  </v-container>

  <v-container class="about">
    <v-row>
      <v-col cols="12" md="8" offset-md="2" class="about-content pa-10 text-center">
        <h2>About WALKERHILL</h2>
        |
        <p><i>"Inspiring Sense & Touching Place"</i><br><br>
          워커힐 호텔앤리조트는 여행 속 고객이 원하는 Moment 중심으로 다양한 경험이 가득한 HOTEL이 되겠습니다.<br>
          자연과 감동 서비스로 고객이 머무는 동안 즐거움, 편안함, 행복함을 느낄 수 있도록 기대 넘는 가치를 약속합니다."</p>
      </v-col>
    </v-row>
  </v-container>
  <v-container class="hotels">
    <v-row align="center" justify="center" class="pa-10 ml-5 mr-5">
      <v-col cols="12" sm="6" md="8" lg="4" v-for="hotel in this.hotelList" :key="hotel">
        <!-- TODO: v-card 1:1비율로 고정하기 -->
        <v-card>
          <v-img cover :src="getImageUrl(hotel.imageUrl)" height="225px">
            <!-- TODO: hover 기능 구현(마우스 입력 시 호텔 이름 노출) -->
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-img :src="getImageUrl(`potrips.png`)" height="200px" @click="toSponsor"></v-img>
    </v-row>
  </v-container>

  <v-container class="trigger" align="center">
    <v-btn size="x-large" color="#a68a64" @click="goToHotelList">Book Now</v-btn>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
const marketingModule = 'marketingModule'

export default {
  methods: {
    ...mapActions(marketingModule, ['requestCreateLogToDjango']),
    toSponsor() {
      console.log('toSponsor()')
      this.$router.push('/sponsor/potrips')
    },
    getImageUrl(imageName) {
      return require('@/assets/images/fixed/' + imageName)
    },
    async goToHotelList() {
      const userToken = localStorage.getItem('userToken')
      if (userToken) {
        const logData = {
          userToken: userToken,
          actionType: 'ORDER',
          actionTime: Date.now()
        }
        await this.requestCreateLogToDjango(logData)
      }

      this.$router.push({ name: 'ProductListPage' })
    }
  },
  data() {
    return {
      hotelList: [
        { id: 1, name: 'Photo 1', imageUrl: 'hotel1.jpeg' },
        { id: 2, name: 'Photo 2', imageUrl: 'hotel2.jpeg' },
        { id: 3, name: 'Photo 3', imageUrl: 'hotel3.jpeg' },
        { id: 4, name: 'Photo 4', imageUrl: 'hotel4.jpeg' },
        { id: 5, name: 'Photo 5', imageUrl: 'hotel5.jpeg' },
        { id: 6, name: 'Photo 6', imageUrl: 'hotel6.jpeg' },
      ],
      hoveredHotelId: null,
    }
  },
  created() {
    const userToken = localStorage.getItem('userToken')
    if (userToken) {
      const logData = {
        userToken: userToken,
        actionType: 'VIEW_HOME',
        actionTime: Date.now()
      }
      this.requestCreateLogToDjango(logData)
    }
  }
}
</script>

<style>
/* 구글 폰트 임포트 */
@import url('https://fonts.googleapis.com/css2?family=Taviraj:wght@400;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Hahmlet:wght@100..900&family=Taviraj:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
);
@import url('https://fonts.googleapis.com/css2?family=Gloock&display=swap');



body {
  font-family: 'Hahmlet', sans-serif;
  font-weight: 300;
  color: #f2f2f2;
  background-color: #333;
  margin: 0;
  padding: 0;
}

.hero {
  height: 60vh;
  display: flex;
  background-image: url('@/assets/images/fixed/hotel_main.png');
  background-size: cover;
  background-position: center;

  justify-content: center;
  align-items: center;
  text-align: center;

  color: #f2f2f2d4;
  text-shadow: 0px 0px 20px #000000;
  font-size: 130%;
}


.hero-content h1 {
  font-family: 'Gloock', serif;
  font-weight: 800;
  font-size: 70px;
  letter-spacing: 0.75rem;
  color: #333333d4;
  text-shadow: 0px 0px 20px #e0e1e5;
}

.about {
  padding: 4rem 2rem;
}

.trigger {
  padding: 4rem 2rem;
}
</style>
