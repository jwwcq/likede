<template>
  <div>

    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
    >
      <el-menu-item index="1">
        <i class="el-icon-house" />
        <span slot="title">帝可得</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-document" />
          <span>工单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1" style="color: #ccc;">运营工单</el-menu-item>
          <el-menu-item index="2-2" style="color: #ccc;">运维工单</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location-information" />
          <span>点位管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1" style="color: #ccc;">区域管理</el-menu-item>
          <el-menu-item index="3-2" style="color: #ccc;">点位管理</el-menu-item>
          <el-menu-item index="3-3" style="color: #ccc;">合作商管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
