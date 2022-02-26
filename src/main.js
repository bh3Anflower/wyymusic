import Vue from "vue";
import App from "./App.vue";
// 导入 vant 组件库
import Vant from "vant";
import "vant/lib/index.css";
// 导入路由模块
import router from "@/router";
// 导入axios 模块
import axios from "axios";

Vue.use(Vant);

// 将axios 挂载到 vue 的原型对象上
Vue.prototype.$http = axios;

// 设置 请求根目录
// axios.defaults.baseURL = 'https://netease-cloud-music-api-six-jet.vercel.app/'
axios.defaults.baseURL = "http://localhost:3000";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
