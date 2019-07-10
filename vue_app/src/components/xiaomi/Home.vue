<template>
    <div class="container">
        <mt-tab-container v-model="Interface">
            <mt-tab-container-item id="homePage">
                <recommend></recommend>
            </mt-tab-container-item>
            <mt-tab-container-item id="commodity">
                <commodity></commodity>
            </mt-tab-container-item>
            <mt-tab-container-item id="cart">
                <cart v-on:home="homePage"></cart>
            </mt-tab-container-item>
            <mt-tab-container-item id="me">
                <me></me>
            </mt-tab-container-item>          
        </mt-tab-container>
        <mt-tabbar v-model="Interface" fixed swipeable> 
            <mt-tab-item id="homePage" @click.native="chang(0)">
                <tabbaricon  :focused="index[0].select" :selectedImage="require('../../assets/TabbarIcon/homecolor.png')" :normalImage="require('../../assets/TabbarIcon/home.png')"></tabbaricon>
                首页
            </mt-tab-item>
            <mt-tab-item id="commodity" @click.native="chang(1)">
                <tabbaricon  :focused="index[1].select" :selectedImage="require('../../assets/TabbarIcon/classcolor.png')" :normalImage="require('../../assets/TabbarIcon/class.png')"></tabbaricon>
                商品
            </mt-tab-item>
            <mt-tab-item id="cart" @click.native="chang(2)">
                <tabbaricon  :focused="index[2].select" :selectedImage="require('../../assets/TabbarIcon/carcolor.png')" :normalImage="require('../../assets/TabbarIcon/car.png')"></tabbaricon>
                购物车
            </mt-tab-item>
            <mt-tab-item id="me" @click.native="chang(3)">
            <tabbaricon :focused="index[3].select" :selectedImage="require('../../assets/TabbarIcon/mecolor.png')" :normalImage="require('../../assets/TabbarIcon/me.png')"></tabbaricon>
                我的
            </mt-tab-item>
        </mt-tabbar> 
    </div>
</template>

<script>
import Recommend from "./common/Recommend.vue"
import Commodity from "./common/commodity.vue"
import Cart from "./common/cart.vue"
import Me from "./common/me.vue"
import TabbarIcon from "./common/TabbarIcon.vue"

export default {
    data(){
        return{
            Interface:"homePage",
            index:[
                {select:true},
                {select:false},
                {select:false},
                {select:false}
            ],         
        }
    },
    components:{
        "recommend":Recommend,
        "commodity":Commodity,
        "cart":Cart,
        "me":Me,
        "tabbaricon":TabbarIcon,//引入组件
        "cart":Cart
    },
    methods:{
        homePage(n){
            this.Interface=n;
            //console.log(n)
            this.chang(1);
        },
        chang(n){
            for(var i=0;i<this.index.length;i++){
                if(i==n){                               
                this.index[i].select=true;
                }else{                                     
                this.index[i].select=false;
                }
            }
        },
    },
   
}
</script>

<style scoped>
.container{
    height:100%;
}

.mint-tabbar .mint-tab-item{
    /* height: 200px; */
    display:flex;
    justify-content: center;
    align-items:center;
}
</style>
