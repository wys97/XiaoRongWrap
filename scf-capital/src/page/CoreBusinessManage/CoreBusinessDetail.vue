<template>
  <div class="container">
    <div class="top">
      <ul class="flex-item">
      	<li>{{detailData.enterpriseName}}</li>

      	<li>创建时间：{{detailData.createTime}}</li>
      </ul>
    </div>
    <div class="content">
      <div class="flex-item">
        <el-tabs v-model="activeName2" type="card" >
          	<el-tab-pane class="first_tab_content" label="还款详情" name="first">
	            <div class="tab-content">
	            	<el-form ref="coreDetailForm" label-width="190px" size="mini" label-position="right">
		            	<div class="info-list">
		            		<p class="title">基本信息</p>
		            		<el-form-item label="核心企业编码：">
	                    <el-input style="width: 300px;" :disabled="true" v-model="detailData.id">
	                    </el-input>
	                  </el-form-item>
	                  <el-form-item label="核心企业名称：">
	                  	<el-input class="must_input" style="width: 300px;" v-model="detailData.enterpriseName">
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
		            	</div>
		            	<div class="info-list">
		            		<p class="title">授信</p>
		            		<el-form-item label="核心企业授信额度：">
	                    <el-input class="must_input" style="width: 300px;" v-model="detailData.creditLine">
	                    </el-input>
	                 </el-form-item>
		            	</div>
		            	<div class="info-list">
		            		<p class="title">交易平台</p>
		            		<el-form-item label="核心企业交易平台名称：">
	                    <el-input class="must_input" style="width: 300px;" v-model="detailData.scmSite">
	                    </el-input>
	                 	</el-form-item>
	                 	<el-form-item label="核心企业交易平台链接：">
	                    <el-input style="width: 300px;" v-model="detailData.url">
	                    </el-input>
	                 	</el-form-item>
		            	</div>
		            	<div class="info-list">
		            		<p class="title">签约子公司</p>
		            		<el-form-item label="子公司信息："> 
	                    <div>
	                    	<el-row class="text_c" :gutter="15" v-if="detailData.subsidiaryJsonList&&detailData.subsidiaryJsonList.length">
												  <el-col :span="6"><div>企业名称</div></el-col>
												  <el-col :span="6"><div>社会统一信用代码</div></el-col>
												</el-row>
												<div v-for="(subItem,subIndex) in  detailData.subsidiaryJsonList">
													<el-row class="text_c" :gutter="15" style="margin-bottom: 10px;">
													  <el-col :span="6">
													  	<el-input v-model="subItem.enterpriseName">
		                    			</el-input>
													  </el-col>
													  <el-col :span="6">
													  	<el-input  v-model="subItem.businessLicenseNo">
		                    			</el-input>
													  </el-col>
													  <el-col :span="2">
													  	<el-button  type="danger" style="position: relative;"  @click="deleteSubsidiaryJson(subIndex)">删除</el-button>	
													  </el-col>
													</el-row>
												</div>
												<el-row :gutter="15" style="margin-top: 10px;">
												  <el-col :span="6">
												  	<el-button type="primary" icon="el-icon-circle-plus-outline" @click="addSubsidiaryJson()" >新增子公司</el-button>
												  </el-col>
												</el-row>
	                    </div>
	                 </el-form-item>
		            	</div>
		            	<div class="info-list" v-if="roleHasPermissions['payment_manage_payment_income_saveSubmit']">
		            		<el-button style="float: left;" v-if="roleHasPermissions['core_enterprise_manage_list_view_delete']" type="danger"  @click="deletBankserial">删除核心企业</el-button>
	                  <el-button style="float: right;" v-if="roleHasPermissions['core_enterprise_manage_list_view_update']"  @click="saveBankserial" type="primary">保存</el-button>
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
    name: 'CoreBusinessDetail',
    components: { Upload },
    data () {
      	return {
	      	id: '', // 核心企业id
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
      	this.id = this.$route.params.id
      	if (this.id) {
        	this.init()
      	}
    },
    mounted () {
    },
    methods: {
	    	fetchdata(){
	    		this.id = this.$route.params.id
	    		if (this.id) {
		        /*this.init()*/
		      	}
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
//	    		for (let i=0;i<this.detailData.subsidiaryJsonList.length;i++) {
//	    			if(!this.detailData.subsidiaryJsonList[i].enterpriseName){
//		      		this.$message.error('子公司名称不能为空');
//		      		return;
//			     	}
//	    			if(!this.detailData.subsidiaryJsonList[i].enterpriseName){
//		      		this.$message.error('子公司社会统一信用代码不能为空');
//		      		return;
//			     	}
//	    		}
	      	let bankSerials = JSON.stringify(this.detailData);
	      	bankSerials = JSON.parse(bankSerials)
	      	if(!bankSerials.subsidiaryJsonList.length){
	      		bankSerials.subsidiaryJsonList = ''
	      	}else{
	      		bankSerials.subsidiaryJsonList = JSON.stringify(bankSerials.subsidiaryJsonList);
	      	}
	    		
	      	CoreBusinessDetail.coreEnterpriseUpdate(bankSerials).then(res =>{
	      		if(res.data.code === '200'){
	      			this.$message.success(res.data.message)
	      		}else{
	      			this.$message.error(res.data.message)
	      		}
	      	}).catch(()=>{})
		    },// 保存详情  提交
		    deletBankserial (){
		    	this.$confirm(`<p style="font-size: 14px;padding: 10px;text-align: center">确认删除核心企业?</p><p style="text-align: center">删除后将无法重新恢复！</p>`, '删除提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          dangerouslyUseHTMLString: true
	        }).then(() => {
	          this.coreEnterpriseDelete();
	        }).catch(() => {
	        })
		    },
		    coreEnterpriseDelete(){
		    	CoreBusinessDetail.coreEnterpriseDelete(this.id).then(res => {
	          if (res.data.code === '200') {
	            this.$message.success(res.data.message)
    					this.$router.push({ path: '/CoreBusinessManage/CoreBusinessList'});
	          } else {
	            this.$message.error(res.data.message)
	          }
	        })
		    },//删除核心企业
      	init () {
        	this.getRepaymentDetail();//还款详情信息
      	}, // 初始化
      
      	getRepaymentDetail () {
	        CoreBusinessDetail.detail(this.id).then(res => {
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
  @import "CoreBusinessDetail.scss";
</style>
