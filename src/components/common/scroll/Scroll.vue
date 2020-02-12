<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  data(){
    return{
      scroll: null
    }
  },
  props:{
    probeType:{
      type: Number,
      default: 0
    },
    pullUpLoad:{
      type: Boolean,
      default: false
    }
  },
  mounted(){
    //1、创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType:this.probeType,
      click: true,
      pullUpLoad:this.pullUpLoad,
    })

    //2.监听滚动位置
    this.scroll.on('scroll',(position)=>{
      // console.log(position)
      this.$emit('scroll', position)
    })

    //3.监听上拉加载
    this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })
  },
  methods:{
    scrollTo(x,y,time=800){
      this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    refresh(){
      // console.log("防抖")
      this.scroll.refresh()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>