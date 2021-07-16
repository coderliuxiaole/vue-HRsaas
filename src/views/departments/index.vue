<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <tree-tools :tree-node="company" :is-root="true" />
        <!-- default-expand-all 是否默认展开所有节点 -->
        <!-- props 配置规则 data 数据 -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 在el-tree 的插槽中 slot-scope 接收作用域插槽传过来的值 然后解构data -->
          <tree-tools slot-scope="{ data }" :tree-node="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import treeTools from './components/tree-tools'
// 引入获取信息接口api
import { getDepartmentsApi } from '@/api/departments'
export default {
  components: {
    treeTools
  },
  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      company: { name: '', manager: '负责人' },
      departs: []
    }
  },

  created() {
    // console.log(1)
    this.getDepartments()
  },

  methods: {
    handleNodeClick(data) {
      console.log(data)
    },

    // 调用获取组织架构信息接口
    async getDepartments() {
      const result = await getDepartmentsApi()
      this.departs = result.depts
      this.company.name = result.companyName
    }
  }
}
</script>

<style>
.box-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
