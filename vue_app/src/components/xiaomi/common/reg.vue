<template>
    <div class="container">
        <div class="title">
           <h4>注册小米账号</h4>
        </div>
        <div class="country">
            <p>中国</p>
        </div>
        <div class="remind">成功注册后,国家地区不能被修改</div>
        <div class="regAccount">
            <span>+86</span><input type="number" placeholder="请输入11位手机号" v-model="uphone">          
        </div>
        <div class="regUpw">
             <input type="password" placeholder="请输入6位密码" v-model="upass">
        </div>
        <div class="regBtn">
            <mt-button size="large" class="reg"  @click="reg">立即注册</mt-button>
        </div>
        <div class="clause">
            <input type="checkbox" id="select"  ref="select" >
            <label for="select">注册帐号即表示您同意并愿意遵守小米 <a href="#">用户协议</a>和<a href="#">隐私政策</a></label>
        </div>
        <div class="fontSelect">
            <ul>
                <li><a href="#">简体</a></li><span>|</span>
                <li><a href="#">繁体</a></li><span>|</span>
                <li><a href="#">English</a></li><span>|</span>
                <li><a href="#">常见问题</a></li><span>|</span>
                <li><a href="#">隐私政策</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            uphone:"",
            upass:""

        }
    },
    methods:{
        reg(){
            var select=this.$refs.select;
            //console.log(select)
            if(select.checked==false){
                this.$toast("请认真阅读用户协议和隐私");
                return;
            }
            var uphone=this.uphone;
            var upass=this.upass;
            var ptest=/^1[3-9]\d{9}$/;
            var utest=/^\d{6}$/;
            if(!ptest.test(uphone)){
                this.$toast("用户名格式不正确");
                return;
            };
            if(!utest.test(upass)){
                this.$toast("密码格式不正确");
                return;
            }          
            var qs=this.qs.stringify({uphone,upass})
            this.axios({
                method:"post",
                url:"reg",
                data:qs
            }).then((result)=>{
                if(result.data.code==200){
                    this.$toast("注册成功");
                    this.$router.push("/login");
                }else{
                    this.$toast({
                        message:result.data,
                        position:"top",
                    });
                }
            })
        }
    }
}
</script>

<style scoped>
.container{
    padding:0 35px;
}
.container>.title{
    padding:50px 0px;
    text-align:center;
}
.container>.title>h4{
    font-size:20px;
}

/* 清除input外边距 */
.container input{
    margin-bottom:0px;
    border:none;
}

.country{
    border-bottom:1px solid #d3d3d3; 
}
.country p{
    font-size:20px;
    color:#000;
}

.container .remind{
    margin:5px 0px;  
    font-size:8px;
    color:#d3d3d3;
}

/* 注册手机号 */
.container .regAccount{
    display: flex;
    border-bottom:1px solid #d3d3d3;

}
.regAccount span{
    padding:10px 0px;
}
/* 注册密码 */
.container .regUpw{
    border-bottom:1px solid #d3d3d3;
}

.container .regUpw  input{
    padding-left:45px;
}

/* 注册btn */
.container .regBtn{
    padding:35px 0px;
}
.container .regBtn .reg{
    background:#ff6700;
    border-radius:10px;
    color:#fff;
}

/* 同意条款 */
.container .clause{
    display:flex;
    align-items:center;
}
.clause>label{
    font-size:12px;
    color:#9b9b9b;
}

.container .fontSelect{
    padding-top:100px;
}

.fontSelect ul{
    display:flex;
    justify-content:center;
    font-size:10px;
    color:#9b9b9b;
}
.fontSelect ul span{
    margin:0px 10px 1px 10px;
}
</style>
