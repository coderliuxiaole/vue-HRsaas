<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <!-- 行政名称 -->
    <el-col> <span>{{ treeNode.name }}</span> </el-col>
    <!-- 负责人 -->
    <el-col :span="4">
      <el-row
        type="flex"
        justify="end"
      >
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="operateDepts">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>

            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartmentsApi } from '@/api/departments'
export default {
  name: 'VueHrsaasTreeTools',
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {

    }
  },

  mounted() {

  },

  methods: {
    async operateDepts(type) {
      if (type === 'add') {
        // 添加部门
        this.$emit('addDepts', this.treeNode)
      } else if (type === 'edit') {
        // 编辑部门
        this.$emit('editDepts', this.treeNode)
      } else if (type === 'del') {
        await this.$confirm('您确定要删除这个部门吗?')
        // 捕获用户取消操作
          .catch(() => {
            console.log('用户取消了删除操作!')
          })

        // 调用删除组织api删除数据
        delDepartmentsApi(this.treeNode.id)
        // 删除成功才会到这里
          .then(() => {
            this.$emit('deleteOK')
            this.$message.success('部门数据删除成功!')
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
