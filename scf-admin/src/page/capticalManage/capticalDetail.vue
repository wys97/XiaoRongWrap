<template>
  <div class="container">
    <div class="top">
      	<ul class="flex-item">
	      	<li>{{detailData.enterpriseName}}</li>
	      	<li>联系人：{{detailData.receiverName}}</li>
	      	<li>手机号：{{detailData.receiverPhone}}</li>
	      	<li>创建时间：{{detailData.createTime?detailData.createTime:'--'}}</li>
      	</ul>
      	<div class="flex-item" style="text-align: right;margin-right: 50px;">
      		<el-button :type="detailData.capticalStatus==='COOPERATING'?'success':''" plain disabled>{{detailData.capticalStatusText}}</el-button>
      	</div>
    </div>
    <div class="content">
      <div class="flex-item">
        <el-tabs v-model="activeName2" type="card" >
          	<el-tab-pane class="first_tab_content" label="详细信息" name="first">
	            <div class="tab-content">
	            	<el-form ref="coreDetailForm" label-width="190px" size="mini" label-position="right">
	            		<div class="info-list">
	            			<p class="title">基本信息</p>
				            <el-form-item label="企业名称：">
			                    <span class="form_val">{{detailData.enterpriseName}}</span>
			               </el-form-item>
				            <el-form-item label="统一社会信用代码：">
			                    <span class="form_val">{{detailData.businessLicenseNo}}</span>
			                </el-form-item>
				            <el-form-item label="法定代表人：">
			                    <span class="form_val">{{detailData.repreName}}</span>
			                </el-form-item>
				            <el-form-item label="法定代表人身份证：">
			                    <span class="form_val">{{detailData.repreIdcardNo}}</span>
			                </el-form-item>
				            <el-form-item label="法定代表人手机号：">
			                    <span class="form_val">{{detailData.mobile}}</span>
			                </el-form-item>
				            <el-form-item label="联系地址：">
			                    <span class="form_val">{{detailData.address	}}</span>
			                </el-form-item>
				            <el-form-item label="联系人：">
			                    <span class="form_val">{{detailData.receiverName}}</span>
			                </el-form-item>
				            <el-form-item label="手机号：">
			                    <span class="form_val">{{detailData.receiverPhone}}</span>
			                </el-form-item>
				            <el-form-item label="电话：">
			                    <span class="form_val">{{detailData.specialPlane}}</span>
			                </el-form-item>
				            <el-form-item label="传真：">
			                    <span class="form_val">{{detailData.fax}}</span>
			                </el-form-item>
				            <el-form-item label="电邮：">
			                    <span class="form_val">{{detailData.email}}</span>
			               </el-form-item>
	            		</div>
	            		<div class="info-list">
	            			<p class="title">收款账户</p>
				            <el-form-item label="开户名称：">
			                    <span class="form_val">{{detailData.bankUserName}}</span>
			                </el-form-item>
				            <el-form-item label="开户银行：">
			                    <span class="form_val">{{detailData.bankName}}</span>
			                </el-form-item>
				            <el-form-item label="开户网点：">
			                    <span class="form_val">{{detailData.bankBranch}}</span>
			                </el-form-item>
				            <el-form-item label="银行账号：">
			                    <span class="form_val">{{detailData.bankAccountNo}}</span>
			                </el-form-item>
	            		</div>
	            		<div class="info-list">
	            			<p class="title">授信</p>
				            <el-form-item label="平台授信额度：">
			                    <span class="form_val">{{detailData.creditLine}}</span>
			               </el-form-item>
	            		</div>
	            		<div class="info-list">
	            			<p class="title">CA证书</p>
				            <el-form-item label="状态：">
			                    <span class="form_val">
			                    	{{detailData.caTypeText}}
			                    	<span>{{detailData.caErrorInfo}}</span>
			                    	<!--未申请时-->
			                    	<el-button @click="applyCertificateClick" v-if="detailData.caType==='NOTAPPLY'" size="mini">申请</el-button>
			                    	<!--未通过时-->
			                    	<el-button @click="applyCertificateClick" v-if="detailData.caType==='FAILED'" size="mini">重新申请</el-button>
			                    </span>
			               </el-form-item>
	            		</div>
	            		<div class="info-list" style="padding-bottom: 60px;">
	            			<p class="title">账户信息</p>
				            <el-form-item label="账号：">
			                    <span class="form_val">{{detailData.loginName}}</span>
			               </el-form-item>
	            		</div>
	            	</el-form>
	            </div>
          	</el-tab-pane>
        </el-tabs>
      </div>  <!--tab-->
      <div class="flex-item">
      	<ul>
          	<li class="background-gray color-black">
	            <div>状态</div>
	            <div></div>
          	</li>
          	<li style="padding: 10px 0;">
	            <el-button  :type="detailData.capticalStatus==='COOPERATING'?'success':''" style="width: 80%;margin: auto;">{{detailData.capticalStatusText}}</el-button>	
	        </li>
        </ul>
      </div> <!--左侧操作栏-->
    </div>
    
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
	import Upload from '@/components/Upload/Upload'
  import defaultImg from '@/assets/imgs/default.jpg'
  import { comboboxBankList } from '@/api/common'
	import CapticalDetail from '@/api/capticalManage/capticalDetail'
  import { validContent } from '@/utils/validate'
  import { Format } from '@/utils/index'
  export default {
    name: 'CapticalDetail',
    components: { Upload },
    data () {
      	return {
	      	id: '', // 资金方id
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
      	init () {
        	this.getCapticalDetail();//资金方详情信息
      	}, // 初始化
      
      	getCapticalDetail () {
	        CapticalDetail.detail(this.id).then(res => {
	          if (res.data.code === '200') {
	          	this.detailData = res.data.data;
	          } else {
	            this.$message.error(res.data.message)
	          }
	        })
      	}, // 	资金方详情信息
      	applyCertificateClick () {
      		CapticalDetail.applyCertificate(this.id).then(res => {
	          if (res.data.code === '200') {
	          	this.getCapticalDetail();
	          } else {
	            this.$message.error(res.data.message)
	          }
	        })
      	}
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "capticalDetail.scss";
</style>
