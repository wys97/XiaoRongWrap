<template>
  <div class="page-container" ref="page-container" id="page-container" style="padding-top: 30px;overflow-y: auto;"><!---供应商管理-供应商入驻--->
    <el-row :gutter="10">
		  <el-col :span="11">
		  	<div class="h_top">
		  		<p class="h_title">待办事项</p>
		  		<el-row>
		  			<el-col :span="8">
		  				<p class="h_name">待审核进件商户</p>
		  				<p class="h_amt">
		  					<router-link to="/supplierManage/supplierRegister" class="router-link">
		  						{{backlogData.pendingMerchants}}
		  					</router-link>
		  				</p>
		  			</el-col>
		  			<el-col :span="8">
		  				<p class="h_name">待审核融资单（笔）</p>
		  				<p class="h_amt">
		  					<router-link to="/financeManage/financeAudit" class="router-link">
		  						{{backlogData.pendingFinanceOrders}}
		  					</router-link>
		  				</p>
		  			</el-col>
		  			<el-col :span="8">
		  				<p class="h_name">贷中异常预警（条）</p>
		  				<p class="h_amt">{{backlogData.alertNum}}</p>
		  			</el-col>
		  		</el-row>
		  	</div>
		  </el-col>
		  <el-col :span="13">
		  	<div class="h_top">
		  		<p class="h_title">数据统计</p>
			  	<el-row>
					  <el-col :span="6">
					  	<div class="">
					  		<p class="h_name">商户（个）</p>
					  		<p class="h_amt">{{statisticsData.merchantNum}}</p>
					  	</div>
					  </el-col>
					  <el-col :span="6">
					  	<div class="">
					  		<p class="h_name">累计融资总笔数（笔）</p>
					  		<p class="h_amt">{{statisticsData.financeOrderNum}}</p>
					  	</div>
					  </el-col>
					  <el-col :span="6">
					  	<div class="">
					  		<p class="h_name">资方（个）</p>
					  		<p class="h_amt">
						  		<router-link to="/capticalManage/capticalList" class="router-link">
			  						{{statisticsData.capitalNum}}
			  					</router-link>
		  					</p>
					  	</div>
					  </el-col>
					  <el-col :span="6">
					  	<div class="">
					  		<p class="h_name">累计融资总金额（元）</p>
					  		<p class="h_amt">{{statisticsData.totalFinanceAmount}}</p>
					  	</div>
					  </el-col>
					</el-row>
		  	</div>
		  </el-col>
		  <el-col :span="11">
		  	<div class="h_top">
		  		<p class="h_title">待收统计</p>
		  		<el-row>
		  			<el-col :span="6">
		  				<p class="h_name">待收笔数（笔）</p>
		  				<p class="h_amt">{{collectionStatisticsData.count}}</p>
		  			</el-col>
		  			<el-col :span="6">
		  				<p class="h_name">待收本金（元）</p>
		  				<p class="h_amt">{{collectionStatisticsData.amount}}</p>
		  			</el-col>
		  			<el-col :span="6">
		  				<p class="h_name">待收总额（元）</p>
		  				<p class="h_amt">{{collectionStatisticsData.totalAmount}}</p>
		  			</el-col>
		  			<el-col :span="6">
		  				<p class="h_name">待收利息（元）</p>
		  				<p class="h_amt">{{collectionStatisticsData.interest}}</p>
		  			</el-col>
		  		</el-row>
		  	</div>
		  </el-col>
		  <el-col :span="13">
		  	<div class="h_top">
		  		<p class="h_title">逾期统计</p>
			  	<el-row>
					  <el-col :span="6">
					  	<div class="">
					  		<p class="h_name">逾期笔数（笔）</p>
					  		<p class="h_amt">{{overdueStatisticalData.count}}</p>
					  	</div>
					  </el-col>
					  <el-col :span="6">
					  	<div class="">
					  		<p class="h_name">逾期本金（元）</p>
					  		<p class="h_amt">{{overdueStatisticalData.amount}}</p>
					  	</div>
					  </el-col>
					  <el-col :span="6">
					  	<div class="">
					  		<p class="h_name">逾期总额（元）</p>
					  		<p class="h_amt">{{overdueStatisticalData.totalAmount}}</p>
					  	</div>
					  </el-col>
					  <el-col :span="6">
					  	<div class="">
					  		<p class="h_name">逾期利息（元）</p>
					  		<p class="h_amt">{{overdueStatisticalData.interest}}</p>
					  	</div>
					  </el-col>
					</el-row>
		  	</div>
		  </el-col>
		</el-row>
  	<el-row :gutter="20">
		  <el-col :span="12">
		  	<NoteChart v-if="collectionData" :chartData="collectionData" :title="'回款数据'" :legendData="['金额','笔数']"></NoteChart>
		  </el-col>
		  <el-col :span="12">
		  	<NoteChart v-if="loanData" :chartData="loanData" :title="'放款数据'" :legendData="['金额','笔数']"></NoteChart>
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
      	backlogData:{},//待办事项
      	statisticsData:{},//数据统计
      	collectionStatisticsData:{},//代收统计
      	overdueStatisticalData:{},//逾期统计
      	collectionData:'',//回款数据
      	loanData:'',//放款数据
      }
	  },
	  watch:{
	  	collectionData(val){
	  		this.collectionData = val;
	  	},
	  	loanData(val){
	  		this.loanData = val;
	  	},
	  	
	  },
	  methods:{
	  	getBacklogData(){//获取待办事项
	  		let that = this;
	  		homeApi.backlog().then(res => {
          if (res.data.code === '200') {
          	that.backlogData = res.data.data;
          } else {
          	this.$message.error(res.data.message)
          }
        })
	  	},
	  	getStatisticsData(){//获取数据统计
	  		let that = this;
	  		homeApi.dataStatistics().then(res => {
          if (res.data.code === '200') {
          	that.statisticsData = res.data.data;
          } else {
          	this.$message.error(res.data.message)
          }
        })
	  	},
	  	getCollectionStatisticsData(){//获取代收统计
	  		let that = this;
	  		homeApi.collectionStatistics().then(res => {
          if (res.data.code === '200') {
          	that.collectionStatisticsData = res.data.data;
          } else {
          	this.$message.error(res.data.message)
          }
        })
	  	},
	  	getOverdueStatisticalData(){//获取逾期统计
	  		let that = this;
	  		homeApi.overdueStatistical().then(res => {
          if (res.data.code === '200') {
          	that.overdueStatisticalData = res.data.data;
          } else {
          	this.$message.error(res.data.message)
          }
        })
	  	},
	  	getCollectionData(){//获取回款数据
	  		let that = this;
	  		homeApi.collectionData().then(res => {
          if (res.data.code === '200') {
          	that.collectionData = res.data.data;
          } else {
          	this.$message.error(res.data.message)
          }
        })
	  	},
	  	getLoanData(){//获取放款数据
	  		let that = this;
	  		homeApi.loanData().then(res => {
          if (res.data.code === '200') {
          	that.loanData = res.data.data;
          	console.log(that.loanData)
          } else {
          	this.$message.error(res.data.message)
          }
        })
	  	}		
	  },
	  created(){
	  	let that = this;
	  	that.getBacklogData();
	  	that.getStatisticsData();
	  	that.getCollectionStatisticsData();
	  	that.getOverdueStatisticalData();
	  	that.getCollectionData();
	  	that.getLoanData();
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
