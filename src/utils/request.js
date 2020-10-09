/**
 * 封装 axios 请求模块
 */
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://81.68.197.3:5000' // 基础路径
})

export default request
