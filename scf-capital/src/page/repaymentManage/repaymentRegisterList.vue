<template>
  <div class="page-container" ref="page-container" id="page-container"><!---还款列表--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <el-form-item label="供应商信息："  prop="supplierName">
          <el-input v-model="listQuery.supplierName" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="提交日期:"  prop="shipDate">
        	<el-date-picker
			      v-model="shipDate"
			      align="right"
			      type="date"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
        </el-form-item>
        <el-form-item label="状态：" class="query-select"  prop="status">
          <el-select v-model="listQuery.status" style="width:150px;">
             <el-option label="全部" value=""></el-option>
            <el-option label="待确认 " value='CONFIRM_ING'></el-option>
            <el-option label="已确认 " value='CONFIRM'></el-option>
            <el-option label="未收到 " value='UN_RECEIVE'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button  @click="search" size="small" type="primary"><i class="iconfont icon-search"></i>查询</el-button>
          <el-button  @click="resetForm('listQueryForm')" size="small" type="primary"><i class="iconfont icon-reset"></i>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list" @current-change="handleSelectionChange" highlight-current-row :max-height=tableMaxHeight>
		
		<el-table-column prop="supplierName" label="供应商信息" width="220">
			<template slot-scope="scope">
				<div>{{scope.row.supplierName}}</div>
				<div>{{scope.row.licenseNo}}</div>
			</template>
		</el-table-column>
		
		<el-table-column prop="repaymentUrlList" label="还款凭证" min-width="100">
			<template slot-scope="scope">
				<img style="width: 50px;height: 50px;" :src="scope.row.repaymentUrlList[0]"/>
			</template>
		</el-table-column>
		
		<el-table-column prop="remark" label="描述内容" min-width="100">
		</el-table-column>
		
		<el-table-column prop="repaymentDate" label="提交时间" min-width="100">
		</el-table-column>
		
		<el-table-column prop="statusText" label="状态" min-width="100">
		</el-table-column>
		
		<el-table-column prop="orderNo" label="操作" width="122" align="center">
			<template slot-scope="scope"  v-if="!roleHasPermissions['payment_manage_payment_register_view']">
				<router-link :to="'repaymentRegisterDetail/' + scope.row.orderNo"  class="router-link">查看</router-link>
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
  import { getListData } from '@/api/repaymentManage/repaymentRegisterList'

  export default {
    name: 'RepaymentRegisterList',
    data () {
      return {
        list: [], // 表格数据
        total: 0, // 表格数据总条数
        listQuery: { // 查询参数
          page: 1,
          limit: 30,
          financeNo: '', // 应收账款编号
          supplierName: '', // 供应商名称
          status: '', // 状态：还款状态 状态:CONFIRM_ING-待确认 CONFIRM-已确认 UN_RECEIVE-未收到
          repaymentDate: '', // 到货日期
        },
        shipDate: '', // 到货日期
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
	  	shipDate(val,oldVal){
	  		let that = this;
	  		if(val!=null){
		  		let _Time = Format(val, 'yyyy-MM-dd');
		  		that.listQuery.repaymentDate = _Time;
	  		}
	  	} 
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
      	if(this.shipDate==null){
      		this.listQuery.repaymentDate='';
      	}
        getListData(this.listQuery).then(res => {
          if (res.data.code === '200') {
            const listData = res.data.data.list
            this.total = res.data.data.total
            this.list = listData
          } else {
            this.$message.error(res.data.message)
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

