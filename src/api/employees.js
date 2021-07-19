import request from '@/utils/request'
/**
 * 获取员工列表信息
  **/
export function getEmployeesListApi(params) {
  return request({
    url: '/sys/user',
    params
  })
}
