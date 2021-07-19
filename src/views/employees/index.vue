<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <!-- before 插槽 -->
        <span slot="before">共166条记录</span>

        <!-- after插槽 -->
        <template slot="after">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button icon="plus" type="primary" size="small" @click="showDialog = true">新增员工</el-button>
        </template>
      </page-tools>

      <el-card v-loading="loadding">
        <!-- 表格 -->
        <!-- data: 要显示的数据 -->
        <!-- index 自定义的序列号 -->
        <!-- prop : 展示的数据 -->
        <el-table border :data="list">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column label="聘用形式" sortable :formatter="formatEmployment" />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <span slot-scope="obj">{{ obj.row.timeOfEntry | formatDate }}</span>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template slot-scope="{ row }">
              <!-- 根据当前状态来确定 是否打开开关 -->
              <el-switch :value="row.enableState === 1" @change="switchFn" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
             <template slot-scope="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="deleteEmployee(row.id)">删除</el-button>
            </template> 
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <!-- total : 总条目数 -->
        <!-- page-size: 每一页展示的数据 -->
        <!-- current-page: 当前页 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination
            layout="prev, pager, next"
            :total="page.total"
            :current-page="page.page"
            :page-size="page.size"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>

    <!-- 弹出层 -->
    <add-demployee :show-dialog.sync="showDialog" />
  </div>
</template>

<script>
import { getEmployeesListApi, delEmployeeApi } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'

// 弹出层
import AddDemployee from './components/add-employee'
export default {
  name: 'EmployeesIndex',
  data() {
    return {
      list: [],
      page: {
        page: 1, // 当前页码
        size: 10,
        total: 0 // 总数
      },
      loadding: false,
      showDialog: false
    }
  },
  created() {
    // 当页面创建是拉取数据
    this.getEmployeesList()
  },
  methods: {
    // 拉取数据
    async getEmployeesList() {
      this.loadding = true
      const { rows, total } = await getEmployeesListApi(this.page)
      this.page.total = total // 总条数
      this.list = rows // 每一个对象
      this.loadding = false
    },

    // 当分页当前页发生改变时处理事件
    async changePage(newPage) {
      this.loadding = true
      this.page.page = newPage // 修改为点击选中的页码
      await this.getEmployeesList() // 重新获取时间
      this.loadding = false
    },

    // 当用户状态按钮点击时的处理时间
    switchFn() {
      console.log(11)
    },
     formatEmployment(row, column, cellValue, index) {
      // 要去找 1所对应的值
      console.log(cellValue)
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },

    // 删除员工方法
     async deleteEmployee(id) {
      try {
        await this.$confirm('您确定删除该员工吗')
        await delEmployeeApi(id)
        this.getEmployeesList()
        this.$message.success('删除员工成功')
      } catch (error) {
        console.log(error)
      }
    }
  },
  components: {
    AddDemployee
  }
}
</script>

<style>

</style>
