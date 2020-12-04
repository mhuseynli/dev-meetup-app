<template>
  <v-dialog persistent v-model="registerDialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn outlined color="blue darken-1" v-bind="attrs" v-on="on">
        {{ userIsRegistered ? "Unregister" : "Register" }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline" v-if="userIsRegistered"
          >Do you want to unregister ?</span
        >
        <span class="headline" v-else>Register for Meetup</span>
      </v-card-title>
      <v-card-text>
        <p>You can always change your decision later on.</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green" text @click="onAgree">
          Confirm
        </v-btn>
        <v-btn @click="registerDialog = false" color="red" text>
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetupId"],
  data() {
    return {
      registerDialog: false,
    };
  },
  computed: {
    userIsRegistered() {
      return (
        this.$store.getters.user.registeredMeetups.findIndex((meetupId) => {
          return meetupId === this.meetupId;
        }) >= 0
      );
    },
  },
  methods: {
    onAgree() {
      if (this.userIsRegistered) {
        this.$store.dispatch("unregisterUserFromMeetup", this.meetupId);
      } else {
        this.$store.dispatch("registerUserForMeetup", this.meetupId);
      }
    },
  },
};
</script>

<style></style>
