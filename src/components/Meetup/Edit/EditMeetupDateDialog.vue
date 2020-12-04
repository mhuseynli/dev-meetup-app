<template>
  <v-dialog width="600" persistent v-model="editDialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn small text outlined v-bind="attrs" v-on="on">
        Edit Date & Time
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Edit Meetup Date & Time</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-date-picker v-model="editableDate" full-width actions>
              </v-date-picker>
              <v-time-picker v-model="editableTime" format="24hr" full-width>
              </v-time-picker>
              <template>
                <v-spacer></v-spacer>
                <v-btn color="green" text @click="onSaveChanges">
                  Edit
                </v-btn>
                <v-btn @click="editDialog = false" color="red" text>
                  Cancel
                </v-btn>
              </template>
            </v-col>
          </v-row>
        </v-container></v-card-text
      >
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      editDialog: false,
      editableDate: null,
      editableTime: null,
    };
  },
  methods: {
    onSaveChanges() {
      const newDate = new Date(this.meetup.date);
      const newDay = new Date(this.editableDate).getUTCDate();
      const newMonth = new Date(this.editableDate).getUTCMonth();
      const newYear = new Date(this.editableDate).getUTCFullYear();
      const hours = this.editableTime.match(/^(\d+)/)[1];
      const minutes = this.editableTime.match(/:(\d+)/)[1];
      newDate.setUTCDate(newDay);
      newDate.setUTCMonth(newMonth);
      newDate.setUTCFullYear(newYear);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        date: newDate,
      });
    },
  },
  created() {
    this.editableDate = new Date(this.meetup.date).toISOString().substr(0, 10);
    this.editableTime = new Date(this.meetup.date);
  },
};
</script>

<style></style>
