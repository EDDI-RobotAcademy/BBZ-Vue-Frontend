<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-title>즐겨찾기 목록</v-card-title>
                    <v-cart-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in favoritesItems" :key="item.favoritesItemsId">
                                    <td>{{ item.productName }}</td>
                                    <td>{{ item.productPrice }}</td>
                                    <td>
                                        <v-btn color="primary" @click="confirmCheckout">예약하기</v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                        <v-divider></v-divider>
                    </v-cart-text>
                </v-card>
            </v-col>
        </v-row>
        <!-- Confirmation Dialog -->
        <v-dialog v-model="isCheckoutDialogVisible" max-width="500">
            <v-card>
                <v-card-title>Confirm Checkout</v-card-title>
                <v-card-text>Are you sure you want to order the selected item?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="isCheckoutDialogVisible = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="proceedToOrder">Confirm</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'

const favoritesModule = 'favoritesModule'

export default {
    data() {
        return {
            favoritesItems: [],
            isCheckoutDialogVisible: false,
        }
    },
    methods: {
        ...mapActions(favoritesModule, ['requestFavoritesListToDjango']),
        confirmCheckout() {
            this.isCheckoutDialogVisible = true
        },
        async proceedToOrder() {
            this.isCheckoutDialogVisible = false
            console.log('proceedToOrder() 버튼 누름')
        },
        async fetchFavoritesList() {
            try {
                const response = await this.requestFavoritesListToDjango()
                this.favoritesItems = response
                console.log('favoritesItems:', this.favoritesItems)
            } catch (error) {
                console.error('Error fetching favorites list:', error)
            }
        }
    },
    created() {
        this.fetchFavoritesList()
    },
}

</script>