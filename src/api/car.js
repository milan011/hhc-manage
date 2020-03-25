import request from '@/utils/request'
import { getToken } from '@/utils/auth'
import { ROAST_CONFIG } from '../config.js'

let token = getToken()

/*export function getCarList(query) {
  return request({
    // url: '/car/list',
    url: ROAST_CONFIG.API_URL + '/car/page',
    method: 'get',
    params: {token, query, page:query.page}
  })
}*/

export function getCarList(data) {
  // console.log(data)
  return request({
    url: ROAST_CONFIG.API_URL + '/car/page',
    method: 'post',
    // params: { token },
    data
  })
}

export function getCarInfo(carId) {
  return request({
    // url: '/car/list',
    url: ROAST_CONFIG.API_URL + '/car/detail?id=' + carId,
    method: 'get',
  })
}

export function createCar(data) {
  return request({
    url: ROAST_CONFIG.API_URL + '/car',
    method: 'post',
    params: { token },
    data
  })
}


export function updateCar(data) {
  return request({
    url: ROAST_CONFIG.API_URL + '/car/' + data.id,
    method: 'put',
    params: { token },
    data
  })
}
export function deleteCar(data) {
  return request({
    url: ROAST_CONFIG.API_URL + '/car/' + data.id,
    method: 'delete',
    params: {token},
    data
  }) 
}
