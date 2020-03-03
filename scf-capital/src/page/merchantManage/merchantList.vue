<template>
  <div class="page-container" ref="page-container" id="page-container"><!---供应商管理-供应商入驻--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <el-form-item label="企业名称" prop="enterpriseName">
          <el-input v-model="listQuery.enterpriseName" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人姓名" prop="businessLicenseNo">
          <el-input v-model="listQuery.businessLicenseNo" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人身份证号" prop="mobile">
          <el-input v-model="listQuery.mobile" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="注册时间" prop="shipDate">
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
        <!--<el-form-item label="状态" class="query-select" prop="status">
          <el-select v-model="listQuery.status" style="width:150px;">
            <el-option label="全部" value="">
            </el-option>
            <el-option label="合作中" value='BASIC_INIT'>
            </el-option>
            <el-option label="已冻结" value='BASIC_APPROVING'>
            </el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item>
          <el-button  @click="search"  size="small" type="primary" icon="el-icon-search">查询</el-button>
          <el-button  @click="resetForm('listQueryForm')" size="small" type="primary" icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list"  @current-change="handleSelectionChange" highlight-current-row  :max-height=tableMaxHeight>
      <el-table-column
        label="#"
        type="index"
        align="center">
      </el-table-column>

      <el-table-column
        prop="qyxinxi"
        label="企业信息"
        min-width="250">
        <template slot-scope="scope" >
          <div>{{scope.row.enterpriseName}}</div>
          <div>{{scope.row.businessLicenseNo}}</div>
        </template>
      </el-table-column>

      <el-table-column
        prop="registrantName"
        label="法人信息"
        min-width="200">
        <template slot-scope="scope" >
          <div>{{scope.row.repreName}}</div>
          <div>{{scope.row.idcardNo}}</div>
        </template>
      </el-table-column>

      <el-table-column
        prop="createTime"
        label="注册时间"
        min-width="190">
      </el-table-column>

      <el-table-column
        prop="totalCreditLine"
        label="授信额度"
        min-width="140">
      </el-table-column>

      <!--<el-table-column
        prop="statusText"
        label="状态"
        width="100">
        <template slot-scope="scope" >
          <span :class="scope.row.status==='suc'?'suc':'fail'">{{scope.row.statusText}}</span>
        </template>
      </el-table-column>-->

      <el-table-column
        label="操作"
        width="122"
        align="center">
        <template slot-scope="scope" v-if="!roleHasPermissions['supplier_manage_register_list_view']">
          <router-link :to="'merchantDetail/' + scope.row.supplierId" class="router-link">详情</router-link>
        </template>
      </el-table-column>

    </el-table>
    <div  class="pagination-container" ref="pagination-container" id="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPage" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total='total' layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
      <!--total-->
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { handleSelectionChange, handleSizeChange, handleCurrentPage } from '@/utils/common'
  import { getListData } from '@/api/merchantManage/merchantAudit'
  import { Format } from '@/utils/index'

  export default {
    name: 'MerchantList',
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

