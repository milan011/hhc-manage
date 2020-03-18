import request from '@/utils/request'
import { ROAST_CONFIG } from '../config.js'

export function login(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: ROAST_CONFIG.API_URL + '/user/Login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
