<template>
    <v-container>
        <v-row>
            <v-row cols="12">
                <v-text-field v-model="productName" label="호텔 이름" />
            </v-row>
        </v-row>
        <v-row>
            <v-row cols="12">
                <v-text-field v-model="productLocation" label="호텔 위치" />
            </v-row>
        </v-row>
        <v-row>
            <!-- 편의시설과 레스트랑 태그는 합친 뒤, 체크박스로 리스트 구현하는것이 더 좋아보임 -->
            <v-row cols="12">
                <v-textarea v-model="productActivity" label="편의 시설"/>
            </v-row>
        </v-row>
        <v-row>
            <v-row cols="12">
                <v-textarea v-model="productDining" label="레스토랑"/>
            </v-row>
        </v-row>
        <v-row>
            <v-row cols="12">
                <!-- '호텔 가격' => '최저가'로 변경 -->
                <v-text-field v-model="productPrice" label="최저가" />
            </v-row>
        </v-row>
        <v-row>
            <v-row cols="12">
                <v-file-input v-model="productImageName" label="호텔 이미지 파일" prepended-icon="mdi-camera" />
            </v-row>
        </v-row>
        <v-row>
            <v-row cols="12">
                <p v-if="uploadedFileName">업로드된 파일: {{ uploadedFileName }}</p>
            </v-row>
        </v-row>
        <v-row>
            <v-row cols="12" class="text-right">
                <v-btn class="ml-2" color="primary" @click="onSubmit">작성 완료</v-btn>
                <v-btn class="ml-1" color="error" @click="onCancel">취소</v-btn>
            </v-row>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'

const productModule = 'productModule'

export default {
    data() {
        return {
            productName: '',
            productLocation: '',
            productActivity: '',
            productDining: '',
            productPrice: 0,
            productImageName: null,
            uploadedFileName: '',
        }
    },
    methods: {
        ...mapActions(productModule, ['requestCreateProductToDjango']),
        async onSubmit() {
            try {
                if (this.productImageName) {
                    const imageFormData = new FormData()
                    imageFormData.append('productName', this.productName)
                    imageFormData.append('productLocation', this.productLocation)
                    imageFormData.append('productActivity', this.productActivity)
                    imageFormData.append('productDining', this.productDining)
                    imageFormData.append('productPrice', this.productPrice.toString())
                    imageFormData.append('productImageName', this.productImageName)
                    console.log(imageFormData.productImageName)
                    const response = await this.requestCreateProductToDjango(imageFormData)
                    this.uploadedFileName = response.data.productImageName
                    this.$router.push({ name: 'ProductListPage' })
                } else {
                    console.log('이미지 파일을 선택하세요!')
                }
            } catch (error) {
                console.log('파일 처리 과정에서 에러 발생:', error)
            }
        },
        async onCancel() {
            console.log('취소 버튼 눌렀음')
            this.$router.go(-1)
        }
    }
}
</script>