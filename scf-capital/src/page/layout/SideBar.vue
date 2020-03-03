<template>
  <div>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse">
      <sidebar-item :routes='allRouters'></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'
  export default {
    components: { SidebarItem },
    computed: {
      ...mapGetters([
        'allRouters',
        'sidebar'
      ]),
      isCollapse () {
        return !this.sidebar.opened
      }
    },
    created () {
    }
  }
</script>




