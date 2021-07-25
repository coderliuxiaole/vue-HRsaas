<template>
  <div class="dashboard-container">
    <div class="app-container" v-loading="loading">
      <!-- 靠右的按钮 -->
      <page-tools>
        <template v-slot:after>
          <el-button type="primary" size="small">添加权限</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-table border :data="list" row-key="id">
        <el-table-column label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <el-button v-if="row.type === 1" type="text" @click="addoReditPermission(0, row.id, 2)">添加</el-button>
            <el-button type="text" @click="addoReditPermission(1, row.id)">编辑</el-button>
            <el-button type="text" @click="delPermission(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

        <!-- 放置一个弹层 用来编辑新增节点 -->
          <el-dialog v-if="showDialog" :title="`${showText}权限点`" :visible.sync="showDialog" @close="btnCancle">
              <!-- 表单 -->
              <el-form ref="perForm" :model="formData" :rules="rules" label-width="120px">
                <el-form-item label="权限名称" prop="name">
                  <el-input v-model="formData.name" style="width:90%" />
                </el-form-item>
                <el-form-item label="权限标识" prop="code">
                  <el-input v-model="formData.code" style="width:90%" />
                </el-form-item>
                <el-form-item label="权限描述">
                  <el-input v-model="formData.description" style="width:90%" />
                </el-form-item>
                <el-form-item label="开启">
                  <el-switch
                    v-model="formData.enVisible"
                    active-value="1"
                    inactive-value="0"
                  />
                </el-form-item>
              </el-form>
              <el-row slot="footer" type="flex" justify="center">
                <el-col :span="6">
                  <el-button size="small" type="primary" @click="btnOK">确定</el-button>
                  <el-button size="small" @click="btnCancle">取消</el-button>
                </el-col>
              </el-row>
            </el-dialog>
    </div>
  </div>
</template>

<script>
import { updatePermissionApi, addPermissionApi, getPermissionDetailApi, delPermissionApi, getPermissionListApi } from '@/api/permission'
import { tranListToTreeData } from '@/utils'
export default {
  name: 'PermissionIndex',
  data() {
    return {
      loading: true, // 控制加载loading
      list: [],
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      },
      showDialog: false,
      showText: null,
      userType: [], // 判断用户是编辑还是新增
    }
  },
  async created() {
    // 获取数据
    await this.getPermissionList()
    this.loading = false
  },
  methods: {
    async getPermissionList() {
      this.list = tranListToTreeData(await getPermissionListApi(), '0')
    },

    // 
    async btnOK() {
      await this.$refs.perForm.validate()
      let msg = null
      if (this.userType[0] === 0) {
        // 新增确定
        await addPermissionApi(this.formData)
        msg = '新增'
      }
      else if (this.userType[0] === 1) {
        /// 编辑确定
        await updatePermissionApi(this.formData)
        msg = '编辑'
      }
      this.$message.success(`${msg}权限成功`)
      // 关闭弹层
      this.showDialog = false
      // 重新拉取数据
      this.getPermissionList()
      // 重置数据
      this.btnCancle()
    },

    // 添加 and 编辑方法
    async addoReditPermission() {
      //  添加 = 0  编辑 = 1
      this.userType = [...arguments]
      console.log(this.userType)
      // 添加方法
      if (this.userType[0] === 0) {
        this.formData.pid = this.userType[1]
       this.formData.type = this.userType[2]
        this.showText = '添加'
      } 
      // 编辑方法
      else if (this.userType[0] === 1) {
        this.showText = '编辑'
        this.formData = await getPermissionDetailApi(this.userType[1])
      }
      // 显示权限弹层
      this.showDialog = true
    },
    // 删除方法
    async delPermission(id) {
      try {
        await this.$confirm('确定要删除该数据吗')
        await delPermissionApi(id)
        this.getPermissionList()
        this.$message.success('删除权限成功!')
      } catch(err) {
        console.log(error)
      }
    },
    // 销毁方法
    btnCancle() {
      // 重置数据
      this.formData = {}
      this.userType = []
      // 关闭弹层
      this.showDialog = false
    }
  }
}
</script>

<style>

</style>
