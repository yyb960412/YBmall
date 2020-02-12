<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>

    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" v-show="isTabControlShow" class="tab-show" ref="tabControl2"></tab-control>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" 
    :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperLoad"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <home-feature></home-feature>

      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1"></tab-control>

      <goods-list :goods="showGoods"></goods-list>
    </scroll>

      <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'

import TabControl from 'components/content/tabcontrol/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import BackTop from 'components/content/backtop/BackTop.vue'

import {getHomeMultidata,getHomeGoods} from 'network/home.js'

import HomeSwiper from './childComp/HomeSwiper.vue'
import HomeRecommend from './childComp/HomeRecommend.vue'
import HomeFeature from './childComp/HomeFeature.vue'

export default {
  name: 'Home',
  components:{
    NavBar,
    Scroll,

    TabControl,
    GoodsList,
    BackTop,

    HomeSwiper,
    HomeRecommend,
    HomeFeature,
  },
  data(){
    return {
      banners: [],
      recommends:[],
      titles:[],
      goods:{
        'pop': {page: 0, list:[]},
        'new': {page: 0, list:[]},
        'sell': {page: 0, list:[]},
      },
      currentType: 'pop', //记录当前数据类型
      isShowBackTop: false,  
      tabControlHeight: 0, //记录当前tabControl的高度
      isTabControlShow: false, //判断文字栏是否显示，默认不显示
      saveY: 0, //记录手指滑动的位置
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created(){
    this.getHomeMultidata()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  
  //保持当前位置不变
  activated(){
    this.$refs.scroll.refresh()
    // console.log('activated的Y位置   '+ this.saveY)
    this.$refs.scroll.scrollTo(0, this.saveY,0)
  
  },
  deactivated(){
    this.saveY = this.$refs.scroll.scroll.y
    // console.log(this.saveY)
  },

  mounted(){
    //监听图片加载完成
    const refresh = this.debounce(this.$refs.scroll.refresh,100)
    this.$bus.$on('itemImageLoad',()=>{
      // this.$refs.scroll.refresh()
      refresh()
    })
  },
  methods:{
    //防抖函数
    debounce(func, delay){
      let timer = null
      return function(...args){
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{
          func.apply(this,args)
        },delay)
      }
    },
    //事件监听的方法
    tabClick(index){
      // console.log(index)
      switch (index){
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    backTop(){
      this.$refs.scroll.scrollTo(0,0)
    },

    contentScroll(position){
      this.isShowBackTop = (-position.y)>1000
      // console.log( this.isTabControlShow = (-position.y) > this.tabControlHeight)
      this.isTabControlShow = (-position.y + 44) > this.tabControlHeight
    },

    loadMore(){
      this.getHomeGoods(this.currentType)
    },

    swiperLoad(){
      this.tabControlHeight = this.$refs.tabControl1.$el.offsetTop
      // console.log(this.$refs.tabControl1.$el.offsetTop)
    },

    //网络请求的相关方法
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
      //console.log(res)
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
        // console.log(res)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
  /* #home{
    padding-top: 44px;
    height: 100vh;
  } */
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    
    /* position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9; */
  }

  .tab-show{
    position: fixed;
    top:44px;
    left: 0;
    right: 0;
    z-index: 9;
  }
  .content{
    height: calc(100vh - 93px);
    overflow: hidden;
    /* margin-top: 44px; */
  }
</style>