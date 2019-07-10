<template>
    <mt-navbar v-model="selected">
            <mt-tab-item id="1">option A</mt-tab-item>
    </mt-navbar>
            <!-- tab-container -->
        
</template>

<script>
export default {
    beforeRouteEnter(to,from,next){
      if(!sessionStorage.askPositon || from.path == '/' || from.path == '/screen' || from.path == '/      area-select' || from.path == '/citySearch'){//当前页面刷新不需要切换位置
        sessionStorage.askPositon = '';
        next(vm => {
          vm.fetchData()
        });
      }else{
        next(vm => {
          if(vm && vm.$refs.my_scroller){//通过vm实例访问this
          vm.$refs.my_scroller.scrollTo(0, sessionStorage.askPositon, true);
            setTimeout(function () {
            vm.$refs.my_scroller.scrollTo(0, sessionStorage.askPositon, true);
            },0)//同步转异步操作tTime
          }
        })
      }
    }
}
</script>
    

<style>

</style>
