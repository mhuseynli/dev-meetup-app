import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home.vue";
import AuthGuard from "./auth-guard.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/meetups",
    name: "Meetups",
    component: () => import("@/components/Meetup/Meetups.vue"),
  },
  {
    path: "/meetup/new",
    name: "Create Meetup",
    component: () => import("@/components/Meetup/CreateMeetup.vue"),
    beforeEnter: AuthGuard,
  },
  {
    path: "/meetups/:id",
    name: "Meetup",
    props: true,
    component: () => import("@/components/Meetup/Meetup.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/components/User/Profile.vue"),
    beforeEnter: AuthGuard,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("@/components/User/SignUp.vue"),
  },
  {
    path: "/signin",
    name: "SignIn",
    component: () => import("@/components/User/SignIn.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
