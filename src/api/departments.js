import request from '@/utils/request'
/**
* 获取组织架构信息
**/
export function getDepartmentsApi() {
  return request({
    url: '/company/department'
  })
}

/**
* 删除组织架构接口
**/
export function delDepartmentsApi(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}

/**
* 新增组织架构接口
**/
export function addDepartmentsApi(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

/**
* 获取员工的简单列表
**/
export function getEmployeeSimpleApi() {
  return request({
    url: '/sys/user/simple'
  })
}

/**
* 获取部门详情数据
**/
export function getDepartDetailApi(id) {
  return request({
    url: `/company/department/${id}`
  })
}

/**
* 编辑部门数据
**/
export function editDepartmentsApi(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}
