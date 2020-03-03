<template>
	<div class="page-container" style="overflow-y: auto;">
		<div class="container_box">
			<el-form ref="coreDetailForm" label-width="190px" size="mini" label-position="right">
		    	<div class="info-list">
		    		<p class="title">基本信息</p>
		    		<el-form-item label="规则集名称：">
			        <el-input class="must_input" style="width: 300px;" v-model="detailDataForm.rulesetName" placeholder="">
			        </el-input>
			      </el-form-item>
			      <el-form-item label="规则集编号：">
			      	<el-input class="must_input" style="width: 300px;" v-model="detailDataForm.rulesetCode" :disabled="true" placeholder="">
			       </el-input>
			      </el-form-item>
			      <el-form-item label="规则集版本：">
			      	<el-input class="must_input" style="width: 300px;" v-model="detailDataForm.rulesetVersion" :disabled="true" placeholder="">
			       </el-input>
			      </el-form-item>
			      <el-form-item label="规则集描述：">
			      	<el-input
					  type="textarea"
					  style="width: 300px;"
					  :autosize="{ minRows: 2, maxRows: 4}"
					  placeholder="请输入内容"
					  v-model="detailDataForm.rulesetDescribe">
					</el-input>
			       </el-input>
			      </el-form-item>
			      <el-form-item label="规则集状态：">
			      	<el-switch
					  	v-model="detailDataForm.rulesetStatus"
					  	active-color="#13ce66"
					    active-value="ENABLED"
					    inactive-value="DISABLED">
					</el-switch>
			      </el-form-item>
		    	</div>
		    	<hr />
		    	<div class="info-list" v-if="queryDataCategoryList">
		    		<p class="title">规则匹配</p>
		    		<el-form-item label="数据源分类：">
		    			<template>
						  	<el-radio-group v-model="categoryIndex" >
							  	<span v-for="(item,index) in queryDataCategoryList" style="padding-right: 20px;">
							  		<el-radio @change="radioChange(index,item.categoryCode)" :disabled="index!==categoryIndex" :label="index" border>{{item.categoryName}}</el-radio>
							  	</span>
						  	</el-radio-group>
						</template>
			      	</el-form-item>
			      	<el-form-item label="数据源选择：">
				      	<template  v-for="(item,sourceIndex) in queryDataCategoryList[categoryIndex].sourceList">
						  	<el-checkbox :indeterminate="item.dataCheckList.length!==item.dataList.length&&item.dataCheckList.length!==0" v-model="item.checkAll" @change="handleCheckAllChange(item.checkAll,sourceIndex)">{{item.sourceName}}</el-checkbox>
						  	<el-checkbox-group v-model="item.dataCheckList" @change="handleCheckedCitiesChange(item.dataCheckList,sourceIndex)">
						    	<el-checkbox v-for="dataListItem in item.dataList" :label="dataListItem.dataCode" :key="dataListItem.dataName">{{dataListItem.dataName}}</el-checkbox>
						  	</el-checkbox-group>
						  	<div style="margin: 15px 0;"></div>
						</template>
			      	</el-form-item>
		    	</div>
		    	<div class="info-list" style="text-align: center;" v-if="!roleHasPermissions['payment_manage_payment_income_saveSubmit']">
			      <el-button  @click="saveRuleSet" type="primary">保存</el-button>
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
	import RuleSetDetail from '@/api/ruleSetManage/ruleSetDetail'
  	import { validContent } from '@/utils/validate'
  	import { Format } from '@/utils/index'
  export default {
    name: 'RuleSetNew',
    components: { Upload },
    data () {
      	return {
      		id:{
      			rulesetCode:'',
      			rulesetVersion:''
      		},
      		queryDataCategoryList:'',//规则匹配数据
      		categoryIndex:0,//规则分类索引，默认为0（第一个）
      		categoryCode:'',//分类的值code	
	        detailDataForm:{
	        	rulesetName:'',
	        	rulesetCode:'',
	        	rulesetVersion:'',
	        	rulesetDescribe:'',
	        	rulesetStatus:'',
	        	dataCategory:'',
	        	dataCodes:''
	        },//提交的数据
      	}
    },
    watch:{
	  	//监听路由切换回调
	  	'$route' (to,from){
	  		this.id.rulesetCode = this.$route.params.rulesetCode
		  	this.id.rulesetVersion = this.$route.params.rulesetVersion
		  	if (this.id.rulesetCode) {
		    	this.init()
		  	}
	  	},
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
    	this.id.rulesetCode = this.$route.params.rulesetCode
	  	this.id.rulesetVersion = this.$route.params.rulesetVersion
	  	if (this.id.rulesetCode) {
	    	this.init()
	  	}
    },
    mounted () {
    },
    methods: {
    	init(){
    		this.getQueryRulesetDetail();
//  		this.getQueryDataCategoryList();
    	},
    	getQueryRulesetDetail(){
    		RuleSetDetail.topQueryRulesetDetail(this.id).then(res => {
          if (res.data.code === '200') {
          	this.queryDataCategoryList = res.data.data.dataCategory.categoryList
          	this.categoryCode =  res.data.data.dataCategory.categoryCheck
          	this.detailDataForm.rulesetName = res.data.data.rulesetName
          	this.detailDataForm.rulesetCode = res.data.data.rulesetCode
          	this.detailDataForm.rulesetVersion = res.data.data.rulesetVersion
          	this.detailDataForm.rulesetDescribe = res.data.data.rulesetDescribe
          	this.detailDataForm.rulesetStatus = res.data.data.rulesetStatus
          } else {
            this.$notify.error(res.data.message)
          }
        })
    	},
//  	getQueryDataCategoryList(){
//  		RuleSetDetail.getQueryDataCategoryList().then(res => {
//        if (res.data.code === '200') {
//        	this.queryDataCategoryList = res.data.data.categoryList
//        } else {
//          this.$notify.error(res.data.message)
//        }
//      })
//  	},//获取数据源分类
    	radioChange(index,categoryCode){
    		this.categoryIndex = index
    		this.detailDataForm.dataCategory =categoryCode;
    	},
    	handleCheckAllChange(val,sourceIndex) {//点击勾选全部
    		let _item = this.queryDataCategoryList[this.categoryIndex].sourceList[sourceIndex]
    		if(val){
    			for(let i=0;i<_item.dataList.length;i++){
    				_item.dataCheckList.push(_item.dataList[i].dataCode)
    			}
    		}else{
    			_item.dataCheckList = [];
    		}
      	},
     	handleCheckedCitiesChange(dataCheckList,sourceIndex) {//点数据源选择复选框
    		let _item = this.queryDataCategoryList[this.categoryIndex].sourceList[sourceIndex]
    		if(_item.dataCheckList.length===_item.dataList.length&&_item.dataCheckList.length!==0){
    			_item.checkAll = true;
    		}else{
    			_item.checkAll = false;
    		}
      	},
	    fetchdata(){
	    },
	    addSubsidiaryJson (){
	      	if(this.detailDataForm.subsidiaryJsonList.length<100){
	      		this.detailDataForm.subsidiaryJsonList.push({
		    			enterpriseName:'',//子公司名称
		    			businessLicenseNo	:'',//子公司社会统一信用代码
	       		});
	      	}else{
//	      		this.$notify.error('2条够啦！')
	      	}
	    },//添加核心企业
	    deleteSubsidiaryJson (i){
	      	this.detailDataForm.subsidiaryJsonList.splice(i,1);
	    },//删除核心企业
	    saveRuleSet(){
	    	let data = {
	    		rulesetName:'',
        	rulesetCode:'',
        	rulesetVersion:'',
        	rulesetDescribe:'',
        	rulesetStatus:'',
        	dataCategory:'',
        	dataCodes:''
	    	}
	    	if(!this.detailDataForm.rulesetName){
	    		this.$notify.error('规则集名称不能为空')
	    		return false;
	    	}
	    	if(!this.detailDataForm.rulesetCode){
	    		this.$notify.error('规则集编码不能为空')
	    		return false;
	    	}
	    	data.rulesetName = this.detailDataForm.rulesetName;
	    	data.rulesetCode = this.detailDataForm.rulesetCode;
	    	data.rulesetVersion = this.detailDataForm.rulesetVersion;
	    	data.rulesetDescribe = this.detailDataForm.rulesetDescribe;
	    	data.rulesetStatus = this.detailDataForm.rulesetStatus;
	    	data.dataCategory = this.detailDataForm.dataCategory||this.categoryCode;
	    	let _list = this.queryDataCategoryList[this.categoryIndex].sourceList
	    	let _arr = []
	    	for (let i=0;i<_list.length;i++) {
	    		_arr = _arr.concat(_list[i].dataCheckList)
	    	}
	    	data.dataCodes = _arr.join();
	    	if(!data.dataCodes){
	    		this.$notify.error('数据源未勾选')
	    		return false;
	    	}
//	      	let bankSerials = JSON.stringify(this.detailDataForm);
//	      	bankSerials = JSON.parse(bankSerials);
	      	RuleSetDetail.topEditRulesetDetail(data).then(res =>{
	      		if(res.data.code === '200'){
	      			this.$store.dispatch('DelVisitedViews', {path: this.$route.path}).then(() => {
    					this.$router.push({ path: '/ruleSetManage/ruleSetDetail/'+this.id.rulesetCode+'/'+this.id.rulesetVersion});
    					this.$notify.success(res.data.message)
    				})
	      			
	      		}else{
	      			this.$notify.error(res.data.message)
	      		}
	      	}).catch(()=>{})
		},// 保存详情  提交
		cancelNew(){//取消新建
			this.$store.dispatch('DelVisitedViews', {path: this.$route.path}).then(() => {
                this.$router.push({ path: '/ruleSetManage/ruleSetDetail/'+this.id.rulesetCode+'/'+this.id.rulesetVersion});
           	})
			
		}
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "ruleSetDetail.scss";
</style>
