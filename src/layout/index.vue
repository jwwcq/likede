<template>
  <div>
    <!-- 头部  -->
    <!--  -->
    <el-container>
      <el-header>
        <div class="navbar">
          <img style="width: 88px; position: relative; top: 4px;" class="logo" src="../assets/common/logoone.png" alt="">
          <div class="right-menu">
            <el-row :gutter="20">
              <el-col :span="5">
                <div style="height: 60px; line-height: 60px;">
                  <el-avatar style="vertical-align: middle;">
                    <img src="../assets/common/user.png" alt="">
                  </el-avatar>
                </div>
              </el-col>
              <el-col :span="12">
                <div style="height: 60px; line-height: 60px;">
                  <span style="vertical-align: middle;">欢迎您，{{ $store.state.user.token.userName }}</span>
                </div>
              </el-col>
              <el-col :span="7">
                <div style="height: 60px;line-height: 60px;">
                  <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom">
                    <span style="vertical-align: middle; cursor: pointer;" @click="exit">退出 <span class="el-icon-caret-bottom" /></span>
                  </el-tooltip>

                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 侧边导航栏 S -->
          <side-navigation />
          <!-- 侧边导航栏 E -->
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideNavigation from '@/layout/components/SideNavigation'
export default {
  components: {
    SideNavigation
  },
  methods: {
    exit() {
      this.$router.push('/login')
      this.$store.commit('user/ESC')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar{
  height:60px;
  width:100%;
  position: fixed;
  top:0;
  right: 0;
  z-index: 999;
  background-image: url('~@/assets/common/backgroundone.png');
  background-size: cover;
  background-repeat: no-repeat;
  .logo{
    margin-top: 6px;
    margin-left: 15px;
  }
  .right-menu{
    float: right;
    width: 240px;
    height: 60px;
    margin-right: 24px;
    color: #fff;
  }
}
.el-aside{
  overflow: unset;
}
</style>
