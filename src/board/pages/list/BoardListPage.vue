<template lang="">
    <v-container>
        <v-row align="center" justify="center">
            <h2 class="title_text1">Q</h2>
            <span class="title_text2">&</span>
            <h2 class="title_text1">A</h2>
        </v-row>
        <div style="text-align: left; margin: 15px;">
            <v-row v-if="this.isAuthenticated">
                <router-link :to="{ name: 'BoardRegisterPage' }">
                    게시물 작성
                </router-link>
            </v-row>
        </div>
        <v-data-table
            v-model:items-per-page="perPage"
            :headers="headerTitle"
            :items="pagedItems"
            v-model:pagination="pagination"
            class="elevation-1"
            @click:row="readRow"
            item-value="boardId"/>
        <v-pagination
            v-model="pagination.page"
            :length="Math.ceil(boards.length / perPage)"
            color="primary"
            @input="updateItems"/>
    </v-container>
</template>


<script>
import { mapActions, mapState } from 'vuex'

const boardModule = 'boardModule'
const authenticationModule = 'authenticationModule'
const marketingModule = 'marketingModule'

export default {
    components: {
        // RouterLink
    },
    computed: {
        ...mapState(boardModule, ['boards']),
        ...mapState(authenticationModule, ['isAuthenticated']),
        pagedItems() {
            const startIdx = (this.pagination.page - 1) * this.perPage
            const endIdx = startIdx + this.perPage
            return this.boards.slice(startIdx, endIdx)
        }
    },
    mounted() {
        this.requestBoardListToDjango()
    },
    methods: {
        ...mapActions(boardModule, ['requestBoardListToDjango']),
        ...mapActions(marketingModule, ['requestCreateLogToDjango']),

        readRow(event, { item }) {
            this.$router.push({
                name: 'BoardReadPage',
                params: { boardId: item['boardId'].toString() }
            })
        }
    },
    data() {
        return {
            headerTitle: [
                {
                    title: 'No',
                    align: 'start',
                    sortable: true,
                    key: 'boardId',
                },
                { title: '제목', align: 'end', key: 'title' },
                { title: '작성자', align: 'end', key: 'writer' },
                { title: '작성일자', align: 'end', key: 'regDate' },
            ],
            perPage: 5,
            pagination: {
                page: 1,
            }
        }
    },
    created() {
        const userToken = localStorage.getItem('userToken')
        if (userToken) {
        const logData = {
            userToken: userToken,
            actionType: 'VIEW_BOARD_LIST',
            actionTime: Date.now()
            }
        this.requestCreateLogToDjango(logData)
        }
    },
}
</script>