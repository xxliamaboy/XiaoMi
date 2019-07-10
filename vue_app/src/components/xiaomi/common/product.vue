<template>
    <div class="container" v-if="appear">
        <div class="banner">
            <mt-swipe  :auto="4000" >
                <mt-swipe-item v-for="(item,index) of dellist.colImg" :key=index>
                    <img class="banImage" :src="require(`../../../assets/product/box/${item.img}`)">
                </mt-swipe-item>
            </mt-swipe>
            <a href="javascript:;" class="leftImgage"><img src="../../../assets/product/leftarrow.png" class="icon" @click="back"></a>
            <a href="javascript:;" class="rightImgage"><img src="../../../assets/product/share.png" class="icon"></a>
        </div>
        <div class="mi3">
            <img src="../../../assets/product/mi3.jpg">
        </div>
        <!-- 产品内容productContent-->
        <div class="proCont">
            <h3 class="title">{{proName}}</h3>
            <p class="cont"><span class="font" >{{this.dellist.detail[0].subtitle}}</span>{{this.dellist.detail[0].title}}</p>
            <div class="price">¥{{proEidPrice}}</div>
        </div>
        <!-- 参数 parameter-->
        <div class="param">
            <ul class="paramlist">
                <li class="paramitem" v-for="(item,index) of dellist.para" :key=index>
                    <img :src="require(`../../../assets/product/${item.img}.png`)" alt="">
                    <p class="name">{{item.pname}}</p>
                    <p class="value">{{item.val}}</p>
                </li>
            </ul>
        </div>
        <!-- purchase购买 -->
        <div class="purContent">
            <div class="specContent">
                <!-- Specifications规格 -->
                <div class="spec">
                    <a href="javascript:;" @click="display"><span class="left">已选</span><div class="right"><span>{{`${proName} ${proEid} ${proColor}`}}x {{count}}</span><img src="../../../assets/product/arrow-righty.png"></div></a>
                </div>
                <div class="addr">
                    <a href="javascript:;"><span class="left">送至</span><div class="right"><span>广东省 广州市</span><img src="../../../assets/product/arrow-righty.png"></div></a>
                </div>
                <div class="mark">
                    <a href="avascript:;">
                        <div class="self"><img src="../../../assets/product/yes.png"><span>小米自营</span></div>
                        <div class="delive"><img src="../../../assets/product/yes.png"><span>小米发货</span></div>
                        <div class="back"><img src="../../../assets/product/yes.png"><span>七天无理由退货</span></div>
                        <img src="../../../assets/product/arrow-righty.png">
                    </a>
                </div>
            </div>
        </div>
        <!-- 底部购-买框购买purchase -->
        <div class="purbox">
            <div class="left">
                <a href="javascript:;" @click="gohome"><img class="purImage" src="../../../assets/product/home.png"><p>首页</p></a>
                <a href="javascript:;" @click="gocart"><img class="purImage" src="../../../assets/product/car.png"><p>购物车</p></a>
            </div>
            <div class="right">
                <a href="javascript:;" @click="display">加入购物车</a>
            </div>
        </div>
        <!-- 手机规格specifications -->
        <div class="proSpe" :class="selected?'display':''">
            <div class="close" @click="close"><img src="../../../assets/product/box/close.png"></div>
            <div class="proInfo">
                <div><img class="proImg" :src="require(`../../../assets/product/box/${dellist.colImg[cActive].img}`)" alt=""></div>
                <div>
                    <p>¥{{proEidPrice}}</p>
                    <p>{{`${proName} ${proEid} ${proColor}`}}</p>
                </div>
            </div>
            <div class="max">
                <div class="edition">
                    <h5 class="title">版本</h5>
                    <div class="select"  v-for="(item,index) of dellist.edi" :key=index :class="eActive==index?'orange':''"  @click="edition(index)"><p :class="eActive==index?'color':''">{{item.configure}}</p><p :class="eActive==index?'color':''">{{item.price}}元</p></div>
                </div>
                <div class="color">
                    <h5 class="title">颜色</h5>
                    <!-- colorselect -->
                    <div class="colSel">                   
                        <p :class="cActive==index?'orange':''"  v-for="(item,index) of dellist.colImg" :key="index" @click="color(index)">{{item.color}}</p> 
                    </div>
                </div>
                <div class="purchaseQuantity">
                    <p>购买数量</p>
                    <mycounter :count="count"  v-on:chang="chang"></mycounter>
                </div>
            </div>          
            <div class="cart"><a href="javascript:;" @click="insert">加入购物车</a></div>
        </div>
    </div>
</template>

