import Vue from 'vue'
import Router from 'vue-router'
import Home from "./components/xiaomi/Home.vue"
import Login from "./components/xiaomi/common/Login.vue"
import reg from "./components/xiaomi/common/reg.vue"
import Me from "./components/xiaomi/common/me.vue"
import product from "./components/xiaomi/common/product.vue"
import cart from  "./components/xiaomi/common/cart.vue" 
import Commodity from  "./components/xiaomi/common/commodity.vue"            


Vue.use(Router)

export default new Router({
  routes: [
    {path:"/com",component:Commodity},
    {path:"/cart",component:cart},
    {path:"/product/:lid",component:product,props:true},
    {path:"/Me",component:Me},    
    {path:"/reg",component:reg},
    {path:'/Login',component:Login},
    {path:"/Home",component:Home},
    {path:"/",component:Home},    
  ]
});
