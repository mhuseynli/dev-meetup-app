<template>
  <v-container>
    <v-row justify="center">
      <v-col sm="4" lg="3" class="text-center text-lg-right">
        <v-btn
          elevation="2"
          x-large
          router
          to="/meetups"
          class="blue darken-1"
          dark
          >Explore Meetups</v-btn
        >
      </v-col>
      <v-col sm="4" lg="3" class="text-center text-lg-left">
        <v-btn
          elevation="2"
          x-large
          router
          to="/meetup/new"
          class="blue darken-1"
          dark
          >Organize Meetup</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-progress-circular
          indeterminate
          color="blue darken-1"
          width="7"
          size="70"
          v-if="loading"
        ></v-progress-circular>
        <v-carousel v-else height="600" cycle show-arrows-on-hover>
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
            :to="`/meetups/${meetup.id}`"
          >
            <div class="title">
              {{ meetup.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups;
    },
    loading(){
      return this.$store.getters.loading;
    }
  },
};
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  background: rgba(0, 0, 0, 0.3);
  font-size: 2em;
  padding: 20px;
}
</style>
