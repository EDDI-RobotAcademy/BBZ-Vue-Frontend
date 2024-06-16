<template>
    <v-container>
      <v-row v-for="hotel in hotels" :key="hotel.id" class="mb-4">
        <v-col cols="12">
          <v-card>
            <v-card-title>{{ hotel.name }}</v-card-title>
            <v-card-subtitle>{{ hotel.location }}</v-card-subtitle>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col cols="4">
                  <v-img :src="hotel.image" alt="Hotel image" class="hotel-image"></v-img>
                </v-col>
                <v-col cols="8">
                  <p>{{ hotel.description }}</p>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-row>
                <v-col
                  v-for="room in hotel.rooms"
                  :key="room.id"
                  cols="auto"
                >
                  <v-btn @click="showRoomDetails(room)">
                    {{ room.type }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
  
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>{{ selectedRoom.type }}</v-card-title>
          <v-card-text>
            <div>{{ selectedRoom.description }}</div>
            <div>Price: {{ selectedRoom.price }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dialog: false,
        selectedRoom: {},
        hotels: [
          {
            id: 1,
            name: 'Hotel 1',
            location: 'Seoul, Korea',
            description: 'A luxurious hotel in Seoul.',
            image: 'https://via.placeholder.com/150',
            rooms: [
              { id: 1, type: 'Deluxe Room', description: 'A deluxe room with a view.', price: '$200' },
              { id: 2, type: 'Suite', description: 'A spacious suite.', price: '$400' },
            ],
          },
          {
            id: 2,
            name: 'Hotel 2',
            location: 'Seoul, Korea',
            description: 'Another luxurious hotel in Seoul.',
            image: 'https://via.placeholder.com/150',
            rooms: [
              { id: 3, type: 'Standard Room', description: 'A standard room.', price: '$150' },
              { id: 4, type: 'Executive Suite', description: 'An executive suite.', price: '$500' },
            ],
          },
        ],
      };
    },
    methods: {
      showRoomDetails(room) {
        this.selectedRoom = room;
        this.dialog = true;
      },
    },
  };
  </script>
  
  <style scoped>
  .hotel-image {
    width: 100%;
    height: auto;
  }
  </style>
  