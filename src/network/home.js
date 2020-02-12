import {request} from './request.js'

export function getHomeMultidata(){
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page){
  return request({
    url: '/api/hy/home/data',
    params:{
      type,
      page
    }
  })
}