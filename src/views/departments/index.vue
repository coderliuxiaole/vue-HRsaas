<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <tree-tools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <!-- default-expand-all 是否默认展开所有节点 -->
        <!-- props 配置规则 data 数据 -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 在el-tree 的插槽中 slot-scope 接收作用域插槽传过来的值 然后解构data -->
          <tree-tools slot-scope="{ data }" :tree-node="data" @deleteOK="getDepartments" @addDepts="addDepts" />
        </el-tree>
      </el-card>
    </div>
    <!-- 新增部门的弹出层 -->
    <add-dept :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />
  </div>
</template>

<script>
import treeTools from './components/tree-tools'
// 引入获取信息接口api
import { getDepartmentsApi } from '@/api/departments'
// 引入递归方法函数
import { tranListToTreeData } from '@/utils/index'
// 引入组件
import addDept from './components/add-dept.vue'
export default {
  components: {
    treeTools,
    addDept
  },
  data() {
    return {
      showDialog: false,
      node: null, // 记录当前点击的node节点信息
      defaultProps: {
        label: 'name'
      },
      company: {},
      departs: []
    }
  },

  created() {
    this.getDepartments()
  },

  methods: {
    handleNodeClick(data) {
      console.log(data)
    },

    // 调用获取组织架构信息接口
    async getDepartments() {
      const result = await getDepartmentsApi()
      this.company = { name: result.companyName, manager: '负责人', id: ''}
      this.departs = tranListToTreeData(result.depts, '')
    },

    addDepts(node) {
      // 显示弹层
      this.showDialog = true
      this.node = node
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
