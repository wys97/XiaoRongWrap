<template>
  <div class="page-container" ref="page-container" id="page-container"><!---还款列表--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <el-form-item label="核心企业名称："  prop="centerName">
          <el-input v-model="listQuery.centerName" style="width:120px;"></el-input>
        </el-form-item>
        <!--<el-form-item label="信用评级：" prop="status" class="query-select">
          <el-select v-model="listQuery.status" style="width:150px;">
             <el-option label="全部" value=""></el-option>
            <el-option label="待还款 " value='WAITING'></el-option>
            <el-option label="还款中 " value='PAYING'></el-option>
            <el-option label="部分还款 " value='PART'></el-option>
            <el-option label="已还清 " value='ALL'></el-option> 
            <el-option label="逾期 " value='OVERDUE'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态"  prop="status" class="query-select">
          <el-select v-model="listQuery.status" style="width:150px;">
             <el-option label="全部" value=""></el-option>
            <el-option label="待还款 " value='WAITING'></el-option>
            <el-option label="还款中 " value='PAYING'></el-option>
            <el-option label="部分还款 " value='PART'></el-option>
            <el-option label="已还清 " value='ALL'></el-option> 
            <el-option label="逾期 " value='OVERDUE'></el-option>
          </el-select>
        </el-form-item>-->
        <!--<el-form-item label="融资到期日（起~止）:"  prop="searchTime">
        	<template>
					  <div class="block">
					    <el-date-picker
					      v-model="searchTime"
					      type="daterange"
					      range-separator="至"
					      start-placeholder="开始日期"
					      end-placeholder="结束日期">
					    </el-date-picker>
					  </div>
					</template>
        </el-form-item>-->
        <el-form-item>
          <el-button  @click="search" size="small" type="primary"><i class="iconfont icon-search"></i>查询</el-button>
          <el-button  @click="resetForm('listQueryForm')" size="small" type="primary"><i class="iconfont icon-reset"></i>重置</el-button>
        </el-form-item>
        <el-form-item style="float: right;" v-if="roleHasPermissions['core_enterprise_manage_add']">
          <router-link to="CoreBusinessAdd">
          	<el-button  size="small" type="primary"><i class="iconfont icon-reset"></i>新增</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list" @current-change="handleSelectionChange" highlight-current-row :max-height=tableMaxHeight>
		
		<el-table-column prop="enterpriseName" label="核心企业名称" width="220">
			<template slot-scope="scope">
				<div>{{scope.row.enterpriseName}}</div>
				<!--<div>{{scope.row.supplierId}}</div>-->
			</template>
		</el-table-column>
		
		<el-table-column prop="setUpDate" label="成立日期" min-width="100">
		</el-table-column>
	
		<el-table-column prop="creditLine" label="核心企业授信额度" min-width="80">
		</el-table-column>
		
		<el-table-column prop="scmSite" label="核心企业交易平台名称" min-width="80">
		</el-table-column>

		<el-table-column prop="createTime" label="创建时间" min-width="80">
		</el-table-column>
		
		
		<!--<el-table-column prop="financeDate" label="状态" min-width="80">
		</el-table-column>
		
		<el-table-column prop="backTime" label="最后一次还款时间" min-width="80">
		</el-table-column>
		
		<el-table-column prop="statusText" label="状态" min-width="80">
		</el-table-column>
		
		<el-table-column prop="isOverdue" label="是否逾期" min-width="80">
			<template slot-scope="scope">
				<div :class="scope.row.isOverdue=='Y'?'fail':scope.row.isOverdue=='N'?'suc':'suc'">{{scope.row.isOverdue=='Y'?'逾期':scope.row.isOverdue=='N'?'未逾期':''}}</div>
			</template>
		</el-table-column>-->
		
		<el-table-column prop="id" label="操作" width="122" align="center">
			<template slot-scope="scope" v-if="roleHasPermissions['core_enterprise_manage_list_view']">
				<router-link :to="'CoreBusinessDetail/' + scope.row.id"  class="router-link">查看</router-link>
			</template>
		</el-table-column>
      
    </el-table>
    <div  class="pagination-container" ref="pagination-container" id="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPage" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total='total' layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { handleSelectionChange, handleSizeChange, handleCurrentPage } from '@/utils/common'
  import { Format } from '@/utils/index'
  import { getListData } from '@/api/CoreBusinessManage/CoreBusinessList'

  export default {
    name: 'CoreBusinessList',
    data () {
      return {
        list: [], // 表格数据
        total: 0, // 表格数据总条数
        searchTime:'',//查询选择的时间
        listQuery: { // 查询参数
          page: 1,
          limit: 30,
          centerName: '', // 核心企业条件查询
        },
        yesterday: new Date().getTime() - 24 * 60 * 60 * 1000,
        selectedData: '', // 选中某一行的数据
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now() - 24 * 60 * 60 * 1000
          }
        },
        handleSelectionChange: handleSelectionChange.bind(this),
        handleSizeChange: handleSizeChange.bind(this),
        handleCurrentPage: handleCurrentPage.bind(this),
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      }
    },
    watch:{
	  	//监听路由切换回调
	  	'$route':'fetchdata', 
//	  	searchTime (val,oldVal){
//	  		this.listQuery.financeDateStart  = Format(val[0], 'yyyy-MM-dd');
//	  		this.listQuery.financeDateEnd = Format(val[1], 'yyyy-MM-dd');
//	  	}
	  },
    computed: {
      ...mapGetters([
        'roleHasPermissions', // 用户权限list
        'tableMaxHeight'
      ])
    },
    created () {
      this.getList()
    },
    mounted () {
      setTimeout(() => {
        this.$store.dispatch('SetTableMaxHeight')
      }, 500)
    },
    methods: {
    	fetchdata(){
    		//切换路由do
    	},
      getList () {
        getListData(this.listQuery).then(res => {
          if (res.data.code === '200') {
            const listData = res.data.data.list
            this.total = res.data.data.total
            this.list = listData
          } else {
            this.$notify.error(res.data.message)
          }
        })
      },
      search(){
      	let that = this;
      	that.getList();
      },//查询
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },//重置表单
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .total-container{
    >span{
      margin-right: 10px;
      padding-right: 10px;
      border-right: 1px solid #ccc;
    }
  }
</style>

