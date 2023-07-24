import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: () => import("@/views/HomePage"),
  },
  {
    path: "/trip/:id",
    name: "TripDetail",
    component: () => import("@/views/Trip"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register"),
  },
  {
    path: "/success",
    name: "Success",
    component: () => import("@/views/Success"),
  },
  {
    path: "/failed",
    name: "Failed",
    component: () => import("@/views/Failed"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile"),
  },
  {
    path: "/reset-password/:token",
    name: "ResetPassword",
    component: () => import("@/views/ResetPassword"),
  },
  {
    path: "/forgot-password",
    name: "FogotPassword",
    component: () => import("@/views/ForgotPassword"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
