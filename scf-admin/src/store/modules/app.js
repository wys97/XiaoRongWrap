import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    tableMaxHeight: 500,
    visitedViews: []
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    ADD_VISITED_VIEWS: (state, view) => {
      if (view.path === '/' && view.name === '') return
      if (state.visitedViews.some(v => v.path === view.path)) return
      if (view.name === '商户详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '商户详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '新增核心企业') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '新增核心企业' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '核心企业详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '核心企业详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '资金方详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '资金方详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '应收账款详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '应收账款详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '融资审核详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '融资审核详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '还款登记详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '还款登记详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '银行进账详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '银行进账详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '商户授信情况详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '商户授信情况详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '还款详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '还款详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      filter();
      function filter(){
      	if(state.visitedViews.length>=9&&state.visitedViews[0].path!==view.path){
	      	state.visitedViews.shift(state.visitedViews[0])
	     	}
      }
    	
      state.visitedViews.push({ name: view.name, path: view.path, componentName: view.components.default.name })
    },
    DEL_VISITED_VIEWS: (state, view) => {
      let index
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          index = i
          break
        }
      }
      state.visitedViews.splice(index, 1)
    },
    DEL_ALL_VISITED_VIEWS: (state) => {
      state.visitedViews = []
    },
    SET_TABLE_MAX_HEIGHT: (state, height) => {
      state.tableMaxHeight = height
    }
  },
  actions: {
    ToggleSideBar ({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    AddVisitedViews ({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    DelVisitedViews ({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    DelAllVisitedViews ({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_VISITED_VIEWS')
        resolve([...state.visitedViews])
      })
    },
    SetTableMaxHeight ({commit}) {
      const $pageContainer = document.getElementById('page-container')
      if ($pageContainer) {
        const pageContainerHeight = $pageContainer.offsetHeight // 总高度
        const $filterContainer = document.getElementById('filter-container') // 查询框
        const $operationContainer = document.getElementById('operation-container') // 操作栏
        const $totalContainer = document.getElementById('total-container') // 汇总
        const $paginationContainer = document.getElementById('pagination-container') // 分页框
        let height = pageContainerHeight - 35
        if ($filterContainer) {
          const filterContainerHeight = $filterContainer.offsetHeight  // 查询框高度
          height = height - filterContainerHeight
        }
        if ($operationContainer) {
          const operationContainerHeight = $operationContainer.offsetHeight  // 操作栏高度
          height = height - operationContainerHeight
        }
        if ($totalContainer) {
          const totalContainerHeight = $totalContainer.offsetHeight // 汇总的高度
          height = height - totalContainerHeight
        }
        if ($paginationContainer) {
          const paginationContainerHeight = $paginationContainer.offsetHeight  // 分页框高度
          height = height - paginationContainerHeight
        }
        commit('SET_TABLE_MAX_HEIGHT', height)
      }
    }
  }
}

export default app
