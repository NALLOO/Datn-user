import Vue from "vue";
import ElementUI from "element-ui";
import App from "./App.vue";
import router from "@/router";
import viLang from "element-ui/lib/locale/lang/vi";
import store from "./store";
import "element-ui/lib/theme-chalk/index.css";
import "@/styles/index.scss";

Vue.config.productionTip = false;
Vue.use(ElementUI, {
  locale: viLang,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
