<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item,index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image">
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props:{
    recommends:{
      type: Array,
      default: []
    }
  }
}
</script>

<style scoped>
  .recommend{
    display: flex;
    padding: 10px 0 15px;
    border-bottom: 10px solid #eee
  }

  .recommend-item{
    flex: 1;
    text-align: center
  }

  .recommend img{
    width: 65px;
    height: 65px;
    margin-bottom: 10px;
  }
</style>