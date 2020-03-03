<template>
  <div class="page-container" ref="page-container" id="page-container"><!---供应商管理-供应商入驻--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <el-form-item label="企业名称" prop="enterpriseName">
          <el-input v-model="listQuery.enterpriseName" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="信用代码" prop="businessLicenseNo">
          <el-input v-model="listQuery.businessLicenseNo" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="申请人手机号" prop="mobile">
          <el-input v-model="listQuery.mobile" style="width:130px;"></el-input>
        </el-form-item>
        <!--<el-form-item label="地区" class="query-select">
          <el-select v-model="listQuery.zone" style="width:100px;">
            <el-option label="全部" value=""></el-option>
            <el-option label="北京" value='beijing'></el-option>
            <el-option label="上海" value='shanghai'></el-option>
            <el-option label="广州" value='guangzhou'></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="入驻时间" prop="shipDate">
          <el-date-picker
            v-model="shipDate"
            style="width:280px;"
            align="right"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="阶段" class="query-select" prop="status">
          <el-select v-model="listQuery.status" style="width:150px;">
            <el-option label="全部" value="">
            </el-option>
            <el-option label="基础资料-填写中" value='BASIC_INIT'>
            </el-option>
            <el-option label="基础资料-待初审" value='BASIC_APPROVING'>
            </el-option>
            <el-option label="基础资料-待复审" value='BASIC_REAPPROVING'>
            </el-option>
            <el-option label="基础资料-已打回" value='BASIC_AMENDING'>
            </el-option>
            <el-option label="贸易资料-填写中" value='TRADE_INIT'>
            </el-option>
            <el-option label="贸易资料-待初审" value='TRADE_APPROVING'>
            </el-option>
            <el-option label="贸易资料-待复审" value='TRADE_REAPPROVING'>
            </el-option>
            <el-option label="贸易资料-已打回" value='TRADE_AMENDING'>
            </el-option>
            <el-option label="预沟通-待补充" value='KNOW_AMENDING'>
            </el-option>
            <el-option label="预沟通-待审核" value='KNOW_APPROVING'>
            </el-option>
            <el-option label="尽调中-待补充" value='VERIFY_AMENDING'>
            </el-option>
            <el-option label="尽调中-待审核" value='VERIFY_APPROVING'>
            </el-option>
            <el-option label="签署中-待补充" value='SIGN_AMENDING'>
            </el-option>
            <el-option label="签署中-待审核" value='SIGN_APPROVING'>
            </el-option>
            <el-option label="入驻成功" value='PASS'>
            </el-option>
            <el-option label="入驻失败" value='REJECT'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button  @click="search"  size="small" type="primary" icon="el-icon-search">查询</el-button>
          <el-button  @click="resetForm('listQueryForm')" size="small" type="primary" icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--<div class="total-container" ref="total-container" id="total-container">
      <span>提交基础资料中：1</span> <span>审核入驻：21</span><span>审核贸易：2</span><span>预沟通：0</span><span>尽调中：9</span><span>尽调中：9</span><span>签署中：9</span>
    </div>-->
    <el-table :data="list"  @current-change="handleSelectionChange" highlight-current-row  :max-height=tableMaxHeight>
      <el-table-column
        label="#"
        type="index"
        align="center">
      </el-table-column>

      <el-table-column
        prop="enterpriseName"
        label="企业信息"
        min-width="250">
        <template slot-scope="scope" >
          <div>{{scope.row.enterpriseName}}</div>
          <div>{{scope.row.businessLicenseNo}}</div>
        </template>
      </el-table-column>

      <el-table-column
        prop="registrantName"
        label="申请人手机号"
        min-width="200">
        <template slot-scope="scope" >
          <div>{{scope.row.registrantName}}</div>
          <div>{{scope.row.registrantMobile}}</div>
        </template>
      </el-table-column>

      <el-table-column
        prop="createTime"
        label="注册时间"
        width="190">
      </el-table-column>

      <el-table-column
        prop="registerStageText"
        label="阶段"
        width="100">
      </el-table-column>

      <el-table-column
        prop="registerStatusText"
        label="状态"
        width="100">
        <template slot-scope="scope" >
          <span :class="scope.row.registerStatus | filterStatus">{{scope.row.registerStatusText}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="122"
        align="center">
        <template slot-scope="scope" v-if="roleHasPermissions['supplier_manage_register_list_view']">
            <router-link :to="'supplierDetail/' + scope.row.supplierId" class="router-link">查看</router-link>
        </template>
      </el-table-column>

    </el-table>
    <div  class="pagination-container" ref="pagination-container" id="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPage" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total='total' layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { handleSelectionChange, handleSizeChange, handleCurrentPage } from '@/utils/common'
  import { getListData } from '@/api/supplierManage/supplierRegister'
  import { Format } from '@/utils/index'

  export default {
    name: 'SupplierRegister',
    filters: {
      filterStatus: function (value) {
        if (value === 'PASS') {
          return 'suc'
        } else if (value === 'REJECT') {
          return 'fail'
        }
      }
    },
    data () {
      return {
        list: [], // 表格数据
        total: 0, // 表格数据总条数
        listQuery: { // 查询参数
          page: 1,
          limit: 30,
          enterpriseName: '', // 企业名
          businessLicenseNo: '', // 信用代码
          mobile: '', // 手机号码
          beginCreateTime: '', // 最早得入驻时间
          endCreateTime: '', // 最晚得入驻时间
          status: '', // 状态
        },
        shipDate:[],// 时间范围
        yesterday: new Date().getTime() - 24 * 60 * 60 * 1000,
        selectedData: '', // 选中某一行的数据
        handleSelectionChange: handleSelectionChange.bind(this),
        handleSizeChange: handleSizeChange.bind(this),
        handleCurrentPage: handleCurrentPage.bind(this)
      }
    },
    computed: {
      ...mapGetters([
        'roleHasPermissions', // 用户权限list
        'tableMaxHeight'
      ])
    },
    watch :{
    	shipDate(val,oldVal){
    		let that = this;
    		if(val[0]){
    			that.listQuery.beginCreateTime = Format(val[0], 'yyyy-MM-dd');
    		}else{
    			that.listQuery.beginCreateTime = '';
    		}
	  		if(val[1]){
	  			that.listQuery.endCreateTime = Format(val[1], 'yyyy-MM-dd');
	  		}else{
    			that.listQuery.endCreateTime = '';
	  		}
	  	}  
    },
    created () {
    },
    mounted () {
      this.getList()
      setTimeout(() => {
        this.$store.dispatch('SetTableMaxHeight')
      }, 500)
    },
    methods: {
      getList () {
        getListData(this.listQuery).then(res => {
          if (res.data.code === '200') {
            const listData = res.data.data.list
            this.total = res.data.data.total
            this.list = listData
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      search(){
      	let that = this;
      	that.getList();
      },//查询
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.shipDate = [];
      },//重置表单
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .total-container{
    >span{
      margin-right: 10px;
      padding-right: 10px;
      border-right: 1px solid #ccc;
      &:last-of-type{
        border-right: none;
      }
    }
  }
  .router-link{
    display: block;
    color:#409EFF;
  }
</style>

