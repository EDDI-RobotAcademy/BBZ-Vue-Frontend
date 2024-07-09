<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>분석 Form</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="submitForm">
                <v-text-field v-model="formData.input_feature_1" label="인풋 피처 1"></v-text-field>
                <v-text-field v-model="formData.input_feature_2" label="인풋 피처 2"></v-text-field>
                <v-text-field v-model="formData.input_feature_3" label="인풋 피처 3"></v-text-field>
                <v-text-field v-model="formData.input_feature_4" label="인풋 피처 4"></v-text-field>
                <v-checkbox v-model="formData.input_feature_5" label="인풋 피처 5"></v-checkbox>
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
            <v-list>
              <v-list-item v-for="(value, key) in receivedData" :key="key">
                <v-list-item-content>
                  <v-list-item-title>{{ key }}:</v-list-item-title>
                  <v-list-item-subtitle>{{ value }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        formData: {
          input_feature_1: 0,
          input_feature_2: 0,
          input_feature_3: 0,
          input_feature_4: 0,
          input_feature_5: 0
        },
        receivedData: null, 
      };
    },  
    methods: {
      submitForm() {
        axios.post('http://localhost:33333/churn-predict', this.formData)
          .then(response => {
            console.log('Response from FastAPI:', response.data);
            this.receivedData = response.data;
          })
          .catch(error => {
            console.error('Error sending data to FastAPI:', error);
          });
      }
    }
  };
  </script>
