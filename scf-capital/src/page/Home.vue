<template>
  <div class="page-container" ref="page-container" id="page-container" style="padding-top: 30px;overflow-y: auto;"><!---供应商管理-供应商入驻--->
    <el-row :gutter="10">
		  <el-col :span="9">
		  	<div class="h_top">
		  		<p class="h_title">待办事项</p>
		  		<el-row>
		  			<el-col :span="12">
		  				<p class="h_name">待审核进件商户</p>
		  				<p class="h_amt">
		  					<router-link to="/MerchantsAudit/MerchantsAuditList" class="router-link">
		  						{{backlogData.pendingMerchants}}
		  					</router-link>
		  				</p>
		  			</el-col>
		  			<el-col :span="12">
		  				<p class="h_name">待审核融资单（笔）</p>
		  				<p class="h_amt">
		  					<router-link to="/financeLoanManage/financeLoanList" class="router-link">
		  						{{backlogData.pendingFinanceOrders}}
		  					</router-link>
		  				</p>
		  			</el-col>
		  		</el-row>
		  	</div>
		  </el-col>
		  <el-col :span="15">
		  	<div class="h_top">
		  		<p class="h_title">待收</p>
			  	<el-row>
					  <el-col :span="8">
					  	<div class="">
					  		<p class="h_name">待收笔数（笔）</p>
					  		<p class="h_amt">
					  			<router-link to="/repaymentManage/repaymentList" class="router-link">
			  						{{normalBackPlanData.backPlanNumber}}
			  					</router-link>
					  		</p>
					  	</div>
					  </el-col>
					  <el-col :span="8">
					  	<div class="">
					  		<p class="h_name">待收本金（元）</p>
					  		<p class="h_amt">{{normalBackPlanData.amount}}</p>
					  	</div>
					  </el-col>
					  <el-col :span="8">
					  	<div class="">
					  		<p class="h_name">待收利息（元）</p>
					  		<p class="h_amt">{{normalBackPlanData.fineAmount}}</p>
					  	</div>
					  </el-col>
					</el-row>
		  	</div>
		  </el-col>
		  <el-col :span="9">
		  	<div class="h_top">
		  		<p class="h_title">账户信息</p>
		  		<el-row>
		  			<el-col :span="12">
		  				<p class="h_name">账户余额（元）</p>
		  				<p class="h_amt">{{balanceData.balance}}</p>
		  			</el-col>
		  			<el-col :span="12">
		  				<p class="h_name">可用余额（元）</p>
		  				<p class="h_amt">{{balanceData.availableBalance}}</p>
		  			</el-col>
		  		</el-row>
		  	</div>
		  </el-col>
		  <el-col :span="15">
		  	<div class="h_top">
		  		<p class="h_title">逾期</p>
			  	<el-row>
					  <el-col :span="8">
					  	<div class="">
					  		<p class="h_name">逾期笔数（笔）</p>
					  		<p class="h_amt">{{overdueBackPlanData.backPlanNumber}}</p>
					  	</div>
					  </el-col>
					  <el-col :span="8">
					  	<div class="">
					  		<p class="h_name">逾期本金（元）</p>
					  		<p class="h_amt">{{overdueBackPlanData.amount}}</p>
					  	</div>
					  </el-col>
					  <el-col :span="8">
					  	<div class="">
					  		<p class="h_name">逾期利息（元）</p>
					  		<p class="h_amt">{{overdueBackPlanData.fineAmount}}</p>
					  	</div>
					  </el-col>
					</el-row>
		  	</div>
		  </el-col>
		  <!--<el-col :span="10">
		  	<div class="h_top">
		  		<p class="h_title">待办事项</p>
			  	<el-row>
					  <el-col :span="8">
					  	<div class="">
					  		<p class="h_name">逾期笔数（笔）</p>
					  		<p class="h_amt">{{overdueBackPlanData.backPlanNumber}}</p>
					  	</div>
					  </el-col>
					  <el-col :span="8">
					  	<div class="">
					  		<p class="h_name">逾期本金（元）</p>
					  		<p class="h_amt">{{overdueBackPlanData.amount}}</p>
					  	</div>
					  </el-col>
					  <el-col :span="8">
					  	<div class="">
					  		<p class="h_name">逾期利息（元）</p>
					  		<p class="h_amt">{{overdueBackPlanData.fineAmount}}</p>
					  	</div>
					  </el-col>
					</el-row>
		  	</div>
		  </el-col>-->
		</el-row>
  	<el-row :gutter="20">
		  <el-col :span="12">
		  	<NoteChart v-if="collectionData" :chartData="collectionData" :title="'回款数据'" :legendData="['金额','笔数']"></NoteChart>
		  </el-col>
		  <el-col :span="12">
		  	<NoteChart v-if="lendingData" :chartData="lendingData" :title="'放款数据'" :legendData="['金额','笔数']"></NoteChart>
		  </el-col>
		</el-row>	
  </div>
