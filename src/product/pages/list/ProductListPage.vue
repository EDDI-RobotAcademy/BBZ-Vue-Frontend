<template>
  <v-container>
    <h2>BZZ Hotel</h2>
    <router-link :to="{ name: 'ProductRegisterPage' }">
      호텔 등록
    </router-link>
    <v-row v-if="productList.length > 0">
      <v-col v-for="hotel in productList" :key="hotel.productId" cols="12" class="mb-4">
        <v-card>
          <v-card-title>{{ hotel.productName }}</v-card-title>
          <v-card-subtitle>{{ hotel.productLocation }}</v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="4">
                <v-img :src="getImageUrl(hotel.productImageName)" aspect-ratio="1" class="grey lighten-2">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"/>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
              <v-col cols="8">
                <p>{{ hotel.productActivity }}</p>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
              <v-row class="ml-1">{{ hotel.productPrice }}원</v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" class="text-center">
        <v-alert type="info">등록된 호텔이 없습니다!</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script>

import { mapActions, mapState } from 'vuex'

const productModule = 'productModule'

export default {
    computed: {
      ...mapState(productModule, ['productList']),
    },
    mounted () {
      this.requestProductListToDjango()
    },
    methods: {
      ...mapActions(productModule, ['requestProductListToDjango']),
      getImageUrl (imageName) {
            return require('@/assets/images/uploadImages/' + imageName)
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
        ]
      }
    }
  }
</script>
  
<style scoped>
  .hotel-image {
    width: 100%;
    height: auto;
  }
</style>
  