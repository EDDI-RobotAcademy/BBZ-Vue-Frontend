<template>
  <v-container>
    <v-row align="center" justify="center" class="mb-5">
      <span class="title_text2">Analysis</span>
    </v-row>
    <v-row>
      <v-col>
        <v-card align="center" justify="center">
          <v-card-title>• AARRR 퍼널 분석</v-card-title>
          <svg loading ref="chart" class="chart-container"></svg>
          <v-card-text>*** <b>acquisition</b> : 사용자 획득률, <b>activation</b> : 사용자 활성화율, <b>retention</b> : 사용자 유지율,
            <b>revenue</b> : 수익, <b>referral</b> : 추천 전환율</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>• 이탈률 예측 Form</v-card-title>
          <v-card-text>숫자만 입력 가능합니다
            <v-form @submit.prevent="submitForm">
              <v-text-field v-for="(feature, index) in features" :key="index" v-model="form[feature]"
                :label="`${labels[index]}`" @input="checkNumber(feature)">
              </v-text-field>
              <v-btn type="submit" color="primary">결과 확인</v-btn>
            </v-form>
            <pre>이탈률: {{ prediction }}%</pre>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>• 현재 이탈 예측모델 ROC Curve</v-card-title>
          <v-img src="@/assets/images/fixed/roc_curve.png" />
        </v-card>
        <v-card-text>{{ trainStatus }}</v-card-text>
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
import axiosInst from "@/utility/axiosInstance";
import { TrackOpTypes, mapActions, mapState } from "vuex";
import * as d3 from "d3";

const marketingModule = "marketingModule";

export default {
  async mounted() {
    await this.requestMarketingListToDjango();
    this.drawChart();
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    ...mapState(marketingModule, ["aarrr"]),
  },
  data() {
    return {
      form: {
        feature1: "",
        feature2: "",
        feature3: "",
        feature4: "",
        feature5: "",
        feature6: "",
        feature7: "",
        feature8: "",
      },
      labels: [
        "피처1-BUTTON_BOOKNOW",
        "피처2-BUTTON_FAVORITE",
        "피처3-LOGIN",
        "피처4-ORDER",
        "피처5-REFERRAL",
        "피처6-VIEW_BOARD_LIST",
        "피처7-VIEW_HOME",
        "피처8-VIEW_PRODUCT_LIST",
      ],
      features: [
        "feature1",
        "feature2",
        "feature3",
        "feature4",
        "feature5",
        "feature6",
        "feature7",
        "feature8",
      ],
      prediction: null,
      trainStatus: null,
      isDialogVisible: false,
    };
  },
  methods: {
    handleResize() {
      this.drawChart();
    },
    drawChart() {
      const data = Object.values(this.aarrr).reverse();
      const key = Object.keys(this.aarrr).reverse();
      console.log("@@", data[4]);
      console.log(key);

      const element = this.$refs.chart;
      if (!element) return;
      const margin = { top: 20, right: 220, bottom: 40, left: 30 };
      const width = element.clientWidth - margin.left - margin.right;
      const height = element.clientHeight - margin.top - margin.bottom;
      d3.select(element).selectAll("*").remove();
      const svg = d3
        .select(element)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3.scaleLinear().range([0, width]);
      const y = d3.scaleBand().range([height, 0]).padding(0.1);

      x.domain([0, d3.max(data)]);
      y.domain(key);

      const bars = svg
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("width", 0)
        .attr("y", (d, i) => y(key[i]))
        .attr("height", y.bandwidth())
        .attr("fill", "#333333");

      bars
        .transition()
        .duration(1000)
        .attr("width", (d) => x(d));

      svg
        .selectAll(".label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", (d) => x(d) + 5)
        .attr("y", (d, i) => y(key[i]) + y.bandwidth() / 2)
        .attr("alignment-baseline", "middle")
        .text((d, i) => {
          const percentChange = i >= 0 ? - (((data[i + 1] / data[4]) * 100 - (d / data[4]) * 100).toFixed(2)) : "0.00";
          return `${key[i]} (${isNaN(percentChange) ? "0.00" : percentChange}%)`;
        })
    },

    ...mapActions(marketingModule, ["requestMarketingListToDjango"]),

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
          this.isDialogVisible = true;
          return;
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
        alert("모델 학습이 되었는지 확인하세요");
      }
    },
    checkNumber(featureName) {
      let value = this.form[featureName];
      if (isNaN(value) || value === "") {
        // 숫자가 아니거나 값이 비어 있는 경우, 입력값을 초기화
        this.form[featureName] = "";
      } else {
        // 숫자인 경우, 음수 여부를 확인하여 음수면 입력값을 초기화
        let num = parseFloat(value);
        if (num < 0) {
          this.form[featureName] = "";
        }
      }
    },
    checkInputForm() {
      // 필요시 전체 입력 폼을 검사하는 함수 추가 가능
      let checkInput = true;
      for (const feature of this.features) {
        if (this.form[feature] === "") {
          checkInput = false;
          break;
        }
      }
      return checkInput;
    },
    async doFit() {
      try {
        const response = await axiosInst.fastapiAxiosInst.get(
          "/logistic-regression"
        );
        console.log(response.data);

        this.trainStatus = "데이터 학습 성공";
      } catch (error) {
        alert("데이터가 있는지 확인하세요");
      }
    },
  },
};
</script>
<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
  /* 원하는 높이로 설정 */
}

.v-card {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: box-shadow 0.3s ease-in-out;
}

.v-card-title {
  font-size: 25px;
  /* 글자 크기 설정 */
  font-weight: bold;
  /* 글자 굵기 설정 (선택사항) */
}
</style>
