<template>
  <v-container>
    <v-row>
      <v-col>
        <p class="headline">Create a new Meetup</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <form @submit.prevent="onCreateMeetup">
          <v-row>
            <v-col cols="12" md="6"
              ><v-row no-gutters>
                <v-col>
                  <v-text-field
                    name="title"
                    label="Title"
                    id="title"
                    outlined
                    required
                    v-model="title"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
                  <v-text-field
                    name="location"
                    label="Location"
                    id="location"
                    outlined
                    required
                    v-model="location"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
                  <v-file-input
                    show-size
                    label="Choose image"
                    accept="image/*"
                    @change="onFilePicked"
                    v-model="image"
                  ></v-file-input>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
                  <p>Image preview</p>
                  <v-img :src="imageUrl" alt="pre" height="300" contain></v-img>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" md="6">
              <v-row no-gutters>
                <v-col>
                  <v-textarea
                    name="description"
                    label="Description"
                    id="description"
                    outlined
                    required
                    v-model="description"
                  >
                  </v-textarea>
                </v-col>
              </v-row>
              <v-row no-gutters class="text-center">
                <v-col cols="12">
                  <p class="subtitle-1">Choose a Date & Time</p>
                </v-col>
                <v-col cols="12" md="6" class="px-1">
                  <v-date-picker v-model="date"></v-date-picker>
                </v-col>
                <v-col cols="12" md="6" class="px-1">
                  <v-time-picker v-model="time" format="24hr"> </v-time-picker>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-right">
                  <v-btn
                    elevation="0"
                    class="white--text"
                    color="blue darken-3"
                    :disabled="!formIsValid"
                    type="submit"
                    >Create Meetup</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      location: "",
      imageUrl: "",
      description: "",
      date: new Date().toISOString().substr(0, 10),
      time: new Date(),
      image: null,
    };
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.location !== "" &&
        this.imageUrl !== "" &&
        this.description !== ""
      );
    },
    submittableDateTime() {
      const date = new Date(this.date);
      if (typeof this.time === "string") {
        let hours = this.time.match(/^(\d+)/)[1];
        const minutes = this.time.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.getHours());
        date.setMinutes(this.time.getMinutes());
      }
      return date;
    },
  },
  methods: {
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }
      if (!this.image) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.submittableDateTime,
        // date: `${this.date}  ${this.time}`,
      };
      this.$store.dispatch("createMeetup", meetupData);
      this.$router.push("/meetups");
    },
    onFilePicked() {
      if (!(this.image == null)) {
        this.imageUrl = URL.createObjectURL(this.image);
      } else {
        this.imageUrl = "";
      }
    },
  },
};
</script>

<style></style>