</template>

<script>
	import homeApi from '@/api/home/homeDetail'
  import NoteChart from '@/components/charts/noteChart'
  export default {
    name: 'Home',
    components: {NoteChart},
    data () {
      return {
      	balanceData:{},//账户信息
      	backlogData:{},//待办事项
      	overdueBackPlanData:{},//逾期利息数据
      	normalBackPlanData:{},//非逾期信息数据
      	collectionData:'',//回款数据
      	lendingData:'',//放款数据
      }
	  },
	  watch:{
	  	collectionData(val){
	  		this.collectionData = val;
	  	},
	  	lendingData(val){
	  		this.lendingData = val;
	  	},
	  	
	  },
	  methods:{
	  	getBalance(){//获取账户信息
	  		let that = this;
	  		homeApi.balance().then(res => {
          if (res.data.code === '200') {
          	that.balanceData = res.data.data;
          } else if(res.data.code === '500') {
          	this.$message.error(res.data.message)
          }
        })
	  	},
	  	getBacklog(){//获取待办事项
	  		let that = this;
	  		homeApi.backlog().then(res => {
          if (res.data.code === '200') {
          	that.backlogData = res.data.data;
          } else if(res.data.code === '500') {
          	this.$message.error(res.data.message)
          }
        })
	  	},
	  	getOverdueBackBlan(){//获取逾期利息
	  		let that = this;
	  		homeApi.overdueBackPlan().then(res => {
          if (res.data.code === '200') {
          	that.overdueBackPlanData = res.data.data;
          } else if(res.data.code === '500') {
          	this.$message.error(res.data.message)
          }
        })
	  	},
	  	normalBackPlan(){//获取非逾期信息
	  		let that = this;
	  		homeApi.normalBackPlan().then(res => {
          if (res.data.code === '200') {
          	that.normalBackPlanData = res.data.data;
          } else if(res.data.code === '500') {
          	this.$message.error(res.data.message)
          }
        })
	  	},
	  	getNormalBackPlan(){//获取回款数据
	  		let that = this;
	  		homeApi.collectionData().then(res => {
          if (res.data.code === '200') {
          	that.collectionData = res.data.data;
          } else if(res.data.code === '500') {
          	this.$message.error(res.data.message)
          }
        })
	  	},
	  	getCollectionData(){//获取放款数据
	  		let that = this;
	  		homeApi.lendingData().then(res => {
          if (res.data.code === '200') {
          	that.lendingData = res.data.data;
          } else if(res.data.code === '500') {
          	this.$message.error(res.data.message)
          }
        })
	  	}		
	  },
	  created(){
	  	let that = this;
	  	that.getBalance();
	  	that.getBacklog();
	  	that.getOverdueBackBlan();
	  	that.normalBackPlan();
	  	that.getNormalBackPlan();
	  	that.getCollectionData();
	  },
	  mounted(){
	  }
  
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.h_top{
		background-color: #F8F8F8;
		border: 1px solid #bbb;
		min-height: 100px;
		margin-bottom: 20px;
	}
 	.h_title{
 		line-height: 50px;
 		text-align: center;
 		color: #303133;
 		background-color: #e9ecf3;
 	}
 	.h_name{
 		line-height: 50px;
 		text-align: center;
    font-size: 14px;
 	}	
 	.h_amt{
 		text-align: center;
 		font-size: 20px;
 		line-height: 50px;
 	}
  .container{
    text-align: center;
    ul{
      margin: auto;
      width:420px;
      padding:12px 20px;
      list-style: none;
      background: #fff;
      li{
        display: flex;
        margin-bottom: 10px;
        &:last-of-type{
          margin-bottom: 0;
        }
        >div{
          &:first-of-type{
            text-align: left;
            width:130px;
            color:#999;
          }
        }
        .title{
          text-align: center;
          width:100%;
          margin-bottom: 20px;
          margin-top: 10px;
        }
        .inviteCode{
          font-size: 18px;
          font-weight: bold;
        }
        .info{
          text-align: left;
          color:#999;
          font-size: 14px;
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
