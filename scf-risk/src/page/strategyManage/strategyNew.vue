<template>
	<div class="page-container" style="overflow-y: auto;">
		<div class="container_box">
			<el-form ref="coreDetailForm" label-width="190px" size="mini" label-position="right">
		    	<div class="info-list">
		    		<p class="title">基本信息</p>
		    		<el-form-item label="策略名称：">
			        <el-input class="must_input" style="width: 300px;" v-model="detailDataForm.strategyName" placeholder="">
			        </el-input>
			      </el-form-item>
			      <el-form-item label="策略编号：">
			      	<el-input class="must_input" style="width: 300px;" v-model="detailDataForm.strategyCode" placeholder="">
			       </el-input>
			      </el-form-item>
			      <el-form-item label="策略版本：">
			      	<el-input  style="width: 300px;" v-model="detailDataForm.strategyVersion" disabled placeholder="">
			       </el-input>
			      </el-form-item>
			      <el-form-item label="策略描述：">
			      	<el-input
					  type="textarea"
					  style="width: 300px;"
					  :autosize="{ minRows: 2, maxRows: 4}"
					  placeholder="请输入内容"
					  v-model="detailDataForm.strategyDescription">
					</el-input>
			       </el-input>
			      </el-form-item>
			      <el-form-item label="策略状态：">
					      <el-switch
							  	v-model="detailDataForm.strategyStatus"
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
    name: 'StrategyNew',
    components: { Upload },
    data () {
      	return {
      		queryDataCategoryList:'',//规则匹配数据
      		categoryIndex:0,//规则分类索引，默认为0（第一个）
      		categoryCode:'PERSON_CREDIT',//分类的值code	
	        detailDataForm:{
	        	strategyName:'',
	        	strategyCode:'',
	        	strategyVersion:'1.0',
	        	strategyDescription:'',
	        	strategyStatus:'DISABLED'
	        },//提交的数据
      	}
    },
    watch:{
	  	//监听路由切换回调
	  	'$route':'fetchdata',
	  	categoryCode(val){ 
	  		let _item = this.queryDataCategoryList
	  		for(let i=0;i<_item.length;i++){
	  			if(val===_item[i].categoryCode){
	  				this.categoryIndex = i;
	  			}
	  		}
	  	}
	  },
    computed: {
      	...mapGetters([
        'roleHasPermissions', // 用户权限list
        	'tableMaxHeight'
      	]),
      	newQueryDataCategoryList(){
      		return this.queryDataCategoryList
      	}
    },
    created () {
    },
    mounted () {
    	this.init();
    },
    methods: {
    	init(){
    	},
	    saveStrategy(){
	    	let data = {
	    		strategyName:'',
        	strategyCode:'',
        	strategyVersion:'',
        	strategyDescription:'',
        	strategyStatus:'',
	    	}
	    	if(!this.detailDataForm.strategyName){
	    		this.$notify.error('策略名称不能为空')
	    		return false;
	    	}
	    	if(!this.detailDataForm.strategyCode){
	    		this.$notify.error('策略编码不能为空')
	    		return false;
	    	}
	    	data.strategyName = this.detailDataForm.strategyName;
	    	data.strategyCode = this.detailDataForm.strategyCode;
	    	data.strategyVersion = this.detailDataForm.strategyVersion;
	    	data.strategyDescription = this.detailDataForm.strategyDescription;
	    	data.strategyStatus = this.detailDataForm.strategyStatus;
	      	StrategyDetail.addStrategy(data).then(res =>{
	      		if(res.data.code === '200'){
	      			this.$store.dispatch('DelVisitedViews', {path: this.$route.path}).then(() => {
						this.$router.push({ path: '/strategyManage/strategyDetail/'+this.detailDataForm.strategyCode+'/'+this.detailDataForm.strategyVersion});
	      				this.$notify.success(res.data.message)
		      			this.resetForm();//重置表单
	      			})
	      		}else{
	      			this.$notify.error(res.data.message)
	      		}
	      	}).catch(()=>{})
		},// 保存详情  提交
		cancelNew(){//取消新建
			this.resetForm();//重置表单
			this.$store.dispatch('DelVisitedViews', {path: this.$route.path}).then(() => {
                this.$router.push({ path: '/strategyManage/strategyList'});
           	})
		},
		resetForm (){//重置表单
			this.detailDataForm = {
	        	strategyName:'',
	        	strategyCode:'',
	        	strategyVersion:'1.0',
	        	strategyDescription:'',
	        	strategyStatus:'DISABLED'
	       }
		}
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "strategyDetail.scss";
</style>
