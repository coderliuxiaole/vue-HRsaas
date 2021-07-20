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

/**
 * 删除员工接口
**/
export function delEmployeeApi(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/**
 *  新增员工的接口
 **/
export function addEmployeeApi(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

/*
 修改员工接口
*/
export function editEmployeeApi(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}

/*
  导入员工接口
*/
export function importEmployeeApi(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
