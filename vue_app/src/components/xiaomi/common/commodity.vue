<template>
    <div class="container">
        <div class="top">
            <p class="subtitle">商品</p>
        </div>
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
    </div>   
</template>

<script>
export default {
    data(){
        return{
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
.top{
    padding:10px;
    background:#f2f2f2;
    display:flex;
    justify-content: center;
    align-items: center;
}
.top .subtitle{
    font-size:20px;
}

.selected{
    display:flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.selPro{  
    padding:5px;
    width:50%;
    /* box-shadow: 0 0 10px #999595; */
}
.selPro  img{
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

</style>
