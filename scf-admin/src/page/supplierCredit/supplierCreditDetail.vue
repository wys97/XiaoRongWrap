<template>
  <div class="container" v-if="detailData">
    <div class="top">
      <ul class="flex-item">
      	<li>{{detailData.enterpriseName}}</li>

      	<li>授信资方：<span>{{detailData.capitalName}}</span></li>
      </ul>
      <!--<div class="flex-item" style="text-align: right;">
      	状态：{{detailData.repaymentPreviewDto.backStatusText}}
      	<span :class="detailData.repaymentPreviewDto.isOverdue==='N'?'suc':'fail'">{{detailData.repaymentPreviewDto.isOverdueText}}</span>
      </div>-->
    </div>
    <div class="content">
      <div class="flex-item">
        <el-tabs v-model="activeName2" type="card" >
          	<el-tab-pane class="first_tab_content" label="授信详情" name="first">
	            <div class="tab-content">
		            <p class="title">授信详情</p>	
		            <div class="core-enterprise info-list">
		              	<div class="table_top">
			              	<el-row>
			              			<el-col :span="4" class="grid-content bg_left">商户名称</el-col>
			              			<el-col :span="8" class="bg_right">{{detailData.enterpriseName?detailData.enterpriseName:'--'}}</el-col>
			              			<el-col :span="4" class="grid-content bg_left">社会统一信用代码</el-col>
			              			<el-col :span="8" class="bg_right">{{detailData.businessLicenseNo?detailData.businessLicenseNo:'--'}}</el-col>
			              	</el-row>
			              	<el-row>
			              			<el-col :span="4" class="grid-content bg_left">资方名称</el-col>
			              			<el-col :span="8" class="bg_right">{{detailData.capitalName?detailData.capitalName:'--'}}</el-col>
			              			<el-col :span="4" class="grid-content bg_left">资方统一信用代码</el-col>
			              			<el-col :span="8" class="bg_right">{{detailData.capitalBusinessLicenseNo?detailData.capitalBusinessLicenseNo:'--'}}</el-col>
			              	</el-row>
			              	<el-row >
			              			<el-col :span="4" class="grid-content bg_left">授信额度</el-col>
			              			<el-col :span="20" class="bg_right">{{detailData.totalCreditLine}} 元</el-col>
			              	</el-row>
			              	<el-row >
			              			<el-col :span="4" class="grid-content bg_left">已用额度</el-col>
			              			<el-col :span="20" class="bg_right">{{detailData.usedBalance}} 元</el-col>
			              	</el-row>
			              	<el-row >
			              			<el-col :span="4" class="grid-content bg_left">在途额度</el-col>
			              			<el-col :span="20" class="bg_right">{{detailData.onSignBalance}} 元</el-col>
			              	</el-row>
			              	<el-row >
			              			<el-col :span="4" class="grid-content bg_left">剩余可用额度</el-col>
			              			<el-col :span="20" class="bg_right">{{detailData.availableBalance}} 元</el-col>
			              	</el-row>
			            </div>
		            </div>
	            	<p class="title">授信明细</p>	
		            <div class="core-enterprise info-list">
			            <template>
										<el-table
										    :data="tableData"
										    border
										    style="width: 100%">
										    <el-table-column
										      prop="centreName"
										      label="核心企业"
										      width="120">
										    </el-table-column>
										    <el-table-column
										      prop="creditLine"
										      label="授信额度"
										      width="180">
										      	<template slot-scope="scope">
													<div>{{scope.row.creditLine}} 元</div>
												</template>
										    </el-table-column>
										    <el-table-column
										      prop="usedBalance"
										      label="已用额度">
										      <template slot-scope="scope">
													<div>{{scope.row.usedBalance}} 元</div>
												</template>
										    </el-table-column>
										    <el-table-column
										      prop="onSignBalance"
										      label="在途额度">
										      <template slot-scope="scope">
													<div>{{scope.row.onSignBalance}} 元</div>
												</template>
										    </el-table-column>
										    <el-table-column
										      prop="availableBalance"
										      label="剩余可用额度">
										      <template slot-scope="scope">
													<div>{{scope.row.availableBalance}} 元</div>
												</template>
										    </el-table-column>
										    <el-table-column
										      prop="reachCount"
										      label="当前达标应收账款笔数">
										      <template slot-scope="scope">
													<div>{{scope.row.reachCount}} 笔</div>
												</template>
										    </el-table-column>
										    <el-table-column
										      prop="reachAmt"
										      label="当前已达标应收账款金额">
										      <template slot-scope="scope">
													<div>{{scope.row.reachAmt}} 元</div>
												</template>
										    </el-table-column>
										</el-table>
									</template>
		            </div>
	            </div>
          	</el-tab-pane>
        </el-tabs>
      </div>  <!--tab-->
      <div class="flex-item">
      </div> <!--左侧操作栏-->
    </div>
    
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
	import Upload from '@/components/Upload/Upload'
  import defaultImg from '@/assets/imgs/default.jpg'
  import { comboboxBankList } from '@/api/common'
  import supplierCreditDetail from '@/api/supplierCredit/supplierCreditDetail'
  import { validContent } from '@/utils/validate'
  import { Format } from '@/utils/index'
  export default {
    name: 'supplierCreditDetail',
    components: { Upload },
    data () {
      	return {
	      	supplierId: '', // 融资单号
	        detailData:'',//详情数据
	      	
	     		activeName2: 'first',
	     	
	     		tableData: [],
      	}
    },
    watch:{
	  	//监听路由切换回调
	  	'$route':'fetchdata' 
	  },
    computed: {
      	...mapGetters([
        'roleHasPermissions', // 用户权限list
        	'tableMaxHeight'
      	])
    },
    created () {
      	this.supplierId = this.$route.params.id
      	if (this.supplierId) {
        	this.init()
      	}
    },
    mounted () {
    },
    methods: {
    	fetchdata(){
    		this.supplierId = this.$route.params.id
    		if (this.supplierId) {
	        /*this.init()*/
	      	}
     	},
      	init () {
        	this.getRepaymentDetail();//还款详情信息
      	}, // 初始化
      
      	getRepaymentDetail () {
	        supplierCreditDetail.supplierCreditDetail(this.supplierId).then(res => {
	          if (res.data.code === '200') {
	          	this.detailData = res.data.data;
	          	this.tableData = res.data.data.auditDetail;
	          } else {
	            this.$message.error(res.data.message)
	          }
	        })
      	}, // 	还款详情信息
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "supplierCreditDetail.scss";
</style>
