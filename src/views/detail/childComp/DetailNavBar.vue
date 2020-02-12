<template>

    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/images/common/back.svg">
      </div>
      <div slot="center" class="title">
        <div class="title-item" :class="{active:currentIndex === index}"  @click="detailNav(index)" v-for="(item,index) in titles" :key="index">
          {{item}}
        </div>
      </div>
    </nav-bar>

</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

export default {
  name: 'DetailNavBar',
  components:{
    NavBar
  },
  data(){
    return{
      titles:['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  methods:{
    detailNav(index){
      this.currentIndex = index
      this.$emit('DTitleClick',index)
    },
    backClick(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .title{
    display: flex;
  }
  .title-item{
    flex: 1
  }

  .active{
    color: var(--color-high-text)
  }

  .back img{
    margin-top: 10px
  }
</style>