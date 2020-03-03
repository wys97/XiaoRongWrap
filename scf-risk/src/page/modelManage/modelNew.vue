<template>
	<div class="page-container" style="overflow-y: auto;">
		<div class="container_box">
			<el-form :rules='rules' :model="detailDataForm" ref="coreDetailForm" label-width="190px" size="mini" label-position="right">
        <div class="info-list">
          <p class="title">基本信息</p>
          <el-form-item label="模型名称：" prop="modelName">
            <el-input style="width: 300px;" v-model="detailDataForm.modelName">
            </el-input>
          </el-form-item>

          <el-form-item label="模型编号：" prop="modelCode">
            <el-input style="width: 300px;" v-model="detailDataForm.modelCode" :disabled="!isAdd">
            </el-input>
          </el-form-item>

          <el-form-item label="应用场景：">
            <template v-if="sceneList">
			    <el-radio-group v-model="detailDataForm.modelScene">
			  	  <span v-for="item in sceneList" style="padding-right: 15px;">
			  		  <el-radio :label="item.sceneCode">{{item.sceneName}}</el-radio>
			  	  </span>
			    </el-radio-group>
			</template>
          </el-form-item>

          <el-form-item label="模型版本：" prop="modelVersion">
            <el-input style="width: 300px;" v-model="detailDataForm.modelVersion" disabled>
			       </el-input>
          </el-form-item>

			      <el-form-item label="模型描述：">
			      	<el-input
                type="textarea"
                style="width: 300px;"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="detailDataForm.modelDescription">
					    </el-input>
			      </el-form-item>

			      <el-form-item label="模型状态：">
			      	<el-switch
                v-model="detailDataForm.modelStatus"
                active-color="#13ce66"
                active-value="ENABLED"
                inactive-value="DISABLED">
					    </el-switch>
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
  import { GetSceneList} from '@/api/common'
	import { AddModel, TopQueryModelDetail, TopEditModelDetail } from '@/api/modelManage/modelDetail'

  export default {
    name: 'RuleSetNew',
    data () {
      return {
        detailDataForm: {
          modelName: '',
          modelCode: '',
          modelVersion: '1.0',
          modelScene: '',
          modelDescription: '',
          modelStatus: 'DISABLED'
        },
        rules: {
          modelName: [{
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('模型名称必填'))
              } else {
                callback()
              }
            }
          }],
          modelCode: [{
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('模型编号必填'))
              } else {
                callback()
              }
            }
          }],
          modelVersion: [{
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('模型版本必填'))
              } else {
                callback()
              }
            }
          }]
        },
        isAdd: false,
        queryData: {
          modelCode: '',
          modelVersion: ''
        },
        sceneList: []
      }
    },
    watch: {
      '$route' (to, from) {
        if (to.name === '新建模型') {
          this.isAdd = true;
          this.detailDataForm = {
            modelName: '',
            modelCode: '',
            modelVersion: '1.0',
            modelScene: '',
            modelDescription: '',
            modelStatus: 'DISABLED'
          };
        } else if (to.name === '编辑模型') {
          this.isAdd = false;
          const {modelCode, modelVersion} = to.params;
          this.queryData.modelCode = modelCode;
          this.queryData.modelVersion = modelVersion;
          this.getTopQueryModelDetail();
        }
      }
	  },
    computed: {
      	...mapGetters([
        'roleHasPermissions', // 用户权限list
        	'tableMaxHeight'
      	])
    },
    created () {
      if (this.$route.name === '新建模型') {
        this.isAdd = true;
      } else if (this.$route.name === '编辑模型') {
        this.isAdd = false;
        const {modelCode, modelVersion} = this.$route.params;
        if (this.queryData.modelCode !== modelCode || this.queryData.modelVersion !== modelVersion) {
          this.queryData.modelCode = modelCode;
          this.queryData.modelVersion = modelVersion;
          this.getTopQueryModelDetail();
        }
      }
    },
    mounted () {
      this.getSceneList();
    },
    methods: {
    	init(){
    		this.getSceneList();
    	},
	    fetchdata(){
	    },
	    getSceneList(){
	    	GetSceneList().then(res => {
	    		if(res.data.code === '200') {
	    			this.sceneList = res.data.data;
	    			this.detailDataForm.modelScene = this.sceneList[0].sceneCode;
	    		}
	    	})
	    },
      getTopQueryModelDetail () {
        this.detailDataForm = {
          modelName: '',
          modelCode: '',
          modelVersion: '1.0',
          modelScene: '',
          modelDescription: '',
          modelStatus: 'DISABLED'
        };
        TopQueryModelDetail(this.queryData).then(res => {
          if(res.data.code === '200') {
            this.detailDataForm = res.data.data;
          }
        });
      },
	    saveRuleSet() {
	        this.$refs.coreDetailForm.validate(valid => {
	          if (valid) {
	            let data = {
	              modelName:'',
	              modelCode:'',
	              modelVersion:'',
	              modelScene:'',
	              modelDescription:'',
	              modelStatus:'',
	            }
	            data.modelName = this.detailDataForm.modelName;
	            data.modelCode = this.detailDataForm.modelCode;
	            data.modelVersion = this.detailDataForm.modelVersion;
	            data.modelScene = this.detailDataForm.modelScene;
	            data.modelDescription = this.detailDataForm.modelDescription;
	            data.modelStatus = this.detailDataForm.modelStatus;
	            const postApi = this.isAdd ? AddModel : TopEditModelDetail;
	            postApi(data).then(res => {
	              if(res.data.code === '200') {
	              	this.$store.dispatch('DelVisitedViews', {path: this.$route.path}).then(() => {
	                	this.$router.push({ path: `/modelManage/modelDetail/${data.modelCode}/${data.modelVersion}`});
		                this.$notify.success(res.data.message);
						this.resetForm();//重置表单
	                })
	              }
	            }).catch(()=>{});
	          }
	        })
	    },
		cancelNew(){//取消新建
			this.resetForm();//重置表单
			if(this.isAdd===true){
				this.$store.dispatch('DelVisitedViews', {path: this.$route.path}).then(() => {
	                this.$router.push({ path: '/modelManage/modelList'});
	           	})
			}else{
				this.$store.dispatch('DelVisitedViews', {path: this.$route.path}).then(() => {
	                this.$router.push({ path: '/modelManage/modelDetail/'+this.queryData.modelCode+'/'+this.queryData.modelVersion});
	           	})
			}
			
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
  @import "modelDetail.scss";
</style>
