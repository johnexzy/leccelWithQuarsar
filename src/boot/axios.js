import Vue from 'vue'
import axios from 'axios'
axios.defaults.baseURL = 'https://app.leccel.net'
const blogApi = axios.create({
  baseURL: "https://public-api.wordpress.com/rest/v1.1/sites/200671771/"
  //leccelblog.wordpress.com
});
export default ({ app }) => {
  app.blogApi = blogApi;
};
export { blogApi }
Vue.prototype.$blogApi = blogApi
Vue.prototype.$api = axios
