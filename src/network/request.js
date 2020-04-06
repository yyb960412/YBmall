import axios from 'axios'

export function request(config){
  //1.创建vue实例
  const instance = axios.create({
    // baseURL: 'http://123.207.32.32:8000',
    baseURL: 'http://106.54.54.237:8000/api/xxx',
    timeout: 5000
  })

  //2.axios拦截器
  //2.1请求拦截
  instance.interceptors.request.use(config=>{
    //console.log(config)
    return config
  },err=>{
    //console.log(err)
  })

  //2.2响应拦截
  instance.interceptors.response.use(res=>{
    //console.log(res)
    return res.data
  },err=>{
    console.log(err)
  })

  //3.发送真正的网络请求
  return instance(config)//返回的是promise,调用的时候使用.then
}
