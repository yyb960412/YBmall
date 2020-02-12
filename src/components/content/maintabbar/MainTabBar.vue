<template>
    <tab-bar>
      <tab-bar-item path='/home'>
        <img slot="item-icon" src="~assets/images/tabbar/home.svg">
        <img slot="item-active" src="~assets/images/tabbar/home_active.svg">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path='/category'>
        <img slot="item-icon" src="~assets/images/tabbar/category.svg">
        <img slot="item-active" src="~assets/images/tabbar/category_active.svg">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path='/shopcar'>
        <img slot="item-icon" src="~assets/images/tabbar/shopcart.svg">
        <img slot="item-active" src="~assets/images/tabbar/shopcart_active.svg">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path='/profile'>
        <img slot="item-icon" src="~assets/images/tabbar/profile.svg">
        <img slot="item-active" src="~assets/images/tabbar/profile_active.svg">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar.vue'
import TabBarItem from 'components/common/tabbar/TabBarItem.vue'

export default { 
  name: 'MainTabBar',
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>
  
</style>