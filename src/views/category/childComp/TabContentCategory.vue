<template>
  <div>
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subCategories.list">
      <div class="item" v-for="(item, index) in subCategories.list" :key="index">
        <a :href="item.link">
          <img :src="item.image" class="item-img">
          <div class="item-title">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
import GridView from 'components/common/gridview/GridView.vue'

export default {
  name: 'TabContentCategory',
  components:{
    GridView,
  },
  props:{
    subCategories: {
      type: Object,
      default(){
        return []
      }
    }
  }
}
</script>

<style>
  /* .pane img{
    width: 100%;
  } */

  .item{
    text-align: center;
    font-size: 12px;
  }

  .item-img{
    width: 80%;
  }

  .item-text{
    margin-top: 15px;
  }
</style>