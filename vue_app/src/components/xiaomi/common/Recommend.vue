<template>
    <div class="container">
        <div class="topWrap">
            <div class="top">
                <img class="logo" src="../../../assets/home/logo.png" alt="">
                <div class="search">
                    <img src="../../../assets/home/search.png" alt="">
                    <input type="text" placeholder="输入搜索的商品">
                </div>
                <router-link to="/login"><img src="../../../assets/home/user.png" alt=""></router-link>            
            </div>                
        </div>            
        <div class="banner">
            <mt-swipe :auto="4000"  class="height">
                <mt-swipe-item v-for="(item,index) of bannerlist" :key=index><img :src="require(`../../../assets/home/${item}.jpg`)" alt=""></mt-swipe-item>
            </mt-swipe>
        </div>
        <!-- commodityList商品 -->
        <div class="commList">
            <ul>
                <li v-for="(item,index) of  smallicons" :key=index><img :src="require(`../../../assets/home/${item}.jpg`)" alt=""></li>                   
            </ul>
        </div> 
        <!-- Recommended selPros -->
        <div class="recPros">
            <div class="leftImage">
                <img src="../../../assets/home/recPros1.jpg" alt="">
            </div>
            <div class="rightImage"> 
                <img src="../../../assets/home/recPros2.jpg" alt="">
                <img src="../../../assets/home/recPros3.jpg" alt="">
            </div>                   
        </div>
        <div class="picture">
            <a href="javascript:;"><img src="../../../assets/home/recPros4.jpg" alt=""></a>
        </div>
        <!-- section1 -->
        <div class="sec1">
            <div class="topImage">
                <a href="#"><img src="../../../assets/home/selected0.jpg" alt=""></a>
            </div>
            <!-- selected 精选-->
            <div class="selected">
                <div class="selPro" v-for="(item,index) of reclist" :key=index>
                    <router-link :to="`/product/${item.sid}`">
                        <div class="img">
                            <img :src="require(`../../../assets/home/${item.picture}`)" alt="">
                        </div>
                        <div class="info">
                            <div class="name">{{item.sname}}</div>
                            <div class="brief">{{item.brief}}</div>
                            <div class="price">¥{{item.price}}起<s v-show="item.rprice">{{item.rprice}}</s></div>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="morePhone">
                <a href="javascript:;">更多小米手机产品&nbsp;></a>
            </div >
        </div>                        
    </div>
</template>

<script>
export default {
    data(){
        return{
            bannerlist:["banner1","banner2","banner3"],
            smallicons:["smallicon1","smallicon2","smallicon3","smallicon4","smallicon5","smallicon6","smallicon7","smallicon8","smallicon9","smallicon10"],
            selected:"1",
            reclist:[],
        }
    },
    created(){
        this.rec();
    },
    methods:{
        rec(){
            this.axios.get("Rec").then((result)=>{
                this.reclist=result.data;                               
            })
        }
    }
}
</script>

<style scoped>
.container {
    background-color:#f2f2f2;

}
.container .topWrap{
    width:100%;
    background-color:#f2f2f2;
    position:fixed;
    z-index: 100;
    top:0px;
}
.container .top{ 
    padding-top:10px;
    display:flex;
    justify-content:space-around;
    align-items: center;  
}

.top .logo{
    width: 27px;
    height:18px;
}

.top .search{
    display:flex;
    align-items: center;
    background-color:#fff;
}
.top .search input{
    margin-bottom:0;
    border:none;
}
/* 导航栏 */
.container .topNav{
    background-color:#f2f2f2;
    /* padding-top:10px; */
    
}

/* 轮播图 */
.container .banner{
    padding-top:60px;
    margin-bottom:10px;
}
.container .banner .height{
    height:12rem;
} 
.banner .height img{
   width: 100%;
   height:100%;   
}
/* 商品介绍 */

.container .commList ul{
    width:100%;
    background: #fff;
    display:flex;
    justify-content:space-between;
    flex-wrap: wrap;

}
.container .commList ul li{
    width:20%
}
.commList ul li img{
    width:100%;
}

/* Recommended selPros*/
.recPros{
    width:100%;
    margin:10px 0;
    display:flex;
    justify-content:space-between;
}
.recPros .leftImage{
    width:49%;
   
}

.recPros .leftImage img{
    width:100%;
    display:block;  
}
.recPros .rightImage{
    width:49%;
}

.recPros .rightImage img{
    width:100%;
    display: block;
    padding-bottom:3px;
}

.picture img{
    width:100%;
    display:block; 
}

/* section1 */
.sec1{
    margin-top:10px;
}
.sec1 .topImage  a img{
    width:100%;
    display:block;
}

.sec1 .selected{
    display:flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.sec1 .selected .selPro{  
    padding:5px;
    width:50%;
    /* box-shadow: 0 0 10px #999595; */
}
.sec1 .selected .selPro  img{
    width:100%;
    display:block;
}

.selPro .info{
    padding: 10px;
    background-color:#ddd6d6;
    text-align: center;

}

.selPro .info .name{
    font-size:10px;
    color:rgba(0, 0, 0, 0.87);
}
.selPro .info .brief{
    font-size:50%;
    color:rgba(0, 0, 0, 0.5);
}

.selPro .info .price{
    font-size:0.9rem;
    color:#ea625b;
}
.selPro .info .price s{
    color:rgba(0, 0, 0, 0.5);
}
/* 更多手机 */
.sec1 .morePhone{
    width:100%;
    background:#fff; 
    height:30px;
    text-align:center;
    
}
.sec1 .morePhone a{
    display: block;
    line-height: 30px; 
}
</style>
