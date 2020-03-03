<template>
	<div class="page-container" style="overflow-y: auto;">
		<div class="container_box">
			<el-form ref="coreDetailForm" label-width="190px" size="mini" label-position="right">
		    	<div class="info-list">
		    		<p class="title">基本信息</p>
		    		<el-form-item label="策略名称：">
			        <el-input class="must_input" style="width: 300px;" v-model="detailData.strategyName" placeholder="">
			        </el-input>
			      </el-form-item>
			      <el-form-item label="策略编号：">
			      	<el-input class="must_input" style="width: 300px;" v-model="detailData.strategyCode" :disabled="true" placeholder="">
			       </el-input>
			      </el-form-item>
			      <el-form-item label="策略版本：">
			      	<el-input class="must_input" style="width: 300px;" v-model="detailData.strategyVersion" :disabled="true" placeholder="">
			       </el-input>
			      </el-form-item>
			      <el-form-item label="策略描述：">
			      	<el-input
					  type="textarea"
					  style="width: 300px;"
					  placeholder="请输入内容"
					  v-model="detailData.strategyDescription">
					</el-input>
			      </el-form-item>
			      <el-form-item label="策略状态：">
			      	<el-switch
					  	v-model="detailData.strategyStatus"
					  	active-color="#13ce66"
					    active-value="ENABLED"
					    inactive-value="DISABLED">
					</el-switch>
			      </el-form-item>
		    	</div>
		    	<div class="info-list" style="text-align: center;" v-if="!roleHasPermissions['payment_manage_payment_income_saveSubmit']">
			      <el-button  @click="saveStrategy" type="primary">保存</el-button>
			      <el-button @click="cancelNew">取消</el-button>
			    </div>
			</el-form>
		</div>
  </div>
</template>

<script>
  	import { mapGetters } from 'vuex'
	import Upload from '@/components/Upload/Upload'
  	import defaultImg from '@/assets/imgs/default.jpg'
  	import { comboboxBankList } from '@/api/common'
	import StrategyDetail from '@/api/strategyManage/strategyDetail'
  	import { validContent } from '@/utils/validate'
  	import { Format } from '@/utils/index'
  export default {
    name: 'StrategyEdit',
    components: { Upload },
    data () {
      	return {
      		id:{
      			strategyCode:'',
      			strategyVersion:''
      		},
      		categoryIndex:0,//规则分类索引，默认为0（第一个）
      		categoryCode:'',//分类的值code	
	        detailData:{
	        	strategyName:'',
	        	strategyCode:'',
	        	strategyVersion:'',
	        	strategyDescription:'',
	        	strategyStatus:'',
	        	strategyDescription:''
	        },//提交的数据
      	}
    },
    watch:{
	  	//监听路由切换回调
	  	'$route'(to,from){
	  		this.id.strategyCode = this.$route.params.strategyCode
		  	this.id.strategyVersion = this.$route.params.strategyVersion
		  	if (this.id.strategyCode) {
		    	this.init()
		  	}
	  	},
	  },
    computed: {
      	...mapGetters([
        'roleHasPermissions', // 用户权限list
        	'tableMaxHeight'
      	])
    },
    created () {
    	this.id.strategyCode = this.$route.params.strategyCode
	  	this.id.strategyVersion = this.$route.params.strategyVersion
	  	if (this.id.strategyCode) {
	    	this.init()
	  	}
    },
    mounted () {
    },
    methods: {
    	init(){
    		this.getQueryStrategyDetail();
//  		this.getQueryDataCategoryList();
    	},
    	getQueryStrategyDetail(){
    		StrategyDetail.topQueryRulesetDetail(this.id).then(res => {
	          if (res.data.code === '200') {
	          	this.detailData.strategyName = res.data.data.strategyName
	          	this.detailData.strategyCode = res.data.data.strategyCode
	          	this.detailData.strategyVersion = res.data.data.strategyVersion
	          	this.detailData.strategyDescription = res.data.data.strategyDescription  
	          	this.detailData.strategyStatus = res.data.data.strategyStatus
	          } else {
	            this.$notify.error(res.data.message)
	          }
	        })
    	},
	    fetchdata(){
	    },
	    saveStrategy(){
	    	let data = {
	    		strategyName:'',
        	strategyCode:'',
        	strategyVersion:'',
        	strategyDescription:'',
        	strategyStatus:'',
        	strategyDescription:''
	    	}
	    	if(!this.detailDataForm.strategyName){
	    		this.$notify.error('策略名称不能为空')
	    		return false;
	    	}
	    	if(!this.detailDataForm.strategyCode){
	    		this.$notify.error('策略编码不能为空')
	    		return false;
	    	}
	    	data.strategyName = this.detailData.strategyName;
	    	data.strategyCode = this.detailData.strategyCode;
	    	data.strategyVersion = this.detailData.strategyVersion;
	    	data.strategyDescription = this.detailData.strategyDescription;
	    	data.strategyStatus = this.detailData.strategyStatus;
	    	data.strategyDescription = this.detailData.strategyDescription;
	      	StrategyDetail.topEditRulesetDetail(data).then(res =>{
	      		if(res.data.code === '200'){
	      			this.$store.dispatch('DelVisitedViews', {path: this.$route.path}).then(() => {
						this.$router.push({ path: '/strategyManage/strategyDetail/'+this.id.strategyCode+'/'+this.id.strategyVersion});
						this.$notify.success(res.data.message)
					})
	      			
	      		}else{
	      			this.$notify.error(res.data.message)
	      		}
	      	}).catch(()=>{})
		},// 保存详情  提交
		cancelNew(){//取消新建
			this.$store.dispatch('DelVisitedViews', {path: this.$route.path}).then(() => {
                this.$router.push({ path: '/strategyManage/strategyDetail/'+this.id.strategyCode+'/'+this.id.strategyVersion});
           	})
			
		}
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "strategyDetail.scss";
</style>
