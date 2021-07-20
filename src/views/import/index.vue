<template>
  <upload-excel :on-success="success" />
</template>

<script>
import { importEmployeeApi } from '@/api/employees'
export default {
  methods: {
    async success({ header, results }) {
      // 如果是导入员工
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const arr = []
      results.forEach(item => {
        const userInfo = {}
        Object.keys(item).forEach(key => {
          userInfo[userRelations[key]] = item[key]
        })
        arr.push(userInfo)
      })
      await importEmployeeApi(arr) // 调用导入接口
      this.$message.success('导入员工数据成功!')
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
