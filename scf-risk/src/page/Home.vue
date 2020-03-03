<template>
  <div class="page-container" ref="page-container" id="page-container" style="padding-top: 30px;overflow-y: auto;"><!---供应商管理-供应商入驻--->
    <el-row :gutter="20">
		  <el-col :span="5">
		  	<div class="h_top">
		  		<p class="h_title">申请量</p>
		  		<p class="h_amt">{{statisticalData.total}}</p>
		  	</div>
		  </el-col>
		  <el-col :span="5">
		  	<div class="h_top">
		  		<p class="h_title">通过量</p>
		  		<p class="h_amt">{{statisticalData.pass}}</p>
		  	</div>
		  </el-col>
		  <el-col :span="5">
		  	<div class="h_top">
		  		<p class="h_title">复议量</p>
		  		<p class="h_amt">{{statisticalData.review}}</p>
		  	</div>
		  </el-col>
		  <el-col :span="5">
		  	<div class="h_top">
		  		<p class="h_title">拒绝量</p>
		  		<p class="h_amt">{{statisticalData.reject}}</p>
		  	</div>
		  </el-col>
		  <el-col :span="4">
		  	<div class="h_top">
		  		<p class="h_title">无结果量</p>
		  		<p class="h_amt">{{statisticalData.other}}</p>
		  	</div>
		  </el-col>
		</el-row>
  	<el-row :gutter="20">
		  <el-col :span="24">
		  	<NoteChart v-if="businessMonitorsData" :chartData="businessMonitorsData" :title="'业务量监控汇总'" :legendData="['日申请量','通过占比']"></NoteChart>
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
      	businessMonitorsData:'',//业务监控汇总
      	statisticalData:''//统计数据
      }
	  },
	  watch:{
	  	businessMonitorsData(val){
	  		this.collectionData = val;
	  	}
	  },
	  methods:{
	  	getBusinessMonitors(){//获取统计数据
	  		homeApi.getBusinessMonitors().then(res => {
          if (res.data.code === '200') {
          	this.businessMonitorsData = res.data.data;
        	}else{
        		this.$notify.error(res.data.message);
        	}
       	})
	  	},
	  	getStatisticalData (){//获取业务监控汇总
	  		homeApi.getStatisticalData().then(res => {
          if (res.data.code === '200') {
          	this.statisticalData = res.data.data;
        	}else{
        		this.$notify.error(res.data.message);
        	}
       	})
	  	},
	  },
	  created(){
	  },
	  mounted(){
	  	let that = this;
	  	that.getBusinessMonitors();
	  	that.getStatisticalData();
	  }
  
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.h_top{
		background-color: #F8F8F8;
		border: 1px solid #bbb;
		min-height: 100px;
	}
 	.h_title{
 		line-height: 50px;
 		text-align: center;
 	}
 	.h_amt{
 		text-align: center;
 		font-size: 24px;
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
