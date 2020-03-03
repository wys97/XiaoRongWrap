<template>
  <div class="page-container" ref="page-container" id="page-container"><!---供应商管理-供应商入驻--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <el-form-item label="企业名称" prop="enterpriseName">
          <el-input v-model="listQuery.enterpriseName" style="width:120px;"></el-input>
        </el-form-item>
        <!--<el-form-item label="信用代码" prop="businessLicenseNo">
          <el-input v-model="listQuery.businessLicenseNo" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="申请人手机号" prop="mobile">
          <el-input v-model="listQuery.mobile" style="width:130px;"></el-input>
        </el-form-item>-->
        <!--<el-form-item label="地区" class="query-select">
          <el-select v-model="listQuery.zone" style="width:100px;">
            <el-option label="全部" value=""></el-option>
            <el-option label="北京" value='beijing'></el-option>
            <el-option label="上海" value='shanghai'></el-option>
            <el-option label="广州" value='guangzhou'></el-option>
          </el-select>
        </el-form-item>-->
        
        <el-form-item label="核心企业" class="query-select" prop="centreName">
          <el-select v-model="listQuery.centreName"  @visible-change="getSelect" style="width:150px;">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(value,key) in centreList" :label="value" :value='value' :key="key"></el-option>
	       	</el-select>
        </el-form-item>
        <el-form-item label="申请时间" prop="shipDate">
          <el-date-picker
             v-model="shipDate"
            style="width:280px;"
            align="right"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="放款时间" prop="shipDateLoan">
          <el-date-picker
             v-model="shipDateLoan"
            style="width:280px;"
            align="right"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <!--<el-form-item label="融资评分" class="query-select" prop="status">
          <el-select v-model="listQuery.status" style="width:150px;">
            <el-option label="全部" value="">
            </el-option>
            <el-option label="0~60 " value='TRANSFER_CONTRACT'></el-option>
            <el-option label="60~69" value='GUARANTEE_CONTRACT'></el-option>
            <el-option label="70~79 " value='FINANCE_AUDIT_ING'></el-option>
            <el-option label="80~100 " value='FINANCE_AUDIT_REFUSE'></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="状态" prop="status" class="query-select">
          <el-select v-model="listQuery.status" style="width:150px;">
             <el-option label="全部" value=""></el-option>
            <el-option label="待审核 " value='CAPTICAL_CONTRACT'></el-option>
            <el-option label="待放款 " value='WAIT_LOAN'></el-option>
            <el-option label="已拒绝 " value='FAIL'></el-option>
            <el-option label="融资成功 " value='SUCCESS'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button  @click="search"  size="small" type="primary" icon="el-icon-search">查询</el-button>
          <el-button  @click="resetForm('listQueryForm')" size="small" type="primary" icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--<div class="total-container" ref="total-container" id="total-container">
      <span>提交基础资料中：1</span> <span>审核入驻：21</span><span>审核贸易：2</span><span>预沟通：0</span><span>尽调中：9</span><span>尽调中：9</span><span>签署中：9</span>
    </div>-->
    <el-table :data="list"  @current-change="handleSelectionChange" highlight-current-row  :max-height=tableMaxHeight>
      <el-table-column
        label="#"
        type="index"
        align="center">
      </el-table-column>
			
			<el-table-column
        prop="orderNo"
        label="融资单号"
        min-width="120"
        >
      </el-table-column>
      
      <el-table-column
        prop="enterpriseName"
        label="企业信息"
        min-width="160">
        <template slot-scope="scope" >
          <div>{{scope.row.enterpriseName}}</div>
          <div>{{scope.row.businessLicenseNo}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="centreName"
        label="核心企业">
      </el-table-column>
			<el-table-column
        prop="amount"
        label="融资金额">
      </el-table-column>
			<el-table-column
        prop="loanDays"
        label="融资期限">
      </el-table-column>
      <el-table-column
        prop="repaymentMethodText"
        label="还款方式">
      </el-table-column>
      <el-table-column
        prop="applyTime"
        label="申请时间"
        width="150"
        >
      </el-table-column>
      <el-table-column
        prop="loanTime"
        label="放款时间"
        width="150"
        >
      </el-table-column>
      <!--<el-table-column  prop="pingfen" label="融资评分" width="130" align="center">
			<template slot-scope="scope" >
	          <div :class="scope.row.status==='suc'?'suc':scope.row.status==='fail'?'fail':scope.row.status==='waring'?'waring':''">{{scope.row.pingfen}}</div>
	        </template>
			</el-table-column>-->
      <el-table-column
        prop="statusText"
        label="状态"
        width="100">
        <template slot-scope="scope" >
          <span :class="scope.row.registerStatus | filterStatus">{{scope.row.statusText}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="122"
        align="center">
        <template slot-scope="scope" v-if="!roleHasPermissions['supplier_manage_register_list_view']">
            <router-link :to="'financeLoanDetail/' + scope.row.orderNo" class="router-link">详情</router-link>
        </template>
      </el-table-column>

    </el-table>
    <div  class="pagination-container" ref="pagination-container" id="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPage" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total='total' layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
      <!--total-->
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { handleSelectionChange, handleSizeChange, handleCurrentPage } from '@/utils/common'
  import { getListData } from '@/api/financeLoanManage/financeLoanAudit'
  import { Format } from '@/utils/index'
  import {comboboxCentreEnterprise} from '@/api/common'

  export default {
    name: 'SupplierRegister',
    filters: {
      filterStatus: function (value) {
        if (value === 'PASS') {
          return 'suc'
        } else if (value === 'REJECT') {
          return 'fail'
        }
      }
    },
    data () {
      return {
        list: [], // 表格数据
        total: 0, // 表格数据总条数
        listQuery: { // 查询参数
          page: 1,
          limit: 30,
          enterpriseName: '', // 企业名
          businessLicenseNo: '', // 信用代码
          mobile: '', // 手机号码
          beginCreateTime: '', // 最早得入驻时间
          endCreateTime: '', // 最晚得入驻时间
          status: '', // 状态
          centreName:'',//核心企业名
          beginLoanTime:'',
          endLoanTime:'',
        },
        centreList:'',//核心企业列表
        shipDate:[],// 时间范围
        shipDateLoan:[],// 放款时间范围
        yesterday: new Date().getTime() - 24 * 60 * 60 * 1000,
        selectedData: '', // 选中某一行的数据
        handleSelectionChange: handleSelectionChange.bind(this),
        handleSizeChange: handleSizeChange.bind(this),
        handleCurrentPage: handleCurrentPage.bind(this)
      }
    },
    computed: {
      ...mapGetters([
        'roleHasPermissions', // 用户权限list
        'tableMaxHeight'
      ])
    },
    watch :{
    	shipDate(val,oldVal){
    		let that = this;
    		if(val[0]){
    			that.listQuery.beginCreateTime = Format(val[0], 'yyyy-MM-dd');
    		}else{
    			that.listQuery.beginCreateTime = '';
    		}
	  		if(val[1]){
	  			that.listQuery.endCreateTime = Format(val[1], 'yyyy-MM-dd');
	  		}else{
    			that.listQuery.endCreateTime = '';
	  		}
	  	},
    	shipDateLoan(val,oldVal){
    		let that = this;
    		if(val[0]){
    			that.listQuery.beginLoanTime = Format(val[0], 'yyyy-MM-dd');
    		}else{
    			that.listQuery.beginLoanTime = '';
    		}
	  		if(val[1]){
	  			that.listQuery.endLoanTime = Format(val[1], 'yyyy-MM-dd');
	  		}else{
    			that.listQuery.endLoanTime = '';
	  		}
	  	}  
    },
    created () {
    },
    mounted () {
      this.getList()
      setTimeout(() => {
        this.$store.dispatch('SetTableMaxHeight')
      }, 500)
    },
    methods: {
    	getSelect(){
    		comboboxCentreEnterprise().then(res => {
          if (res.data.code === '200') {
          	this.centreList = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
    	},
      getList () {
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
			search() {
				let that = this;
				that.getList();
			},//查询
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.shipDate = [];
        this.shipDateLoan = [];
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
      &:last-of-type{
        border-right: none;
      }
    }
  }
  .router-link{
    display: block;
    color:#409EFF;
  }
</style>

