<template>
  <div class="container">
    <div class="top">
      <ul class="flex-item">
      	<li>新建核心企业</li>

      	<li>创建时间：{{detailData.createTime}}</li>
      </ul>
    </div>
    <div class="content">
      <div class="flex-item">
        <el-tabs v-model="activeName2" type="card" >
          	<el-tab-pane class="first_tab_content" label="详细信息" name="first">
	            <div class="tab-content">
	            	<el-form ref="coreDetailForm" label-width="190px" size="mini" label-position="right">
		            	<div class="info-list">
		            		<p class="title">基本信息</p>
		            		<el-form-item label="核心企业编码：">
	                    <el-input class="must_input" style="width: 300px;" v-model="detailData.id" placeholder="例：BAIGUOYUAN">
	                    </el-input>
	                  </el-form-item>
	                  <el-form-item label="核心企业名称：">
	                  	<el-input class="must_input" style="width: 300px;" v-model="detailData.enterpriseName" placeholder="例：百果园">
	                   </el-input>
	                  </el-form-item>
	                  <el-form-item label="成立日期：">
	                    <el-date-picker
	                    	class="must_input"
	                      v-model="detailData.setUpDate"
	                      align="right"
	                      type="date"
	                      placeholder="选择日期">
	                    </el-date-picker>
	                  </el-form-item>
	                  <el-form-item label="核心企业授信额度：">
	                    <el-input class="must_input" style="width: 300px;" v-model="detailData.creditLine">
	                    </el-input>
	                 	</el-form-item>
	                 	<el-form-item label="核心企业交易平台名称：">
	                    <el-input class="must_input" style="width: 300px;" v-model="detailData.scmSite">
	                    </el-input>
	                 	</el-form-item>
	                 	<el-form-item label="核心企业交易平台链接：">
	                    <el-input style="width: 300px;" v-model="detailData.url">
	                    </el-input>
	                 	</el-form-item>
		            	</div>
		            	<div class="info-list" style="text-align: right;" v-if="roleHasPermissions['payment_manage_payment_income_saveSubmit']">
	                  <el-button  @click="saveBankserial" type="primary">保存</el-button>
	                </div>
	            	</el-form>
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
	import CoreBusinessDetail from '@/api/CoreBusinessManage/CoreBusinessDetail'
  import { validContent } from '@/utils/validate'
  import { Format } from '@/utils/index'
  export default {
    name: 'CoreBusinessAdd',
    components: { Upload },
    data () {
      	return {
	      	id: '', // 核心企业id
	        detailData:{
	        	id:'',
	        	enterpriseName:'',
	        	setUpDate:'',
	        	creditLine:'',
	        	scmSite:'',
	        	url:''
	        },//详情数据
	      	
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
    },
    mounted () {
    },
    methods: {
	    	fetchdata(){
	     	},
	     	addSubsidiaryJson (){
	      	if(this.detailData.subsidiaryJsonList.length<100){
	      		this.detailData.subsidiaryJsonList.push({
	            			enterpriseName:'',//子公司名称
	            			businessLicenseNo	:'',//子公司社会统一信用代码
	       		});
	      	}else{
//	      		this.$message.error('2条够啦！')
	      	}
	      },//添加核心企业
	      deleteSubsidiaryJson (i){
	      	this.detailData.subsidiaryJsonList.splice(i,1);
	      },//删除核心企业
	     	saveBankserial(){
	     		if(!this.detailData.id){
	      		this.$message.error('核心企业编码不能为空');
	      		return;
		      }else{
		      	this.detailData.id = this.detailData.id.replace(/\s+/g,""); 
		      }
	    		if(!this.detailData.enterpriseName){
	      		this.$message.error('核心企业名称不能为空');
	      		return;
		      }else{
		      	this.detailData.enterpriseName = this.detailData.enterpriseName.replace(/\s+/g,""); 
		      }
	    		if(!this.detailData.setUpDate){
	      		this.$message.error('成立日期不能为空');
	      		return;
		     	}else{
		     		if((typeof this.detailData.setUpDate)==='object'){
		     			this.detailData.setUpDate = Format(this.detailData.setUpDate, 'yyyy-MM-dd');
		     		}
		     	}
	    		if(!this.detailData.creditLine){
	      		this.$message.error('授信额度不能为空');
	      		return;
		     	}
	    		if(!this.detailData.scmSite){
	      		this.$message.error('交易平台不能为空');
	      		return;
		     }
	      	let bankSerials = JSON.stringify(this.detailData);
	      	bankSerials = JSON.parse(bankSerials);
	      	CoreBusinessDetail.coreEnterpriseAdd(bankSerials).then(res =>{
	      		if(res.data.code === '200'){
    					this.$router.push({ path: '/CoreBusinessManage/CoreBusinessDetail/'+res.data.data.id});
	      			this.$message.success(res.data.message)
	      		}else{
	      			this.$message.error(res.data.message)
	      		}
	      	}).catch(()=>{})
		    },// 保存详情  提交
//    	init () {
//      	this.getRepaymentDetail();//还款详情信息
//    	}, // 初始化
      
//    	getRepaymentDetail () {
//	        CoreBusinessDetail.detail(this.id).then(res => {
//	          if (res.data.code === '200') {
//	          	this.detailData = res.data.data;
//	          	this.tableData = res.data.data.tradeBackClearRecordDtos;
//	          } else {
//	            this.$message.error(res.data.message)
//	          }
//	        })
//    	}, // 	还款详情信息
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "CoreBusinessDetail.scss";
</style>
