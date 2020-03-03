<template>
  <div class="container" v-if="detailData.repaymentPreviewDto">
    <div class="top">
      <ul class="flex-item">
      	<li>{{detailData.repaymentPreviewDto.supplierName}}</li>

      	<li>最近一次还款时间：{{detailData.repaymentPreviewDto.backTime}}</li>
      </ul>
      <div class="flex-item" style="text-align: right;">
      	状态：{{detailData.repaymentPreviewDto.backStatusText}}
      	<span :class="detailData.repaymentPreviewDto.isOverdue==='N'?'suc':'fail'">{{detailData.repaymentPreviewDto.isOverdueText}}</span>
      </div>
    </div>
    <div class="content">
      <div class="flex-item">
        <el-tabs v-model="activeName2" type="card" >
          	<el-tab-pane class="first_tab_content" label="还款详情" name="first">
	            <div class="tab-content">
		            <p class="title">还款概览</p>	
		            <div class="core-enterprise info-list">
		              	<div class="table_top">
		              		<el-row >
			              			<el-col :span="4" class="grid-content bg_left">融资单号</el-col>
			              			<el-col :span="20" class="bg_right">
			              				{{detailData.repaymentPreviewDto.financeNo}}
			              				<router-link :to="'/financeLoanManage/financeLoanDetail/' + detailData.repaymentPreviewDto.financeNo">
			              					<el-button type="primary" size="mini">查看</el-button>
			              				</router-link>
			              			</el-col>
			              	</el-row >
			              	<el-row>
			              			<el-col :span="4" class="grid-content bg_left">融资金额</el-col>
			              			<el-col :span="8" class="bg_right">{{detailData.repaymentPreviewDto.financeAmt?detailData.repaymentPreviewDto.financeAmt:'--'}}元</el-col>
			              			<el-col :span="4" class="grid-content bg_left">融资到期日</el-col>
			              			<el-col :span="8" class="bg_right">{{detailData.repaymentPreviewDto.expireDate?detailData.repaymentPreviewDto.expireDate:'0'}}</el-col>
			              	</el-row>
			              	<el-row >
			              			<el-col :span="4" class="grid-content bg_left">放款时间</el-col>
			              			<el-col :span="8" class="bg_right">{{detailData.repaymentPreviewDto.loanTime?detailData.repaymentPreviewDto.loanTime:'--'}}</el-col>
			              			<el-col :span="4" class="grid-content bg_left">最后还款时间</el-col>
			              			<el-col :span="8" class="bg_right">{{detailData.repaymentPreviewDto.backTime?detailData.repaymentPreviewDto.backTime:'--'}}</el-col>
			              	</el-row>
			              	<el-row >
			              			<el-col :span="4" class="grid-content bg_left">实际使用天数</el-col>
			              			<el-col :span="8" class="bg_right">{{detailData.repaymentPreviewDto.usedDays!==''?detailData.repaymentPreviewDto.usedDays:'--'}} 天</el-col>
			              			<el-col :span="4" class="grid-content bg_left">期数</el-col>
			              			<el-col :span="8" class="bg_right">{{detailData.repaymentPreviewDto.period?detailData.repaymentPreviewDto.period:'--'}}期</el-col>
			              	</el-row>
			              	<el-row >
			              			<el-col :span="4" class="grid-content bg_left">服务费（{{detailData.repaymentPreviewDto.chargeRate}}%）</el-col>
			              			<el-col :span="20" class="bg_right">{{detailData.repaymentPreviewDto.fee}}元</el-col>
			              	</el-row >
			              	<el-row >
			              			<el-col :span="4" class="grid-content bg_left">保证金（{{detailData.repaymentPreviewDto.marginRate}}%）</el-col>
			              			<el-col :span="20" class="bg_right">{{detailData.repaymentPreviewDto.cashDeposit}}元</el-col>
			              	</el-row >
			              	<el-row style="margin-top: 10px;">
			              			<el-col :span="4" class="grid-content bg_left" >...</el-col>
			              			<el-col :span="4" class="grid-content bg_left">本金（元）</el-col>
			              			<el-col :span="4" class="grid-content bg_left">利息（元）</el-col>
			              			<el-col :span="4" class="grid-content bg_left">逾期利息（元）</el-col>
			              			<el-col :span="4" class="grid-content bg_left">服务费（元）</el-col>
			              			<el-col :span="4" class="grid-content bg_left">合计</el-col>
			              	</el-row >
			              	<el-row >
			              			<el-col :span="4" class="grid-content bg_left">总还款明细</el-col>
			              			<el-col :span="4" class="text_c bg_right">{{detailData.repaymentPreviewDto.amount}}</el-col>
			              			<el-col :span="4" class="text_c bg_right">{{detailData.repaymentPreviewDto.interest}}</el-col>
			              			<el-col :span="4" class="text_c bg_right">{{detailData.repaymentPreviewDto.fineAmount}}</el-col>
			              			<el-col :span="4" class="text_c bg_right">{{detailData.repaymentPreviewDto.fee}}</el-col>
			              			<el-col :span="4" class="text_c bg_right">{{detailData.repaymentPreviewDto.totalAmount}}</el-col>
			              	</el-row >
			              	<el-row >
			              			<el-col :span="4" class="grid-content bg_left">已还明细</el-col>
			              			<el-col :span="4" class="text_c bg_right">{{detailData.repaymentPreviewDto.actAmount}}</el-col>
			              			<el-col :span="4" class="text_c bg_right">{{detailData.repaymentPreviewDto.actInterest}}</el-col>
			              			<el-col :span="4" class="text_c bg_right">{{detailData.repaymentPreviewDto.actFineAmount}}</el-col>
			              			<el-col :span="4" class="text_c bg_right">{{detailData.repaymentPreviewDto.actFee}}</el-col>
			              			<el-col :span="4" class="text_c bg_right">{{detailData.repaymentPreviewDto.actTotalAmount}}</el-col>
			              	</el-row >
			              	<el-row >
			              			<el-col :span="4" class="grid-content bg_left">剩余明细（已扣保证金）</el-col>
			              			<el-col :span="4" class="text_c bg_right">{{detailData.repaymentPreviewDto.remainAmount}}</el-col>
			              			<el-col :span="4" class="text_c bg_right">{{detailData.repaymentPreviewDto.remainInterest}}</el-col>
			              			<el-col :span="4" class="text_c bg_right">{{detailData.repaymentPreviewDto.remainFineAmount}}</el-col>
			              			<el-col :span="4" class="text_c bg_right">{{detailData.repaymentPreviewDto.remainFee}}</el-col>
			              			<el-col :span="4" class="text_c bg_right">{{detailData.repaymentPreviewDto.remainTotalAmount}}</el-col>
			              	</el-row >
			              	
			            </div>
		            </div>
	            	<p class="title">还款记录（核销记录）</p>	
		            <div class="core-enterprise info-list">
			            <template>
										<el-table
										    :data="tableData"
										    border
										    style="width: 100%">
										    <el-table-column
										      prop="orderNo"
										      label="核销编号"
										      width="260">
										    </el-table-column>
										    <el-table-column
										      prop="backTime"
										      label="实际还款时间"
										      width="180">
										    </el-table-column>
										    <el-table-column
										      prop="totalAmount"
										      label="还款总金额">
										    </el-table-column>
										    <el-table-column
										      prop="amount"
										      label="本金">
										    </el-table-column>
										    <el-table-column
										      prop="interest"
										      label="利息">
										    </el-table-column>
										    <el-table-column
										      prop="fineAmount"
										      label="逾期利息">
										    </el-table-column>
										    <el-table-column
										      prop="fee"
										      label="服务费">
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
  import repaymentDetail from '@/api/repaymentManage/repaymentDetail'
  import { validContent } from '@/utils/validate'
  import { Format } from '@/utils/index'
  export default {
    name: 'RepaymentDetail',
    components: { Upload },
    data () {
      	return {
	      	financeNo: '', // 融资单号
	        detailData:{},//详情数据
	      	
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
      	this.financeNo = this.$route.params.id
      	if (this.financeNo) {
        	this.init()
      	}
    },
    mounted () {
    },
    methods: {
    	fetchdata(){
    		this.financeNo = this.$route.params.id
    		if (this.financeNo) {
	        /*this.init()*/
	      	}
     	},
      	init () {
        	this.getRepaymentDetail();//还款详情信息
      	}, // 初始化
      
      	getRepaymentDetail () {
	        repaymentDetail.repaymentDetail(this.financeNo).then(res => {
	          if (res.data.code === '200') {
	          	this.detailData = res.data.data;
	          	this.tableData = res.data.data.tradeBackClearRecordDtos;
	          } else {
	            this.$message.error(res.data.message)
	          }
	        })
      	}, // 	还款详情信息
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "repaymentDetail.scss";
</style>
