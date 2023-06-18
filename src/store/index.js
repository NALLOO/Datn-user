import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    token: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    REMOVE_USER(state) {
      state.user = null;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    REMOVE_TOKEN(state) {
      state.token = null;
    },
  },
  actions: {
    SET_USER({ commit }, user) {
      commit("SET_USER", user);
    },
    REMOVE_USER({ commit }) {
      commit("REMOVE_USER");
    },
    SET_TOKEN({ commit }, token) {
      commit("SET_TOKEN", token);
    },
    REMOVE_TOKEN({ commit }) {
      commit("REMOVE_TOKEN");
    },
  },
  getters: {
    // Your getters go here
    getCount: (state) => {
      return state.count;
    },
  },
});

export default store;
