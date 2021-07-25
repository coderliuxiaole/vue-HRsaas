<template>
  <el-dialog title="分配角色" :visible="showRoleDialog"  @close="btnCancel">
    <!-- 多选框 -->
    <el-checkbox-group v-model="roleIds">
       <!-- 选项 -->
       <el-checkbox v-for="item in list" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <!-- footer 插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleListApi } from '@/api/setting'
import { getUserDetailByIdApi } from '@/api/user'
import { assignRolesApi } from '@/api/employees'
export default {
  name: 'VueHrsaasAssignRole',

  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    userId: { // 记录需要获取角色的id
      type: String,
      default: null
    }
  },

  data() {
    return {
      list: [], // 当前用户权限列表
      roleIds: [],
      roleIdsLength: null
    }
  },
  created() {
    // 获取数据
    this.getRoleList()
  },
  mounted() {

  },

  methods: {
    // 确定
    async btnOk() {
      if (this.roleIdsLength !== this.roleIds.length) {
        await assignRolesApi({id: this.userId, roleIds: this.roleIds})
        this.$message.success('用户权限保存成功!')
      }
      // this.$parent.showRoleDialog = false
      this.$emit('update:showRoleDialog',false)
    },
    // 窗口关闭事件
    btnCancel() {
      this.$emit('update:showRoleDialog',false)
      // this.$parent.showRoleDialog = false
    },
    // 获取权限的所有角色
    async getRoleList() {
      const { rows } = await getRoleListApi({ page: 1, pagesize: 999})
      this.list = rows
    },
    // 获取个人所对应的权限
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailByIdApi(id)
      this.roleIds = roleIds
      this.roleIdsLength = this.roleIds.length
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
