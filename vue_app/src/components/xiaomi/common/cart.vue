<template>
    <div class="container">
        <div class="top">
            <div @click="back"><img src="../../../assets/cart/leftarrow.png" class="topImg"></div>
            <p class="subtitle">购物车</p>
            <div><img src="../../../assets/cart/search.png" class="topImg"></div>
        </div>
        <div class="selectAll" v-if="ishas">
            全选
            <input type="checkbox" @click="selectAll"  v-model="allchecked">
        </div>
        <div v-if="!ishas" >购物车为空,请添加商品.......</div>
        <div class="porlist">
            <div class="proItem" v-for="(item,index) of prolist" :key=index>
                <input type="checkbox" v-model="item.cb" @click="select" :data-index=index>
                <img :src="require(`../../../assets/product/box/${item.img}`)" class="proImg">
                <div>
                    <p>{{`${item.cname} ${item.edi} ${item.color}`}}</p>
                    <p><span>售价：</span><span>{{item.price}}元</span></p>                   
                    <div class="count">
                        <button @click="sub" :data-index=index>-</button>
                        <span>{{item.count}}</span>
                        <button @click="add" :data-index=index>+</button>
                    </div>
                </div>
                <img src="../../../assets/cart/trash.png" class="trash" @click="del" :data-id="item.cid" :data-count="item.count" :data-price="item.price">
            </div>
        </div>
        <div class="bottomSubmit">
            <div class="price">               
                <p>共{{sum}}件 金额:</p>
                <p>{{total}}元</p>               
            </div>
            <div class="goBack"><a href="javascript:;">继续购物</a></div>
            <div class="settlement"><a href="javascript:;">去结算</a></div>
        </div>
    </div>
</template>

<script>
import Mycounter from "./counter.vue"
export default {
    data(){
        return{
            prolist:[],                   
            choice:0, //同过单选的个数来判断全选功能。
            allchecked:false,
            sum:0,
            total:0,
            ishas:true
        }
    },
    created(){
        this.cart();     
    },
    components:{
        "mycounter":Mycounter
    },
    methods:{
        back(){
            this.$router.push("/");
            this.$emit("home","commodity")
        },
        sub(e){ 
            var index=e.target.dataset.index
            var n=this.prolist[index].count
            if(n>1){
            this.prolist[index].count--; 
                var price=this.prolist[index].price;
                if(this.prolist[index].cb==true){
                    this.sum--;
                    this.total-=price;
                }
            }
            
        },
        add(e){ 
            var index=e.target.dataset.index;       
            this.prolist[index].count++;
            var price=this.prolist[index].price
            if(this.prolist[index].cb==true){
                this.sum++;
                this.total+=price;
            }                 
        },
        selectAll(e){
            var all=e.target;      
            if(all.checked==true){
                this.sum=0;
                this.total=0;           
                for(var i=0;i<this.prolist.length;i++){
                    var count=parseInt(this.prolist[i].count);
                    this.prolist[i].cb=true;
                    this.sum+=count;
                    this.total+=this.prolist[i].price*count;
                    this.choice=this.prolist.length;                  
                }               
            }else{
                for(var i=0;i<this.prolist.length;i++){
                    this.prolist[i].cb=false;                  
                }
                this.sum=0;
                this.total=0;
                this.choice=0;
            }            
        },
        select(e){
            var select=e.target;
            var index=e.target.dataset.index;            
            var count=parseInt(this.prolist[index].count);
            var price=parseInt(this.prolist[index].price)*count;
            if(select.checked==true){
                this.prolist[index].cb=true;
                this.choice++;               
                this.sum+=count;
                this.total+=price;
                if(this.choice==this.prolist.length){
                    this.allchecked=true;
                }
            }else{
                this.prolist[index].cb=false;
                this.choice--;
                this.sum-=count;
                this.total-=price;
                this.allchecked=false;
            }
        },
        cart(){
            var uphone_id=sessionStorage.getItem("uphone");
            this.axios.get("cart",{params:{uphone_id}}).then((result)=>{
                var rows=result.data;
                //每个商品添加cb，用来判断checkbox。        
                for(var i=0;i<rows.length;i++){
                    rows[i].cb=false;
                }
                this.prolist=rows;
                if(this.prolist.length==0){
                this.ishas=false;
                }else{
                this.ishas=true; 
                }
            })
        },
        del(e){
            var cid=e.target.dataset.id
            console.log(cid);
            this.axios.get("del",{params:{id:cid}}).then((result)=>{
                this.cart();
                this.sum=0;
                this.total=0;
                this.allchecked=false;
            })
        }
    }
}
</script>

<style scoped>
p{margin:0;padding:0}
.top{
    padding:10px;
    background:#f2f2f2;
    display:flex;
    justify-content: space-between;
    align-items: center;

}
.top .subtitle{
    font-size:20px;
}

/* 全选框 */
.selectAll{
    padding:10px 15px;
    box-shadow: 0px 2px 2px #686262;
}
/* 产品内容 */
.proItem{
    margin:10px 10px;
    position:relative;
    padding:10px 15px;
    display:flex;
    align-items: center;
    translate: 0px;
    box-shadow: 0px 0px 12px #686262;   
}

.proImg{
    width:105px;
}
.trash{
    position:absolute;
    bottom:20%;
    right:5%;
}

.count{
    width:70px;
    display:flex;
    justify-content:space-between;
    align-items:center;
}
.count span{
    font-size:20px;
}

.count button{
    padding:2px 8px;
}

/* 底部提交框 */
.bottomSubmit{
    width:100%;
    background: #fff;
    height:55px;
    display:flex;
    align-items: center;
    position:fixed;
    z-index: 10;
    bottom:0;
    box-shadow: 0px -1px 15px #686262;
}
.bottomSubmit .price{
    
    width:33.3333%;
    text-align: center;
}

.bottomSubmit .goBack,
.bottomSubmit .settlement{
    width:33.3333%;
    height:100%;  
    display:flex;
    justify-content: center;
    align-items: center;
}

.bottomSubmit .goBack{
    background:#f6f6f6;
}
.goBack a{
    color:#000;
    font-size:15px;
}
.bottomSubmit .settlement{
    background:#ff6700;
    color:#fff;
}
.settlement a{
    color:#fff;
    font-size:15px;
}
</style>
