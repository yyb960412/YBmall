<template>
  <grid-view>
     <!-- <goods-list-item v-for="(item, index) in categoryDetail" :key="index" :goodsItem="item"></goods-list-item> -->
    <div v-for="(item,index) in categoryDetail" :key="index">
       <div class="goods-item" @click="gItemClick"> -->
        <!-- <img v-lazy="showImage" :key="showImage" @load="imageLoad"> -->
        <img :src="item.img" @load="imageLoad">
        <div class="goods-info">
          <p>{{item.title}}</p>
          <span class="price">{{item.price}}</span>
          <span class="collect">{{item.cfav}}</span>
        </div>
      </div>
    </div>
  </grid-view>
</template>

<script>
import GridView from 'components/common/gridview/GridView.vue'
import GoodsListItem from 'components/content/goods/GoodsListItem.vue'

export default {
  name: 'TabContentDetail',
  components:{
    GridView,
    GoodsListItem,
  },
  props:{
    categoryDetail:{
      type: Array,
      default(){
        return []
      }
    }
  },
  methods:{
    imageLoad(){
      //  if(this.$route.path.indexOf('/home')){
      //   this.$bus.$emit("itemImageLoad")
      // }
    },
    gItemClick(){
      this.$router.push('/detail/' + this.item.iid)
    }
  }
}
</script>

<style>
  .goods-item {
    padding-bottom: 50px;
    position: relative;

    width: 50%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
    /* border:3px solid var(--color-tint); */
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/images/common/collect.svg") 0 0/14px 14px;
  }
</style>