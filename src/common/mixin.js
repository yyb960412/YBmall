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