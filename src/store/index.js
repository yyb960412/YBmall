import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList:[]
  },
  mutations: {
    addCart(state,payload){
      let oldProduct = state.cartList.find(item => item.iid === payload.iid)

      if(oldProduct){
        oldProduct.count += 1
      }else{
        payload.count =1
        payload.checked = true
        state.cartList.push(payload)
      }
    }
  },
  getters:{
    cartList(state) {
      return state.cartList
      // console.log(state.cartList)
    },
    cartCount(state, getters) {
      return getters.cartList.length
    }
  },
  actions: {
  },
  modules: { 
  }
})
