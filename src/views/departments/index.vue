<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <el-row type="flex" justify="space-between">
          <el-col>
            <span>江苏传智播客教育科技股份有限公司</span>
          </el-col>

          <el-col :span="4">
            <el-row type="flex" justify="end">
              <el-col>负责人</el-col>
              <el-col>
                <el-dropdown>
                  <span>
                    操作<i class="el-icon-arrow-down" />
                  </span>

                  <!-- 下拉菜单 -->
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- default-expand-all 是否默认展开所有节点 -->
        <!-- props 配置规则 data 数据 -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 在el-tree 的插槽中 slot-scope 接收作用域插槽传过来的值 然后解构data -->
          <tree-tools slot-scope="{ data }" :tree-node="data" :is-root="true" />
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
      departs: [{ name: '总裁办', manager: '李志鹏', children: [{ name: '董事会', manager: '张三' }, { name: '行政部', manager: '李四' }] },
        { name: '行政部', manager: '张三' }, { name: '人事部', manager: '李四' }]
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
