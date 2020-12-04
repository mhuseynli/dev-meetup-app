<template>
  <v-container>
    <v-row justify="center" v-if="loading">
      <v-progress-circular
        class="text-center"
        indeterminate
        color="blue darken-1"
        width="7"
        size="70"
      ></v-progress-circular>
    </v-row>
    <v-row v-else>
      <v-col>
        <v-card>
          <v-card-title class="headline">
            <v-spacer>
              {{ meetup.title }}
            </v-spacer>
            <template>
              <app-edit-meetup-details-dialog
                v-if="userIsCreator"
                :meetup="meetup"
              ></app-edit-meetup-details-dialog> </template
          ></v-card-title>

          <v-img class="align-center" max-height="400px" :src="meetup.imageUrl">
          </v-img>
          <v-card-text class="font-weight-medium">
            <span class="info--text">{{ meetup.date | date }} </span>
            <app-edit-meetup-date-dialog
              v-if="userIsCreator"
              :meetup="meetup"
            ></app-edit-meetup-date-dialog>
            <span class="subtitle-1"> - {{ meetup.location }}</span>
            <p>{{ meetup.description }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <register-dialog
              :meetupId="meetup.id"
              v-if="userIsAuthenticated && !userIsCreator"
            ></register-dialog>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (this.userIsAuthenticated) {
        return this.$store.getters.user.id === this.meetup.creatorId;
      } else {
        return false;
      }
    },
  },
};
</script>

<style></style>
