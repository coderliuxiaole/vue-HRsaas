<template>
  <el-dialog title="分配角色" :visible="showRoleDialog">
    <el-row>
      <el-col :span="6">
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: 'VueHrsaasAssignRole',

  props: {
    showRoleDialog: {
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

  }
}
</script>

<style lang="scss" scoped>

</style>
