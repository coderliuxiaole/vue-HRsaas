import request from '@/utils/request'
/**
* 获取组织架构信息
**/
export function getDepartmentsApi() {
  return request({
    url: '/company/department'
  })
}
