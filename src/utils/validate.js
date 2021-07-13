/** 自定义手机号码校验规则
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUserMobile(str) {
  return /^1[3-9]\d{9}$/.test(str)
}
