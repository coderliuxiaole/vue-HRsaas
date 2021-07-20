import request from '@/utils/request'

/*
* 用户登录接口
* */
export function loginApi(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/*
* 获取用户资料接口
* */
export function getUserInfoApi() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

/*
* 获取用户头像接口
* */
export function getUserPhoto(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'GET'
  })
}

/** *
 *  获取某个用户的基本信息
 *
 * ***/
export function getUserDetailByIdApi(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
/** *
 *
 * 保存员工的基本信息
 * **/
export function saveUserDetailByIdApi(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
