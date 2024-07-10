<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>분석 Form</v-card-title>
          <v-card-text>숫자만 입력 가능합니다
            <v-form @submit.prevent="submitForm">
              <v-text-field v-model="form.feature1" label="피처1-BUTTON_BOOKNOW" @input="checkInputForm"></v-text-field>
              <v-text-field v-model="form.feature2" label="피처2-BUTTON_FAVORITE" @input="checkInputForm"></v-text-field>
              <v-text-field v-model="form.feature3" label="피처3-LOGIN" @input="checkInputForm"></v-text-field>
              <v-text-field v-model="form.feature4" label="피처4-ORDER" @input="checkInputForm"></v-text-field>
              <v-text-field v-model="form.feature5" label="피처5-REFERRAL" @input="checkInputForm"></v-text-field>
              <v-text-field v-model="form.feature6" label="피처6-VIEW_BOARD_LIST" @input="checkInputForm"></v-text-field>
              <v-text-field v-model="form.feature7" label="피처7-VIEW_HOME" @input="checkInputForm"></v-text-field>
              <v-text-field v-model="form.feature8" label="피처8-VIEW_PRODUCT_LIST" @input="checkInputForm"></v-text-field>
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
          <v-row><v-btn @click="doFit" color="error">이탈 예측모델 학습</v-btn></v-row>
        </v-col>
        <v-row>
          <v-card-text>{{ trainStatus }}</v-card-text>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Data from API</v-card-title>
          <v-card-text>이탈 확률:
            {{prediction}}%
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
        feature1: '',
        feature2: '',
        feature3: '',
        feature4: '',
        feature5: '',
        feature6: '',
        feature7: '',
        feature8: '',
      },
      prediction: null,
      trainStatus: null,
    }
  }, methods: {
    async submitForm() {
      try {
        const {
          feature1,
          feature2,
          feature3,
          feature4,
          feature5,
          feature6,
          feature7,
          feature8,
        } = this.form;
        const response = await axiosInst.fastapiAxiosInst.post(
          'http://localhost:33333/churn-predict', {
          feature1,
          feature2,
          feature3,
          feature4,
          feature5,
          feature6,
          feature7,
          feature8,
        })
        console.log('prediction:', response.data)
        this.prediction = response.data
      } catch (error) {
        alert('모델 학습이 되었는지 확인하세요')
      }
    },
    checkInputForm() {
      if (isNaN(this.form.feature1)) {
        // 숫자가 아닌 경우, 현재 입력값을 제거
        this.form.feature1 = '';
      } else {
        // 숫자인 경우, 음수 여부를 확인하여 음수면 제거
        let num = parseFloat(this.form.feature1);
        if (num < 0) {
          this.form.feature1 = '';
        }
      }
      if (isNaN(this.form.feature2)) {
        this.form.feature2 = '';
      } else {
        let num = parseFloat(this.form.feature2);
        if (num < 0) {
          this.form.feature2 = '';
        }
      }
      if (isNaN(this.form.feature3)) {
        this.form.feature3 = '';
      } else {
        let num = parseFloat(this.form.feature3);
        if (num < 0) {
          this.form.feature3 = '';
        }
      }
      if (isNaN(this.form.feature4)) {
        this.form.feature4 = '';
      } else {
        let num = parseFloat(this.form.feature4);
        if (num < 0) {
          this.form.feature4 = '';
        }
      }
      if (isNaN(this.form.feature5)) {
        this.form.feature5 = '';
      } else {
        let num = parseFloat(this.form.feature5);
        if (num < 0) {
          this.form.feature5 = '';
        }
      }
      if (isNaN(this.form.feature6)) {
        this.form.feature6 = '';
      } else {
        let num = parseFloat(this.form.feature6);
        if (num < 0) {
          this.form.feature6 = '';
        }
      }
      if (isNaN(this.form.feature7)) {
        this.form.feature7 = '';
      } else {
        let num = parseFloat(this.form.feature7);
        if (num < 0) {
          this.form.feature7 = '';
        }
      }
      if (isNaN(this.form.feature8)) {
        this.form.feature8 = '';
      } else {
        let num = parseFloat(this.form.feature8);
        if (num < 0) {
          this.form.feature8 = '';
        }
      }
    },
    
    async doFit() {
      try {
        const response = await axios.get('http://localhost:33333/logistic-regression');
        // console.log(response.data);
        this.trainStatus = '데이터 학습 성공'
      } catch (error) {
        alert('데이터가 있는지 확인하세요')
        console.error('Error:', error);
      }      
    }
  
  }
}
</script>
