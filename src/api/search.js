/**
 * 搜索相关接口模块
 */
import request from '@/utils/request'

/**
 * 获取搜索结果
 */
export function getSearch (params) {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}

/**
 * 获取推荐结果
 */
export function getSuggestions (q) {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * 获取推荐结果
 */
export function getUserSerchHistory () {
  return request({
    method: 'GET',
    url: '/v1_0/search/histories'
  })
}
