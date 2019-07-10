<template>
    <div class="container">
        <header>
            <div class="userImg"><img src="../../../assets/me/user.png" alt=""></div>
            <div class="loRe" v-if="ishas"><router-link to="/login">登录</router-link>/<router-link to="/reg">注册</router-link></div>
            <div class="loRe" v-if="!ishas">欢迎回来!{{name}}</div>
        </header>
        <div class="main">
            <div class="order">
                <div>我的订单</div>
                <div class="allorder"><a href="#">全部订单</a><img src="../../../assets/me/arrow-righty.png" alt=""></div>
            </div>
            <!-- Situation订单情况 -->
            <div class="sit">
                <ul>
                    <li><a href="javascript:;"><img src="../../../assets/me/shoukuan.png" alt=""><span>待付款</span></a></li>
                    <li><a href="javascript:;"><img src="../../../assets/me/shoucangtubiao.png" alt=""><span>待收货</span></a></li>
                    <li><a href="javascript:;"><img src="../../../assets/me/weixiu.png" alt=""><span>退换修</span></a></li>
                </ul>
            </div>
            <div class="sec1">
                <ul>
                    <li>
                        <a href="javacript:;">
                            <div class="right">
                                <img src="../../../assets/me/s1.png" alt="">
                            </div>
                            <div class="left">
                                <span>会员中心</span>
                                <img src="../../../assets/me/arrow-righty.png" alt="">
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="javacript:;">
                            <div class="right">
                                <img src="../../../assets/me/s2.png" alt="">
                            </div>
                            <div class="left">
                                <span>我的优惠</span>
                                <img src="../../../assets/me/arrow-righty.png" alt="">
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="sec2">
                <ul>
                    <li>
                        <a href="javacript:;">
                            <div class="right">
                                <img src="../../../assets/me/s3.png" alt="">
                            </div>
                            <div class="left">
                                <span>服务中心</span>
                                <img src="../../../assets/me/arrow-righty.png" alt="">
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="javacript:;">
                            <div class="right">
                                <img src="../../../assets/me/shoukuan.png" alt="">
                            </div>
                            <div class="left">
                                <span>小米之家</span>
                                <img src="../../../assets/me/arrow-righty.png" alt="">
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="sec3">
               <div class="fcode">
                    <a href="javacript:;">
                        <div class="right">
                            <img src="../../../assets/me/s5.png" alt="">
                        </div>
                        <div class="left">
                            <span>F码通道</span>
                            <img src="../../../assets/me/arrow-righty.png" alt="">
                        </div>
                    </a>
               </div>
            </div> 
            <div class="sec4">
               <div class="set">
                    <a href="javacript:;">
                        <div class="right">
                            <img src="../../../assets/me/s6.png" alt="">
                        </div>
                        <div class="left">
                            <span>设置</span>
                            <img src="../../../assets/me/arrow-righty.png" alt="">
                        </div>
                    </a>
               </div>
            </div>   
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            ishas:true,
            name:"",
        }
    },
    created(){
        if(sessionStorage.getItem("uphone")!=null){
            this.ishas=false;
            this.name=sessionStorage.getItem("uphone")
        }
    }
    
}
</script>

<style scoped>
/* 全部a标签设置为黑色 */
a{
 color:black;
}
.container{
    background-color:#f2f2f2;
    height:100%;
}

.container header{
    background-color:#fff;
    background:url(../../../assets/me/background.png) center 0 #f37d0f;
    background-size:100%;
    display:flex; 
    align-items:center; 
    padding:10px; 
}
header .userImg{
    width: 15%;
    border:3px solid hsla(0,0%,100%,.4);
    border-radius:50%;
}
.userImg img{
    width:100%;
    display:block;
}

header .loRe{
    margin-left:10px;
    color:#fff;
}
header .loRe a{
   color:#fff;
}

/* 主要内容 */

.main .order{
    background-color:#fff;
    padding:10px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    font-size:10px;
    
}
.order .allorder{
    display:flex;
    /* justify-content:space-between; */
    align-items:center;
}
/* Situation订单情况 */
.main .sit{
    margin-bottom:5px;
    border-top:1px solid #f2f2f2;
    background-color:#fff;
}

.main .sit ul{
    padding:15px 50px;
    display:flex;
    justify-content:space-between;
}

.main .sit ul li a{
    display:flex;
    flex-direction: column;
    align-items: center;
    font-size:10px;
   
}
.main .sit ul li a img{
    padding:10px;
}
/* sec1.sec2 */
.main .sec1,.main .sec2{
    margin:12px 0;
    background-color: #fff;
}
.main .sec1 ul,
.main .sec2 ul{
    padding:10px 15px;
}
.main .sec1 ul li a,
.main .sec2 ul li a{ 
    display:flex;
    align-items: center;
}
.sec1 ul li a .right,
.sec2 ul li a .right{
    width:15%;
    
    display:flex;
    /* justify-content:center; */
    align-items:center;
}
.sec1 ul li a .left,
.sec2 ul li a .left{
    width:85%;
    border-bottom:2px solid  #f2f2f2;
    display:flex;
    justify-content:space-between;
    align-items:center;
}

/* f码通道 */
/* 设置 */
.sec3,.sec4{
    margin:12px 0;
    background-color:#fff;
}

.sec3 .fcode a,
.sec4 .set a{
    padding:10px 15px;
    display:flex;
    align-items: center;
}

.sec3 .fcode a .right,
.sec4 .set a .right{
    width:15%;   
    display:flex;   
    align-items:center;
}
.sec3 .fcode a .left,
.sec4 .set a .left{
    width:85%;
    display:flex;
    justify-content:space-between;
    align-items:center;
}

</style>
