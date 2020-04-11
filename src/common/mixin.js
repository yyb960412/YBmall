import {debounce} from './utils'
import BackTop from 'components/content/backtop/BackTop'

export const itemListenerMixin = {
  data(){
    return {
      itemListenerMixin: null
    }
  },
  mounted(){
    let newRefresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemListenerMixin = () =>{
      newRefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemListenerMixin)
    // console.log('我是混入的内容')
  }
}

export const backTopMixin = {
  data: function () {
    return {
      isShowBackTop: false
    }
  },
  components:{
    BackTop
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    }
  }
}

export const tabControlMixin = {
  data: function(){
    return {
      currentType: 'pop'
    }
  },
  methods:{
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      console.log(this.currentType)
    }
  }
}
