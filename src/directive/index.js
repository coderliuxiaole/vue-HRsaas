/*
* 自定义指令
*/
export const imageError = {
  inserted: function(el, binding) {
    el.onerror = function() {
      el.src = binding.value
    }
  }
}
