<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>분석 Form</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitForm">
              <v-text-field v-model="form.num_of_adult" label="인풋 피처 1"></v-text-field>
              <v-text-field v-model="form.num_of_child" label="인풋 피처 2"></v-text-field>
              <v-text-field v-model="form.have_breakfast" label="인풋 피처 3"></v-text-field>
              <v-text-field v-model="form.is_exist_car" label="인풋 피처 4"></v-text-field>
              <v-checkbox v-model="form.len_of_reservation" label="인풋 피처 5"></v-checkbox>
              <v-btn type="submit" color="primary">결과 확인</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card v-if="receivedData">
          <v-card-title>Received Data</v-card-title>
          <v-card-text>
            <pre>{{ receivedData }}</pre>
          </v-card-text>
        </v-card>
        <v-col>
          <v-row>현재 보유 데이터 n건</v-row>
          <div style="margin-bottom: 25px;"></div> <!-- 여백 -->
          <v-row><v-btn color="error">이탈 예측모델 학습</v-btn></v-row>
        </v-col>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Data from API</v-card-title>
          <v-card-text>이탈 확률:
            {{prediction}}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import axios from 'axios';
import axiosInst from "@/utility/axiosInstance"
import { TrackOpTypes } from 'vue';


export default {
  data() {
    return {
      form: {
        num_of_adult: 1,
        num_of_child: 0,
        have_breakfast: 1,
        is_exist_car: 0,
        len_of_reservation: 13,
      },
      prediction: null,
    }
  }, methods: {
    async submitForm() {
      try {
        const {
          num_of_adult,
          num_of_child,
          have_breakfast,
          is_exist_car,
          len_of_reservation,
        } = this.form;
        const response = await axiosInst.fastapiAxiosInst.post(
          'http://localhost:33333/churn-predict', {
          num_of_adult,
          num_of_child,
          have_breakfast,
          is_exist_car,
          len_of_reservation
        })
        console.log('prediction:', response.data)
        this.prediction = response.data
      } catch (error) {
        alert('서버에서 요청을 처리 할 수 없습니다')
      }
    },
  }
}
</script>
