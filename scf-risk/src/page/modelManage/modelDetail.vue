<template>
  <div class="page-container" style="overflow-y: auto;">
    <div class="top_detail">
    	<el-row style="line-height: 50px;">
			  <el-col :span="12">
			  	{{modelDetailData.modelName}}
			  </el-col>
			  <el-col :span="12" style="text-align: right;">
			  	<span @click="editModel" class="cursor_a" style="font-size: 30px;padding: 5px;">
			  		<i class="el-icon-edit-outline" ></i>
			  	</span>
			  	<span  @click="deletModel" class="cursor_a" style="font-size: 30px;padding: 5px;">
			  		<i class="cursor_a el-icon-delete" style="font-size: 30px;"></i>
			  	</span>
			  </el-col>
			</el-row>
			<el-row style="line-height: 30px;">
			  <el-col :span="5">
			  	模型编号：{{modelDetailData.modelCode}}
			  </el-col>
			  <el-col :span="6" style="text-align: right;">
			  	模型版本：{{modelDetailData.modelVersion}}
			  </el-col>
			  <el-col :span="5" style="text-align: right;">
			  	模型状态：{{modelDetailData.modelStatus}}
			  </el-col>
			</el-row>
			<el-row style="line-height: 30px;">
			  <el-col :span="24" >
			  	模型描述：{{modelDetailData.modelDescription}}
			  </el-col>
			</el-row>
    </div>
    <div class="">
    	<el-row style="line-height: 70px;">
        <el-col :span="12">
          <el-button-group>
          <el-button @click.stop="changeTabStatus('ruleset')" :type="tabStatus === 'ruleset' ? 'primary' : 'info'">规则集视图</el-button>
          <el-button @click.stop="changeTabStatus('grade')" :type="tabStatus === 'grade' ? 'primary' : 'info'">模型分值视图</el-button>
          </el-button-group>
        </el-col>
			<el-col :span="12" style="text-align: right;">
			  	<el-button @click.stop="doAddReset" type="primary">添加规则集</el-button>
			</el-col>
		</el-row>
    </div>
    <div>
      <template v-if="tabStatus === 'ruleset'">
        <el-table :data="rulesetList" key="ruleset">
          <el-table-column
            label="序号"
            type="index"
            align="center">
          </el-table-column>
          <el-table-column prop="rulesetName" label="规则集名称" min-width="100">
          </el-table-column>

          <el-table-column prop="rulesetCode" label="规则集编号" min-width="80">
          </el-table-column>

          <el-table-column prop="rulesetCategoryText" label="规则集类型" width="220">
          </el-table-column>

          <el-table-column prop="enableRuleCount" label="启用规则条数" width="122" align="center">
          </el-table-column>

          <el-table-column prop="rulesetVersion" label="在用版本" width="122" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.rulesetVersion" @change="rulesetVersionChange(scope.row.rulesetVersion, scope.row.rulesetCode)">
                <el-option v-for="(item, i) in scope.row.rulesetVersions" :key="i" :label="item" :value="item"></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column prop="ruleStatus" label="启用/禁用" width="122" align="center">
            <template slot-scope="scope">
              <el-switch
                @change="enableDisableRuleset(scope.row.rulesetStatus,scope.row.rulesetCode)"
                v-model="scope.row.rulesetStatus"
                active-color="#13ce66"
                active-value="ENABLED"
                inactive-value="DISABLED">
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column prop="ruleCode" label="操作" width="132" align="center">
            <template slot-scope="scope">
              <router-link :to="'/ruleSetManage/ruleSetDetail/' + scope.row.rulesetCode + '/' + scope.row.rulesetVersion" style="display: inline" class="router_link">编辑</router-link>
              <span @click="deleteRuleset(scope.row.rulesetCode)" class="cursor_a router_link">
							移除
						</span>
            </template>
          </el-table-column>

          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table :data="scope.row.ruleList">
                <el-table-column
                  label="序号"
                  type="index"
                  align="center">
                </el-table-column>

                <el-table-column prop="ruleName" label="规则名称" min-width="120">
                </el-table-column>

                <el-table-column prop="ruleCode" label="规则编号" min-width="100">
                </el-table-column>

                <el-table-column prop="ruleSource" label="规则来源" min-width="100">
                </el-table-column>

                <el-table-column prop="ruleWeight" label="规则权重" min-width="60">
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>

        </el-table>
      </template>
      <template v-else>
        <el-table :data="gradeList" key="grade">
          <el-table-column label="序号" type="index" align="center">
          </el-table-column>
          <el-table-column prop="rulesetName" label="规则集名称" min-width="100">
          </el-table-column>
          <el-table-column prop="rulesetCategoryText" label="规则集类型" width="220">
          </el-table-column>
          <el-table-column prop="ruleName" label="规则名称" width="122">
          </el-table-column>
          <el-table-column prop="ruleCode" label="规则编号" width="122" >
          </el-table-column>
          <el-table-column prop="ruleSource" label="数据来源" width="122">
          </el-table-column>
          <el-table-column prop="ruleWeight" label="权重" width="122" >
          </el-table-column>
          <el-table-column prop="ruleGrade" label="千分值" width="122" >
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-dialog title="添加规则集" :visible.sync="reluesetShow" width="650px">
      <el-form :model="listQuery"  :inline="true" ref="rulesetForm">
        <el-form-item label="分类:" prop="strategyCode" class="form-input-item">
          <el-select v-model="listQuery.categoryCode" class="input-width">
            <el-option
              v-for="(item, index) in categoryListData"
              :key="index"
              :label="item.categoryName"
              :value="item.categoryCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="规则集名称："
          prop="rulesetName">
          <el-input v-model="listQuery.rulesetName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  @click="getList" size="small" type="primary"><i class="iconfont icon-search"></i>查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="list" highlight-current-row @selection-change="handleSelectionChange">

        <el-table-column prop="rulesetName" label="规则集名称" min-width="100">
        </el-table-column>

        <el-table-column prop="rulesetCode" label="规则集编号" min-width="100">
        </el-table-column>

        <el-table-column prop="rulesetCategory" label="规则集类型" width="90">
        </el-table-column>

        <el-table-column type="selection" label="操作" width="40">
        </el-table-column>

      </el-table>
      <div  class="pagination-container" ref="pagination-container" id="pagination-container">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPage" :current-page.sync="listQuery.page"
                       :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total='total' layout="sizes, prev, pager, next, jumper, slot">
                        <span style="float: right;color: #606266;font-weight: normal">共{{total}}条，已选{{rulesetCodes.length}}条</span>
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reluesetShow = false">取 消</el-button>
        <el-button @click="addRuleset" type="primary">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { GetCategoryList } from '@/api/common'
	import ModelDetail from '@/api/modelManage/modelDetail'
  import { handleSizeChange, handleCurrentPage } from '@/utils/common'

  export default {
    name: 'ModelDetail',
    data () {
      	return {
      		id:{
      			modelCode:'',//规则集code
      			modelVersion:''//规则集版本号
      		},
          tabStatus: 'ruleset', // rules、grade
      		modelDetailData: null,//模型详情数据
          rulesetList: [],//
          gradeList: [],
          categoryListData: [
            {
              categoryName: '全部类型',
              categoryCode: ''
            }
          ],
          reluesetShow: false,
          listQuery: {
            categoryCode: '',
            rulesetName: '',
            modelCode: '',
            modelVersion: '',
            limit: 10,
            page: 1
          },
          list: [],
          total: 0,
          rulesetCodes: [],
          handleSizeChange: handleSizeChange.bind(this),
          handleCurrentPage: handleCurrentPage.bind(this),
      	}
    },
    watch:{
	  	'$route' (to, from) {
	      if (to.name === '模型详情') {
	        const {modelCode, modelVersion} = to.params;
//	        if (this.id.modelCode !== modelCode || this.id.modelVersion !== modelVersion) {
//	          
//	        }//编辑模型刷新模型详情
	        this.id.modelCode = modelCode;
	      	this.id.modelVersion = modelVersion;
        	this.init();
	      }
	   	}
	  },
    computed: {
      ...mapGetters([
        'roleHasPermissions',
        'tableMaxHeight'
      ]),
    },
    created () {
      	this.id.modelCode = this.$route.params.modelCode
      	this.id.modelVersion = this.$route.params.modelVersion
      	if (this.id.modelCode) {
        	this.init()
      	}
    },
    mounted () {
      this.getCategoryList();
    },
    methods: {
      init () {
        this.getModelDetailData();
      },
      getList () {
        ModelDetail.GetRulesetList(this.listQuery).then(res => {
          const {data} = res;
          if (data.code === '200') {
            this.total = data.data.total;
            this.list = data.data.list;
          }
        })
      },
      getCategoryList () {
        GetCategoryList().then(res => {
          const { data } = res
          if (data.code === '200') {
            this.categoryListData = this.categoryListData.concat(data.data)
          }
        });
      },
      getModelDetailData (){
        this.modelDetailData = {
          modelName: '--',
          modelCode: '--',
          modelVersion: '--',
          modelStatus: '--',
          modelDescription: '--'
        };
        ModelDetail.modelDetail(this.id).then(res => {
          if (res.data.code === '200') {
            const data = res.data.data;
            this.modelDetailData = data;
            this.rulesetList = data.rulesetList;
            this.gradeList = data.gradeList;
          }
        })
      },
      changeTabStatus (status) {
        if (this.tabStatus !== status) {
          this.tabStatus = status;
        }
      },
      doAddReset () {
        this.reluesetShow = true;
        this.listQuery = {
          categoryCode: '',
          rulesetName: '',
          limit: 10,
          page: 1,
          modelCode: this.modelDetailData.modelCode,
          modelVersion: this.modelDetailData.modelVersion
        };
        this.getList();
      },
      addRuleset () {
        if (this.rulesetCodes.length > 0) {
          const {modelCode , modelVersion } = this.modelDetailData;
          const rulesetCodes = this.rulesetCodes.join(',');
          ModelDetail.AddRuleset({modelCode, modelVersion, rulesetCodes}).then(res => {
            if (res.data.code === '200') {
              this.reluesetShow = false;
              this.rulesetCodes = [];
              this.$notify.success(res.data.message);
              this.getModelDetailData();
            }
          });
        } else {
          this.$notify.error('至少选一个规则');
        }
      },
      enableDisableRuleset (rulesetStatus, rulesetCode){ // 列表的启用禁用
        const {modelCode, modelVersion} = this.modelDetailData;
        ModelDetail.EnableDisableRuleset({modelCode,  modelVersion, rulesetStatus, rulesetCode}).then(res => {
	    			if (res.data.code === '200') {
	            this.$notify.success(res.data.message)
	          }
	    		})
      },
      rulesetVersionChange (rulesetVersion, rulesetCode) {
        const {modelCode, modelVersion} = this.modelDetailData;
        ModelDetail.EditRulesetVersion({modelCode, modelVersion, rulesetVersion, rulesetCode}).then(res => {
          if (res.data.code === '200') {
            this.$notify.success(res.data.message)
          }
        })
      },
      handleSelectionChange (rows) {
        this.rulesetCodes = [];
        if (rows) {
          rows.forEach(row => {
            this.rulesetCodes.push(row.rulesetCode);
          });
        }
      },
      editModel () {
        this.$router.push({ path: '/modelManage/modelEdit/'+this.id.modelCode+'/'+this.id.modelVersion});
      },
      deletModel () {
        this.$confirm(`<p style="font-size: 14px;padding: 10px;text-align: center">删除模型后将不能恢复，确认删除?</p>`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true
        }).then(() => {
          ModelDetail.DeteleModelDetail(this.id).then(res => {
            if (res.data.code === '200') {
              this.$store.dispatch('DelVisitedViews', {path: this.$route.path}).then(() => {
                this.$router.push({ path: '/modelManage/modelList'});
              })
            } else {
              this.$notify.error(res.data.message)
            }
          })
        }).catch(() => {
        })
      },
      deleteRuleset (rulesetCode) {
        this.$confirm(`<p style="font-size: 14px;padding: 10px;text-align: center">删除后将不能恢复，确认删除?</p>`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true
        }).then(() => {
          const {modelCode, modelVersion} = this.modelDetailData;
          ModelDetail.DeleteRuleset({modelCode, modelVersion, rulesetCode}).then(res => {
            if (res.data.code === '200') {
              this.getModelDetailData();
              this.$notify.success(res.data.message)
            }
          })
        }).catch(() => {
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "modelDetail.scss";
  .input-width{
    width: 140px;
  }
</style>
