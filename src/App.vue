<template>
  <v-app>
    <v-navigation-drawer v-model="sideNav" absolute temporary>
      <v-list>
        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="item in menuItems"
              :key="item.title"
              :to="item.link"
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="userIsAuthenticated" @click="onLogOut">
              <v-list-item-action>
                <v-icon>mdi-logout-variant</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app dark class="blue darken-4">
      <v-app-bar-nav-icon
        @click.stop="sideNav = !sideNav"
        class="d-md-none"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor:pointer"
          >Dev Meetup</router-link
        >
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="d-none d-md-block">
        <v-btn text v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-icon left> {{ item.icon }}</v-icon
          >{{ item.title }}
        </v-btn>
        <v-btn text v-if="userIsAuthenticated" @click="onLogOut">
          <v-icon left>mdi-logout-variant</v-icon>Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      sideNav: false,
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        {
          icon: "mdi-account-plus",
          title: "Sign Up",
          link: "/signup",
        },
        {
          icon: "mdi-login-variant",
          title: "Sign In",
          link: "/signin",
        },
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: "mdi-account-supervisor",
            title: "View Meetups",
            link: "/meetups",
          },
          {
            icon: "mdi-calendar-account",
            title: "Organize Meetup",
            link: "/meetup/new",
          },
          {
            icon: "mdi-account",
            title: "Profile",
            link: "/profile",
          },
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
  },
  methods: {
    onLogOut() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
