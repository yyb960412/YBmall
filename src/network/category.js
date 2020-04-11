import {request} from './request'

export function getCategory(){
  return request({
    url: '/api/hx/category',
  })
}

export function getSubCategory(maitKey){
  return request({
    url: '/api/hx/subcategory',
    params: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type){
  return request({
    url: '/api/hx/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}