<template>
  <section class="hero">
    <div class="hero-content">
      <h1>WALKERHILL</h1>
      <p>Inspiring Sense & Touching Place</p>
    </div>
  </section>

  <section class="about">
    <v-container>
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
  </section>

  <section class="hotels">
    <v-container class="pa-4 text-center">
      <v-row class="fill-height" align="center" justify="center">
          <v-col v-for="hotel in this.hotelList" :key="hotel" cols="4" class="mb-4">
            <v-hover v-slot="{ hover }">
            <!-- TODO: v-card 1:1비율로 고정하기 -->
            <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
              <v-img cover :src="getImageUrl(hotel.imageUrl)" height="225px">
                <!-- TODO: hover 기능 구현(마우스 입력 시 호텔 이름 노출) -->
              </v-img>
            </v-card>
            </v-hover>
          </v-col>
      </v-row>
    </v-container>
  </section>

  <section class="trigger">
    <v-container align="center">
      <v-btn size="x-large" 
              color="#a68a64">Book Now</v-btn>
    </v-container>
  </section>

</template>

<script>
export default {  
  methods: {
    getImageUrl (imageName) {
      return require('@/assets/images/fixed/' + imageName)
    },
  },
  data () {
    return {
      hotelList: [
        { id: 1, name: 'Photo 1', imageUrl: 'mario.png' },
        { id: 2, name: 'Photo 2', imageUrl: 'mario.png' },
        { id: 3, name: 'Photo 3', imageUrl: 'mario.png' },
        { id: 4, name: 'Photo 4', imageUrl: 'mario.png' },
        { id: 5, name: 'Photo 5', imageUrl: 'mario.png' },
        { id: 6, name: 'Photo 6', imageUrl: 'mario.png' },
      ],
      hoveredHotelId: null,
    }
  },
}
</script>

<style>
/* 구글 폰트 임포트 */
@import url( 
  'https://fonts.googleapis.com/css2?family=Taviraj:wght@400;800&display=swap',
  'https://fonts.googleapis.com/css2?family=Hahmlet:wght@100..900&family=Taviraj:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
  );


body {
  font-family: 'Hahmlet', sans-serif;
  font-weight: 400;
  color: #f2f2f2;
  background-color: #333;
  margin: 0;
  padding: 0;
}

.hero {
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/images/fixed/mario.png');
  background-size: cover;
  background-position: center;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  padding: 2rem;
  font-family: 'Taviraj', serif;
  color: #f2f2f2;
  text-shadow: 0px 0px 20px #000000;
}

.hero-content h1 {
  font-weight: 800;
  color: #333;
  text-shadow: 0px 0px 20px #f2f2f2;
}

.about {
  padding: 4rem 2rem;
}

.trigger {
  padding: 4rem 2rem;
}

</style>
