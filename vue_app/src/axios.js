//1引入vue
import  vue from "vue"
//2引入axios库
import axios from "axios"
axios.defaults.withCredentials=true;
//4设置请求服务器基础路径
axios.defaults.baseURL="http://127.0.0.1:3000"
//5将axios注册 Vue实例
vue.prototype.axios=axios
//6在main.js引入axios即可.