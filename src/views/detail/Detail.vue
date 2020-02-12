<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @DTitleClick="DTitleClick" ref="detailNav"> </detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="detailScroll">
      <!-- <div v-for="(item,index) in $store.state.cartList" :key="index">{{item}}</div> --> 
      <detail-swiper :topImages="topImage"></detail-swiper>
      <detail-base-info :goods="good"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="dataInfo" @DGimageLoad="detailImageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramsInfo" ref="params"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>

      <goods-list :goods="recommend" ref="recommend"></goods-list>
      
    </scroll>
    <detail-bottom-info @addToCart="addCart"></detail-bottom-info>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from './childComp/DetailNavBar.vue'
import DetailSwiper from './childComp/DetailSwiper.vue'
import DetailBaseInfo from './childComp/DetailBaseInfo.vue'
import DetailShopInfo from './childComp/DetailShopInfo.vue'
import DetailGoodsInfo from './childComp/DetailGoodsInfo'
import DetailParamInfo from './childComp/DetailParamInfo'
import DetailCommentInfo from './childComp/DetailCommendInfo'
import DetailBottomInfo from './childComp/DetailBottomInfo'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'

import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import {debounce} from 'common/utils.js'

import {backTopMixin} from 'common/mixin.js'

export default {
  name: 'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomInfo,

    Scroll,
    GoodsList
  },
  data(){
    return{
      iid: null,
      topImage:[],
      good: {},
      shop:{},
      dataInfo:{},
      paramsInfo:{},
      commentInfo:{},

      recommend:[],
      themesTopY:[],
      getThemesTopY: null,
      currentIndex: 0
    }
  },
  mixins:[backTopMixin],
  created(){
    this.iid = this.$route.params.iid

    getDetail(this.iid).then(res=>{
      
      const data = res.result
      // console.log(data)
      //获取详情页轮播图的数据
      this.topImage = data.itemInfo.topImages
      // console.log(res.result.itemInfo.topImages.length)

      //获取详情页的商品信息
      this.good = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //获取详情页的商铺信息
      this.shop = new Shop(data.shopInfo)

      //展示商品数据
      this.dataInfo = data.detailInfo

      //展示商品参数信息
      this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      
      //保存评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }

      // this.$nextTick(()=>{
      //   this.themesTopY = []
      //   this.themesTopY.push(0)
      //   this.themesTopY.push(this.$refs.params.$el.offsetTop)
      //   this.themesTopY.push(this.$refs.comment.$el.offsetTop)
      //   this.themesTopY.push(this.$refs.recommend.$el.offsetTop)
      // })

      this.getThemesTopY = debounce(()=>{
        this.themesTopY = []
        this.themesTopY.push(0)
        this.themesTopY.push(this.$refs.params.$el.offsetTop)
        this.themesTopY.push(this.$refs.comment.$el.offsetTop)
        this.themesTopY.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themesTopY)
      },100)
    })
    
    getRecommend().then(res=>{
      // console.log(res)
      this.recommend = res.data.list
    })
  },
  methods:{
    detailImageLoad(){
      this.$refs.scroll.refresh()
      // console.log('详情图片加载次数')
      this.getThemesTopY()
    },
    DTitleClick(index){
      // console.log(index)
      this.$refs.scroll.scrollTo(0,-this.themesTopY[index]+42,300)
    } ,
    detailScroll(position){
      // console.log(positionY)
      for(let i =0; i< this.themesTopY.length;i++){
         if( -position.y > this.themesTopY[i]-44){
          this.currentIndex = i
          // console.log(i)
          this.$refs.detailNav.currentIndex = this.currentIndex
        }
      }
      this.isShowBackTop = (-position.y)>1000
      // console.log(this.isShowBackTop)
    },
    //是否回到顶部
    // contentScroll(position){
    //   this.isShowBackTop = (-position.y)>1000
    //   // console.log( this.isTabControlShow = (-position.y) > this.tabControlHeight)
    //   this.isTabControlShow = (-position.y + 44) > this.tabControlHeight
    // },
    addCart(){
      // console.log("点击添加购物车")
       // 1.创建对象
      const obj = {}
      // 2.对象信息
      obj.iid = this.iid;
      obj.imgURL = this.topImage[0];
      obj.title = this.good.title;
      obj.desc = this.good.desc;
      obj.newPrice = this.good.nowPrice;
      // 3.添加到Store中
      this.$store.commit('addCart', obj)
    } 
  }
}
</script>

<style scoped>
  .detail{
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh
  }

  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #ffffff
  }

  .content{
    height: calc(100% - 44px);
    overflow: hidden;
  }
</style>