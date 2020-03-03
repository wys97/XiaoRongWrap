<template>
  <div class="page-container" ref="page-container" id="page-container"><!--- 银行进账记录--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <el-form-item label="供应商信息："  prop="supplierName">
          <el-input v-model="listQuery.supplierName" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="到账日期:"  prop="shipDate">
        	<el-date-picker
			      v-model="shipDate"
			      align="right"
			      type="date"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
        </el-form-item>
        <el-form-item label="创建日期:" prop="shipDate2">
        	<el-date-picker
			      v-model="shipDate2"
			      align="right"
			      type="date"
			      placeholder="选择日期"
			      :picker-options="pickerOptions2">
			    </el-date-picker>
        </el-form-item>
        <el-form-item label="状态：" prop="status" class="query-select">
          <el-select v-model="listQuery.status" style="width:150px;">
             <el-option label="全部" value=""></el-option>
            <el-option label="待审核 " value='AUDIT_WAIT'></el-option>
            <el-option label="审核通过 " value='AUDIT_PASS'></el-option>
            <el-option label="审核拒绝 " value='AUDIT_REFUSE'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button  @click="search" size="small" type="primary"><i class="iconfont icon-search"></i>查询</el-button>
          <el-button  @click="resetForm('listQueryForm')" size="small" type="primary"><i class="iconfont icon-reset"></i>重置</el-button>
        </el-form-item>
        <el-form-item style="float: right;" v-if="roleHasPermissions['payment_manage_payment_income_add']">
          <router-link :to="'repaymentIncomeDetail/add'">
          	<el-button  @click="" size="small" type="primary"><i class="iconfont icon-reset"></i>新增</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list" @current-change="handleSelectionChange" highlight-current-row :max-height=tableMaxHeight>
		
		<el-table-column prop="supplierName" label="供应商信息" width="220">
			<template slot-scope="scope">
				<div>{{scope.row.supplierName}}</div>
				<div>{{scope.row.supplierNameId}}</div>
			</template>
		</el-table-column>
		
		<el-table-column prop="bankName" label="还款银行" min-width="100">
		</el-table-column>
		
		<el-table-column prop="bankAmt" label="还款金额" min-width="100">
		</el-table-column>
		
		<el-table-column prop="bankSerialNo" label="流水号" min-width="100">
		</el-table-column>
		
		<el-table-column prop="incomeDate" label="还款时间" min-width="100">
		</el-table-column>
		
		<el-table-column prop="createDate" label="创建时间" min-width="100">
		</el-table-column>
		
		<el-table-column prop="statusText" label="状态" min-width="100">
		</el-table-column>
		
		<el-table-column prop="orderNo" label="操作" width="122" align="center">
			<template slot-scope="scope"  v-if="roleHasPermissions['payment_manage_payment_income_view']">
				<router-link :to="'repaymentIncomeDetail/' + scope.row.orderNo"  class="router-link">查看</router-link>
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
  import { getListData } from '@/api/repaymentManage/repaymentIncomeList'

  export default {
    name: 'RepaymentIncomeList',
    data () {
      return {
        list: [], // 表格数据
        total: 0, // 表格数据总条数
        listQuery: { // 查询参数
          page: 1,
          limit: 30,
          supplierName: '', // 供应商名称
          status: '', // 状态:AUDIT_WAIT-待审核 AUDIT_PASS-审核通过 AUDIT_REFUSE-审核拒绝
          incomeDate: '', // 还款日期
          createDate: '', // 创建时间
        },
        shipDate: '', // 还款日期
        shipDate2: '', // 创建时间
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
        pickerOptions2: {
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
	  		let _Time = Format(val, 'yyyy-MM-dd');
	  		that.listQuery.incomeDate = _Time;
	  	}, 
	  	shipDate2(val,oldVal){
	  		let that = this;
	  		let _Time = Format(val, 'yyyy-MM-dd');
	  		that.listQuery.createDate = _Time;
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
      		this.listQuery.incomeDate='';
      	}
      	if(this.shipDate2==null){
      		this.listQuery.createDate='';
      	}
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

