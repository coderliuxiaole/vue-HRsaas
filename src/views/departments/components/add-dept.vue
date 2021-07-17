<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="formData.id ? '编辑部门': '新增部门'" :visible="showDialog" @close="btnCancel">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="deptForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartmentsApi, getEmployeeSimpleApi, addDepartmentsApi, getDepartDetailApi, editDepartmentsApi } from '@/api/departments'
export default {
  name: 'AddDept',
  // 检查用户名有没有重复
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    // 校验部门名称
    const checkNameRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartmentsApi()
      const isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      isRepeat ? callback(new Error(`同级部门下已经存在这个${value}部门了`)) : callback()
    }

    // 校验部门编码
    const checkCodeRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartmentsApi()
      const isRepeat = depts.some(item => item.code === value && value)
      isRepeat ? callback(new Error(`同级部门下已经存在这个${value}编码了`)) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编号
        manager: '', // 负责人
        introduce: '' // 部门介绍
      },
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkNameRepeat }],

        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkCodeRepeat }],

        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],

        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-50个字符' }]
      },
      // 接收获取的员工简单列表的数据
      peoples: []
    }
  },
  methods: {
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimpleApi()
    },

    btnOK() {
      this.$refs.deptForm.validate(async isOK => {
        if (isOK) {
          let message = ''
          let updateViews = ''
          if (this.formData.id) {
            // 编辑模式
            await editDepartmentsApi()
          } else {
            // 新增模式
            // 表示可以提交了
            await addDepartmentsApi({ ...this.formData, pid: this.treeNode.id })
            message = '新增部门成功!'
            updateViews = 'addDepts'
          }
          // 通知父组件更新视图
          this.$emit(updateViews)
          // 关闭弹出层
          this.$emit('update:showDialog', false)
          // 提示
          this.$message.success(message)
        }
      })
    },

    btnCancel() {
      this.$emit('update:showDialog', false)

      this.$refs.deptForm.resetFields()
    },

    async getDepartDetail(id) {
      this.formData = await getDepartDetailApi(id)
    }
  }
}
</script>

<style>

</style>