<script>
import Mycounter from "./counter.vue"
export default {
    data(){
        return{          
            dellist:{},
            selected:false,
            eActive:0,
            cActive:0,
            appear:false,
            proName:"",
            proEid:"",
            proEidPrice:"",
            proColor:"",
            Img:"",
            count:1        
        }
    },
    props:["lid"],   
    created(){
        this.det();
        //console.log(this.lid);
    },
    methods:{
        gohome(){
            this.$router.push("/");
        },
        gocart(){
            this.$router.push("/cart");
        },
        back(){
            history.go(-1);
        },
        chang(n){
            this.count=n;
        },
        display(){
            this.selected=true;
        },
        close(){
             this.selected=false;
        },
        edition(index){
            this.proEid=this.dellist.edi[index].configure;
            this.proEidPrice=this.dellist.edi[index].price;
            this.eActive=index;

        },
        color(index){
            this.cActive=index;
            this.img=this.dellist.colImg[index].img;
            this.proColor=this.dellist.colImg[index].color;
        },
        det(){ 
            var did=this.lid
            this.axios.get("detail",{params:{did}}).then((result)=>{
                this.dellist=result.data;               
                if(result.data.code==-1){
                    history.go(-1);
                    this.$toast("没有该商品详情");
                    return;
                }               
                this.appear=true;
                this.proName=result.data.detail[0].dname;
                this.proEid=result.data.edi[this.eActive].configure;
                this.proEidPrice=result.data.edi[this.eActive].price;
                this.proColor=result.data.colImg[this.cActive].color;
                this.img=result.data.colImg[this.cActive].img;                                  
            }) 
        },
        insert(){
            var uphone_id=sessionStorage.getItem("uphone");
            var cname=this.proName;
            var color=this.proColor;
            var edi=this.proEid;
            var price=this.proEidPrice;
            var img=this.img;
            var count=this.count;
            if(sessionStorage.getItem("uphone")==null){
                this.$toast({
                    message:"请先登录",
                    duration:900
                    });
                return;
            }
            this.axios.get("insert",{params:{uphone_id,cname,color,edi,price,img,count}}).then((result)=>{
                this.$toast({
                    message:"添加成功",
                    duration:900,
                });
                this.close();
            })
        }
        
    },
    components:{
        "mycounter":Mycounter
    }
}
</script>

<style scoped>
p,h5{margin:0;padding:0}
.container{
    padding-bottom:22px; 
    height:100%;
}

.container .banner{
    height:415px;
    /* position:relative; */
}

.banImage{
    width:100%;
    height:100%;
}
/* 左右小图标 */
.banner .leftImgage,
.banner .rightImgage{
    width:40px;height:40px;
    background-color:rgba(0,0,0,0.6);
    border-radius:50%;
    position:absolute;
    top:10px;
    left:5%;
    display:flex;
    justify-content: center;
    align-items:center;
}
.banner .rightImgage{
    left:85%;
}
.icon{
    width:15px;
}

.container .mi3 img{
    width:100%;
}
/* 产品内容 */
.container .proCont{
    padding:10px;
}
.proCont .cont{
    margin:5px;
}

.proCont .cont .font{
    color:#ff4a00;
}

.proCont .price{
    color:#ff4a00;
    font-size:25px;
    /* width:100%; */
}


/* 参数 */
.paramlist{
    display:flex;
    overflow: hidden; 
    overflow-x: auto;
}
.paramlist .paramitem{ 
   text-align:center;
   padding:5px 15px;
   
}

.paramitem img{
    width:20px;
    
}
.paramitem .name{
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
    font-size:12px;
    margin:0;
}
.paramitem .value{
    width:61px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
    font-size:5px;
    margin:0;
}

/* purchase购买 */
.purContent{
    padding:10px;
   
}

.purContent .specContent{
    background:#f6f6f6;
    border-radius:15px;
}

.spec a,
.addr a{
    margin-top:10px;
    margin-bottom:10px;
    display:flex;
    align-items: center;
}
.spec a .left,
.addr a .left{
    width:15%;
    font-size:15px;
    text-align:center;
}
.spec a .right,
.addr a .right{
    width:85%;
    display:flex;
    justify-content:space-between;
    align-items: center;
    font-size:15px;
}

/* mark注明 */
.mark a{
    padding-left:8px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    font-size:15px;
}

/* 底部购-买框购买purchase */
.purbox{
    width:90%;
    margin:0 auto;
    background:#fff;
    border:1px solid #f6f6f6;
    border-radius:10px;
    box-shadow: 0px 10px 20px #686262;
    padding: 10px;
    position:fixed;
    bottom:10px;
    left:0;
    right:0;
    display:flex;
    justify-content:space-between;
    align-content: center;
}

/* 购买框小图 */
.purImage{
    width:20px;
}
.purbox .left{
    width:40%;
    display:flex;
    justify-content: space-around;
    align-content: center;
}
.purbox .left a{
    text-align:center;
}
.purbox .right{
    width:60%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.purbox .right a{
    width:70%;
    height:85%;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background:#ff6700;
    color:#fff;
}

/* 弹出框 */
.proSpe{
    position:fixed;
    bottom:0;
    width:100%;
    height:0px;
    background: #fff;
    border-radius:20px 20px 0 0;
    transition:all .3s linear;
    box-shadow: 0px -6px 20px #8a8686;
}
.proSpe .close{
    position:absolute;
    top:10px;
    right:5%;
}

.display{
    height:566px;
}

.proSpe .proInfo{
    padding:35px 10px 10px 10px;
    display: flex;
    align-items: center;
}
.proImg{
    width:105px;
    height:105px
}

/* 中间的滚动条样式 */
.max{
    width:102%;
    height:60%;  
    overflow: hidden;
    overflow-y:auto;
}
.edition{
    padding:15px;
}
.edition .select{
    margin:10px 0;
    border:1px solid #f6f6f6;
    display: flex;
    justify-content: space-between;
    
}
.edition .select p{
    padding:10px;
    font-size:10px;
    
}

.color{
    padding:15px;
}
.color .colSel{  
    display: flex;
    /* justify-content: space-between; */
}
.color .colSel p{
    padding:10px;
    margin-right:20px;
    font-size:10px;
    border:1px solid #f6f6f6
}
/* 购买数量 */
.purchaseQuantity{
    padding:15px;
    display: flex;
    justify-content:space-between;
    align-items:center
}


/* 加入购物车样式 */
.cart{
    padding:10px 20px;
}
.cart a{
    padding:10px;
    display:block;
    background:#ff6700;
    border-radius:20px; 
    color:#fff;
    text-align:center;
}

.orange{
    border:1px solid #ff6700 !important;
    color : #ff6700;
}
.color{
    color:#ff6700 !important;
}

</style>
