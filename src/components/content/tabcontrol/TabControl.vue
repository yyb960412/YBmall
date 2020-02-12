<<template>
  <div class="tab-control1">
    <div v-for="(item,index) in titles" :key="index" class="tab-control-item" @click="tabClick(index)"
    :class="{active: currentIndex === index}">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  data(){
    return{
      currentIndex: 0
    }
  },
  props:{
    titles:{
      type: Array,
      default(){
        return []
      }
    }
  },
  methods:{
    tabClick(index){
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  }
}

</script>

<style scoped>
  .tab-control1{
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control-item{
    flex: 1;
  }

  .tab-control-item span{
    padding: 5px
  }
  .active{
    color: var(--color-height-tint)
  }

  .active span{
    border-bottom: 3px solid var(--color-tint)
  }
</style>