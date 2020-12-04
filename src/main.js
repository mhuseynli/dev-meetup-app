import Vue from "vue";
import App from "./App.vue";
import firebase from "firebase/app";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { store } from "./store";
import DateFilter from "./filters/date.js";
import AlertCmp from "./components/Shared/Alert.vue";
import EditMeetupDetailsDialog from "./components/Meetup/Edit/EditMeetupDetailsDialog.vue";
import EditMeetupDateDialog from "./components/Meetup/Edit/EditMeetupDateDialog.vue";
import RegisterDialog from "./components/Meetup/Registration/RegisterDialog.vue";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyASH5XfoGSduM4i4cgJdHUzSEIIM5NzctU",
  authDomain: "devmeetup-vue-5efc4.firebaseapp.com",
  databaseURL: "https://devmeetup-vue-5efc4.firebaseio.com",
  projectId: "devmeetup-vue-5efc4",
  storageBucket: "gs://devmeetup-vue-5efc4.appspot.com",
  messagingSenderId: "626201268007",
  appId: "1:626201268007:web:ec7a919cd689602fa66302",
  measurementId: "G-14SNRD3D1J",
};

Vue.filter("date", DateFilter);
Vue.component("app-alert", AlertCmp);
Vue.component("app-edit-meetup-details-dialog", EditMeetupDetailsDialog);
Vue.component("app-edit-meetup-date-dialog", EditMeetupDateDialog);
Vue.component("register-dialog", RegisterDialog);

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
  created() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
        this.$store.dispatch("fetchUserData");
      }
    });
    this.$store.dispatch("loadMeetups");
  },
}).$mount("#app");
