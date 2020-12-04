<template>
  <v-dialog width="600" persistent v-model="editDialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text outlined v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Edit Meetup Details</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                name="title"
                label="Title"
                id="title"
                outlined
                required
                v-model="editedTitle"
              >
              </v-text-field>
              <v-textarea
                name="description"
                label="Description"
                id="description"
                outlined
                required
                v-model="editedDescription"
              >
              </v-textarea>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green" text @click="onSaveChanges">
                  Edit
                </v-btn>
                <v-btn @click="editDialog = false" color="red " text>
                  Cancel
                </v-btn>
              </v-card-actions>
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
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description,
    };
  },
  methods: {
    onSaveChanges() {
      if (
        this.editedTitle.trim() === "" ||
        this.editedDescription.trim() === ""
      ) {
        return;
      }
      this.editDialog = false;
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription,
      });
    },
  },
};
</script>

<style></style>
