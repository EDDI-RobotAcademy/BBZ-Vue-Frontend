<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="title" label="제목" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="writer" readonly label="작성자" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="content" label="내용" auto-grow />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="text-right">
                <v-btn class="ml-2" color="primary" @click="onSubmit">작성 완료</v-btn>
                <v-btn class="ml-1" color="error" @click="onCancel">취소</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const boardModule = 'boardModule'
const accountModule = 'accountModule'

export default {
    data() {
        return {
            title: '',
            writer: this.writer,
            content: '',
        }
    },
    computed: {
        ...mapState(boardModule, ['board']),
    },
    methods: {
        ...mapActions(boardModule, ['requestCreateBoardToDjango']),
        ...mapActions(accountModule, ['requestGetNicknameToDjango']),
        async onSubmit() {
            console.log('submit button check')
            const payload = {
                title: this.title,
                writer: this.writer,
                content: this.content,
            }

            const board = await this.requestCreateBoardToDjango(payload)

            await this.$router.push({ name: 'BoardReadPage', params: { boardId: board.boardId } })
        },
        async onCancel() {
            this.$router.push({ name: 'BoardListPage' })
        }
    },
    async mounted() {
        const data = await this.requestGetNicknameToDjango()
        this.writer = data.nickname
    }
}

</script>