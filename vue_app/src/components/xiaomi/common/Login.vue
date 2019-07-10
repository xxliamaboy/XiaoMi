<template>
    <div class="container">
       <div class="content">
            <div class="mlogo">
                <router-link to="/home"><img src="../../../assets/xiaomi.jpg"></router-link>
                <h4>小米账号登录</h4>
            </div> 
            <div class="inputBox" >
                <div class="userinput">
                    <mt-field type="text" :placeholder=userPlaceholder v-model="uphone"></mt-field>
                </div>
                <div class="passinput"> 
                    <mt-field  type="password" :placeholder=userchang v-model="upass" v-show="!chang"></mt-field>
                    <mt-field  type="number" :placeholder=userchang v-model="inpuVer"  v-show="chang"></mt-field>
                    <!-- <a class="getMessage" href="javascript:;" v-show="chang" @click="get" disabled>获取验证码({{time}})</a> -->
                    <button @click="get" v-show="chang" >获取验证码({{time}})</button>
                </div>
            </div>
            <div class="loginReg">               
                <mt-button size="large" class="login" @click="login">{{defaultMode}}</mt-button>
                <mt-button size="large" class="reg" @click="regSwitch">{{defaultMode2}}</mt-button>
            </div>
            <div class="forget" v-show="!chang"><router-link to="/reg">立即注册</router-link><span>|</span><a href="#">忘记密码?</a></div>
            <div class="otherLogins">
                <fieldset>
                    <legend>其他登录方式</legend>
                </fieldset>
                <div class="Img">
                    <a href="#" v-for="(item,index) of Imglist" :key=index>
                        <img :src="require(`../../../assets/${item}.png`)" alt="">
                    </a>                  
                </div>   
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
    </div>
</template>

<script>
export default {
    data(){
        return{
            Imglist:["d1","d2","d3","d4"],
            userPlaceholder:"请输入登录的手机号11位",
            userchang:"请输入6位密码",
            chang:false,
            defaultMode:"登录",
            defaultMode2:"手机验证码登录" ,            
            uphone:"", 
            upass:"",
            inpuVer:"",
            verificationCode:"" ,
            time:60 
        }
    },
    methods:{
        get(e){
            var number="";
            for(var i=0;i<6;i++){
                number+=parseInt(Math.random()*10)
            }
            this.$toast({
                "message":number,
                "duration":5000,
                "position":"top"
            });
            this.verificationCode=number;
            var get=e.target;
            get.disabled=true;
            var second=setInterval(() => {
                this.time--;
                if(this.time==0){
                    get.disabled=false;
                    this.time=60;
                    clearInterval(second);
                }
            }, 1000);

        },
        regSwitch(){
            if(this.defaultMode2=="手机验证码登录"){
                this.userchang="请输入6位验证码"
                this.defaultMode="立即登录",
                this.defaultMode2="用户密码登录"
            }else{             
                this.userchang="请输入6位密码"
                this.defaultMode="登录";
                this.defaultMode2="手机验证码登录";
            }
           this.chang=!this.chang;
        },
        login(){
            var uphone=this.uphone;
            var upass=this.upass;
            var ptest=/^1[3-9]\d{9}$/;
            var utest=/^\d{6}$/;
            if(!ptest.test(uphone)){
                this.$toast("用户名格式不正确");
                return;
            };
            if(!utest.test(upass) && this.defaultMode2=="手机验证码登录"){
                this.$toast("密码格式不正确");
                return;
            }
            if(!this.inpuVer && this.defaultMode2=="用户密码登录"){
                this.$toast("验证码不能为空");
                return;
            }else if(this.verificationCode!=this.inpuVer && this.defaultMode2=="用户密码登录"){    
                if(this.verificationCode=='' && this.time!=60){                 
                    this.$toast({
                        message:`验证码已失效,请${this.time}秒后从新登录`,
                        position:"top",
                        duration:900,
                        });
                    return;
                }
                else if(this.verificationCode==''){
                    this.$toast({
                        message:"请获取验证码",
                        position:"top",
                        duration:900,
                        });
                    return;
                };
                this.$toast({
                    message:"验证码不正确,请重新获取验证码",
                    position:"top"
                    });
                this.verificationCode="";
                return;
            }
            if(uphone==sessionStorage.getItem("uphone")){
                this.$toast("用户已登录");
                return;
            }
            if(this.defaultMode2=="手机验证码登录"){
                var obj={uphone,upass};
                this.axios.get("login",{params:obj}).then((result)=>{
                if(result.data.code==1){
                    this.$messagebox("登录成功");
                    sessionStorage.setItem("uphone",this.uphone);
                    this.$router.push("/Home");              
                }else{
                    this.$messagebox(result.data.msg);
                }
                })
            }else{
                var obj={uphone}
                this.axios.get("login",{params:obj}).then((result)=>{
                    if(result.data.code==1){
                        this.$messagebox("登录成功");
                        sessionStorage.setItem("uphone",this.uphone);
                        this.$router.push("/Home");              
                    }else{
                        this.$messagebox(result.data.msg);
                    }
                })
            }
        }
    }
}
</script>

<style scoped>
.container{    
    background:#fff;
}

.content{
    padding:25px;
}

.mlogo{
    text-align:center;
    
}

.mlogo img{
    width:48px;
    height:48px;
}
.inputBox{
    margin:10px 0px;
    border:none;
}

.inputBox .userinput,
.inputBox .passinput{
    border-bottom:1px solid #d3d3d3;
}

.inputBox>>>input{  
    width:200px !important;   
    margin-top:10px;
    margin-bottom:0;
    padding:30px 0px;
    border:none;
    border-radius:0;
    
}

.passinput{
    display:flex;
    justify-content:space-between;
    align-items:center;
}


.passinput .getMessage{
    /* width:50%; */
    font-size:15px;  
} 

.loginReg{
    padding:20px 0px;
}
.loginReg .login{
    margin-bottom:20px;
    background:#ff6700;
    border-radius: 10px;
    color:#fff;
}

.loginReg .reg{
    margin-top:10px;
    border-radius: 10px;
}

.content .forget{
    display:flex;
    justify-content:center;
    align-items: center; 
    
    
}

.forget a{
    padding:0px 10px;
    color:#9b9b9b;
}

.forget span{
    margin-bottom:1px;
    /* vertical-align:top; */
}

/* 其他登录方式 */
.otherLogins{
    padding-top:20px;
}

.otherLogins fieldset{
    border:none;
    border-top:1px solid #f2f2f2;
    text-align:center;
}

.otherLogins .Img{
    display: flex;
    justify-content:space-around;
}
/* 字体选择 */
.fontSelect{
    padding-top:70px;
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
