<template>
  <div class='tabs-view-container'>
    <router-link class="tabs-view"  v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path">
      <el-tag :closable="true" :class="isActive(tag.path)?'active':''" @close='closeViewTabs(tag,$event)'>
        {{tag.name}}
      </el-tag>
    </router-link>
  </div>
</template>

<script>
export default {
  computed: {
    visitedViews () {
      return this.$store.state.app.visitedViews
    }
  },
  created () {
    this.addViewTabs()
  },
  methods: {
    closeViewTabs (view, $event) {
      this.$store.dispatch('DelVisitedViews', view).then((views) => {
        if (this.isActive(view.path)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView.path)
          } else {
            this.$router.push('/')
          }
        }
      })
      $event.preventDefault()
    },
    generateRoute () {
      if (this.$route.matched[this.$route.matched.length - 1].name) {
        if (this.$route.matched[this.$route.matched.length - 1].name === '供应商详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '核心企业详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '新增核心企业') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '应收账款详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '融资审核详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '商户审核详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '融资放款详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '放款详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '还款登记详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '银行进账详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '还款详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '商户详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '逾期详情') {
          return this.$route
        }
        return this.$route.matched[this.$route.matched.length - 1]
      }
      this.$route.matched[0].path = '/'
      return this.$route.matched[0]
    },
    addViewTabs () {
      this.$store.dispatch('AddVisitedViews', this.generateRoute())
    },
    isActive (path) {
      return path === this.$route.path
    }
  },
  watch: {
    $route () {
      this.addViewTabs()
      setTimeout(() => {
        this.$store.dispatch('SetTableMaxHeight')
      }, 500)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tabs-view-container {
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
    width: 80%;
    overflow: hidden;
    .tabs-view {
      margin-left: 10px;
    }
    .active{
      background-color: #409EFF;
      color:#fff;
    }
  }
</style>
