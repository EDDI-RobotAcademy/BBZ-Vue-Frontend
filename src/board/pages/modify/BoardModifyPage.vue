<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="title" label="제목"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model=board.writer readonly label="작성자"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="content" label="내용" auto-grow/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="auto">
                <v-btn class="ml-2" color="primary" @click="onModify">수정 완료</v-btn>
            <v-col cols="auto">
                <router-link :to="{name : 'BoardReadPage' }">
                    <v-btn color="primary"> 취소 </v-btn>
                </router-link>
            </v-col>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>

import { mapActions, mapState } from 'vuex'

const boardModule = 'boardModule'

export default {
    props: {
        boardId: {
            type: String,
            required: true,
        }
    }, 
    data () {
        return {
            title: '',
            content: '',
        }
    } ,
    computed: {
        ...mapState(boardModule, ['board'])
    },
    methods: {
        ...mapActions(boardModule, ['requestBoardToDjango', 'requestModifyBoardToDjango']),
        async onModify(){
            console.log('수정 완료를 누르셨습니다!')

            const payload = {
                title: this.title,
                content: this.content,
                boardId: this.boardId
            }

            await this.requestModifyBoardToDjango(payload)
            await this.$router.push({
                name: 'BoardReadPage',
                parmas: { boardId: this.boardId}
            })
        },
    },
    created () {
        this.requestBoardToDjango(this.boardId).then(() => {
            this.title = this.board.title
            this.writer = this.board.writer
            this.content = this.board.content
        })
    },
    
}
</script>