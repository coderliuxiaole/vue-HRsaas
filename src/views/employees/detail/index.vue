<template>
  <div class="dashboard-container">
    <div v-loading="loading" class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">

            <!-- 放置表单 -->
            <el-form label-width="120px" style="margin-left: 120px; margin-top:30px" :model="userInfo">
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="userInfo.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <!-- 打印图标 -->
            <el-row type="flex" justify="end">
              <el-tooltip content="打印个人基本信息">
                <router-link :to="`/employees/print/${userId}?type=personal`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <!-- 放置个人详情 -->
            <component :is="userComponent" :user-id="id" />
            <!-- <user-info /> -->
          </el-tab-pane>
          <el-tab-pane label="岗位详情">
            <!-- 打印图标 -->
            <el-row type="flex" justify="end">
              <el-tooltip content="打印岗位信息">
                <router-link :to="`/employees/print/${userId}?type=job`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <!-- 放置岗位详情 -->
            <component :is="JobInfo" :user-id="id" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import userComponent from '../components/user-info'
import JobInfo from '../components/job-info'
// 网络请求接口
import { getUserDetailByIdApi } from '@/api/user'
export default {
  name: 'VueHrsaasIndex',
  components: {
    userComponent,
    JobInfo
  },
  data() {
    return {
      id: this.$route.params.id,
      userId: this.$route.params.id,
      userInfo: {},
      userComponent: userComponent,
      JobInfo: JobInfo,
      loading: false
    }
  },

  mounted() {
  },
  created() {
    this.getUserName()
    this.loading = false
  },
  methods: {
    // 获取用户名称
    async getUserName() {
      this.userInfo = await getUserDetailByIdApi(this.id)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
