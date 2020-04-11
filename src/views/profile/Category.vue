<template>
  <div id="category">
    <nav-bar class="nav_category"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      <scroll id="tab-content" :data="[categoryData]">
        <div>
          <tab-content-category :subCategories="showSubCategory"></tab-content-category>
          <tab-control :title="['综合', '新品', '精选']" @tabClick="tabClick"></tab-control>
          <tab-content-detail :categoryDetail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import TabControl from 'components/content/tabcontrol/TabControl.vue'

import {getCategory, getSubCategory, getCategoryDetail} from 'network/category.js'
import {tabControlMixin} from 'common/mixin.js'

import TabMenu from './childComp/TabMenu'
import TabContentCategory from './childComp/TabContentCategory'
import TabContentDetail from './childComp/TabContentDetail'

export default {
  name: 'Category',
  components: {
    NavBar,
    Scroll,
    TabControl,

    TabMenu,
    TabContentCategory,
    TabContentDetail,
  },
  mixins: [tabControlMixin],
  data(){
    return{
      categories: [],
      categoryData: {},
      currentIndex: -1,
    }
  },
  computed:{
    showSubCategory(){
      if(this.currentIndex === -1){
        return {}
      }else{
        return this.categoryData[this.currentIndex].subCategories
      }
      
    },
    showCategoryDetail(){
      if(this.currentIndex === -1){ 
        // console.log('currentIndex=-1')
        return
      }else{
        // console.log(this.categoryData[this.currentIndex].categoryDetail[this.currentType])
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
      
      // console.log(this.currentType)
      // console.log(this.currentIndex)
      // console.log(this.categoryData[this.currentIndex])
     
    }
  },
  created(){
    this._getCategory()
  },
  methods: {
    _getCategory(){
      getCategory().then(res=>{
        //获取分类数据
        this.categories = res.data.category.list
        // console.log(this.categories)
        //初始化每个类别的子数据
        for(let i = 0; i<this.categories.length; i++){
          this.categoryData[i] = {
            subCategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        //请求第一个分类的数据
        this._getSubCategories(0)
      })
    },
    _getSubCategories(index){
      this.currentIndex = index
      const maitKey = this.categories[index].maitKey
      getSubCategory(maitKey).then(res=>{
        // console.log(res.data)
        this.categoryData[index].subCategories = res.data
        this.categoryData = {...this.categoryData}
        this._getCategoryDetail('pop')
        this._getCategoryDetail('new')
        this._getCategoryDetail('sell')
      })
    },
    _getCategoryDetail(type){
      const miniWallkey = this.categories[this.currentIndex].miniWallkey
      getCategoryDetail(miniWallkey, type).then(res=>{
        // console.log(res)
        //将获取的数据保存起来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
      })
    },

    selectItem(index){
      this._getSubCategories(index)
    },
    // tabClick(index){
    //   // console.log(index)
    //   switch (index){
    //     case 0:
    //       this.currentType = 'pop';
    //       break;
    //     case 1:
    //       this.currentType = 'new';
    //       break;
    //     case 2:
    //       this.currentType = 'sell';
    //       break;
    //   }
    // }
  }
}
</script>

<style scoped>
  #category{
    height: 100vh;
  }

  .nav_category{
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }

  .content{
    position: absolute;
    left: 0;
    top: 44px;
    bottom: 49px;
    right: 0;

    display: flex;
  }

  #tab-content{
    flex: 1;
    height: 100%;
  }
</style>