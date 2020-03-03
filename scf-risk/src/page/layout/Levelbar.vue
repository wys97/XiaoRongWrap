<template>
  <el-breadcrumb class="app-levelbar" separator=">">
    <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
      <template v-if="item.path === '/approvalRecordManage'">
        <router-link :to="item.redirect||item.path">{{item.name}}</router-link>
      </template>
      <template v-else>
        <span v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{item.name}}</span>
        <router-link v-else :to="item.redirect||item.path">{{item.name}}</router-link>
      </template>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  created () {
    this.getBreadcrumb()
  },
  data () {
    return {
      levelList: null
    }
  },
  methods: {
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.name)
      if (matched && (matched.length === 2) && (matched[0].redirect === matched[1].path)) {
        matched = matched.splice(0, 1)
      }
      this.levelList = matched
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-levelbar.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 36px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
