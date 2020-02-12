<template>
      <swiper>
        <swiper-item v-for="(item,index) in banners" :key="index">
          <a :href="item.link">
            <img :src="item.image" @load="imageLoad">
          </a>
        </swiper-item>
      </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index.js'

export default {
  name: 'HomeSwiper',
  components: {
    Swiper,
    SwiperItem,
  },
  data(){
    return {
      isLoad: false
    }
  },
  props:{
    banners:{
      type: Array,
      default: []
    }
  },
  methods:{
    imageLoad(){
      if(!this.isLoad){
        // console.log(11111)
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
      
  }
}
</script>

<style scoped>
  
</style>