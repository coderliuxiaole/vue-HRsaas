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
