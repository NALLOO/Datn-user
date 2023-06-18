<template>
  <div v-loading="loading" id="app">
    <RouterView :key="$route.fullPath"/>
  </div>
</template>

<script>
import { getProfile as getProfileApi } from "./api/user";
export default {
  name: "App",
  components: {},
  data() {
    return {
      loading: false,
    };
  },
  created() {
    if (!this.$store.state.user) this.getProfile();
  },
  methods: {
    getProfile() {
      if (localStorage.getItem("access_token")) {
        getProfileApi()
          .then((res) => {
            this.$store.dispatch("SET_USER", res.data);
            this.$store.dispatch(
              "SET_TOKEN",
              localStorage.getItem("access_token")
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
