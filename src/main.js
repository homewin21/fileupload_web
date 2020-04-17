// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import 'view-design/dist/styles/iview.css';
import ViewUI from 'view-design';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies);
Vue.use(ViewUI);
Vue.prototype.$video = Video
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
Vue.prototype.$Message.config({
  top: 500,
});
