<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card
          height="200px"
          dark
          v-for="meetup in meetups"
          class="mb-2"
          :key="meetup.id"
        >
          <v-img
            class=""
            :src="meetup.imageUrl"
            height="100%"
            gradient="90deg, rgba(0,0,0,0.6194852941176471) 3%, rgba(0,0,0,0.7511379551820728) 65%"
          >
            <div>
              <v-card-title>{{ meetup.title }}</v-card-title>

              <v-card-subtitle>{{ meetup.date | date }}</v-card-subtitle>

              <v-card-actions>
                <v-btn
                  class="ml-2 mt-13"
                  outlined
                  small
                  :to="`/meetups/${meetup.id}`"
                >
                  View Meetup
                </v-btn>
              </v-card-actions>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.loadedMeetups;
    },
  },
};
</script>

<style></style>
