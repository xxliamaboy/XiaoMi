<template>
    <div class="count">
        <button @click="sub">-</button>
        <span>{{n}}</span>
        <button @click="add">+</button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            n:this.count,         
        }
    },
    props:["count"],
    methods:{
        sub(){ 
            if(this.n>1){
            this.n--; 
            this.$emit("chang",this.n);
            }
        },
        add(){ this.n++;
            this.$emit("chang",this.n)
        },
    },
    
}
</script>

<style scoped>
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
</style>
