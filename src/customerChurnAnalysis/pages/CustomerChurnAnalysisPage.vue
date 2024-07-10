<template>
    <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-btn color="primary">AARRR마케팅 분석 넣는칸</v-btn>
          <p>마케팅 분석 넣는 칸</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>이탈률 예측 Form</v-card-title>
          <v-card-text>숫자만 입력 가능합니다
            <v-form @submit.prevent="submitForm">
              <v-text-field v-for="(feature, index) in features" :key="index" v-model="form[feature]"
                :label="`${labels[index]}`" @input="checkNumber(feature)">
              </v-text-field>
              <v-btn type="submit" color="primary">결과 확인</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>Data from API</v-card-title>
          <v-card-text>
            {{prediction}}%
          </v-card-text>
        </v-card>
        <v-card>
          <p>그래프를 그리는칸</p>
          <p>그래프를 그리는칸</p>
          <p>그래프를 그리는칸</p>
          <p>그래프를 그리는칸</p>
          <p>그래프를 그리는칸</p>
        </v-card>

      </v-col>

      <v-col cols="12" md="6">
        <v-card v-if="receivedData">
          <v-card-title>Received Data</v-card-title>
          <v-card-text>
            <pre>{{ receivedData }}</pre>
          </v-card-text>
        </v-card>

        <!-- <v-col>
          <v-row>현재 보유 데이터 n건</v-row>
          <div style="margin-bottom: 25px;"></div>
          <v-row><v-btn @click="doFit" color="error">이탈 예측모델 학습</v-btn></v-row>
        </v-col>
        <v-row>
          <v-card-text>{{ trainStatus }}</v-card-text>
        </v-row> -->
      </v-col>
    </v-row>

    <v-dialog v-model="isDialogVisible" max-width="300">
      <v-card>
        <v-card-title>제출 형식 오류</v-card-title>
        <v-card-text>Form을 전부 다 채워주세요!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="isDialogVisible = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
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
      labels: ['피처1-BUTTON_BOOKNOW', '피처2-BUTTON_FAVORITE', '피처3-LOGIN', '피처4-ORDER', '피처5-REFERRAL', '피처6-VIEW_BOARD_LIST', '피처7-VIEW_HOME', '피처8-VIEW_PRODUCT_LIST'],
      features: ['feature1', 'feature2', 'feature3', 'feature4', 'feature5', 'feature6', 'feature7', 'feature8'],
      prediction: null,
      trainStatus: null,
      isDialogVisible: false
    }
  },
  methods: {
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

        if (!this.checkInputForm()) {
          this.isDialogVisible = true
          return
        }

        const response = await axiosInst.fastapiAxiosInst.post(

          '/churn-predict', {
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
    checkNumber(featureName) {
      let value = this.form[featureName];
      if (isNaN(value) || value === '') {
        // 숫자가 아니거나 값이 비어 있는 경우, 입력값을 초기화
        this.form[featureName] = '';
      } else {
        // 숫자인 경우, 음수 여부를 확인하여 음수면 입력값을 초기화
        let num = parseFloat(value);
        if (num < 0) {
          this.form[featureName] = '';
        }
      }
    },
    checkInputForm() {
      // 필요시 전체 입력 폼을 검사하는 함수 추가 가능
      let checkInput = true
      for (const feature of this.features) {
        if (this.form[feature] === '') {
          checkInput = false
          break;
        }
      }
      return checkInput
    },
    async doFit() {
      try {
        const response = await axiosInst.fastapiAxiosInst.get('/logistic-regression');
        console.log(response.data);

        this.trainStatus = '데이터 학습 성공'
      } catch (error) {
        alert('데이터가 있는지 확인하세요')
      }
    }
  }
}
</script>