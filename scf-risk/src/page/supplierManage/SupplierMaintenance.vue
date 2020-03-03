<template>
  <div class="page-container" ref="page-container" id="page-container"><!---供应商管理-供应商入驻--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" :model="listQuery">
        <el-form-item label="企业名称">
          <el-input v-model="listQuery.enterpriseName" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="信用代码">
          <el-input v-model="listQuery.code" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="listQuery.name" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="listQuery.phone" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="入驻时间">
          <el-date-picker
            v-model="listQuery.timeScope"
            style="width:280px;"
            align="right"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态" class="query-select">
          <el-select v-model="listQuery.status" style="width:80px;">
            <el-option label="全部" value="">
            </el-option>
            <el-option label="是" :value=true>
            </el-option>
            <el-option label="否" :value=false>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地区" class="query-select">
          <el-select v-model="listQuery.zone" style="width:100px;">
            <el-option label="全部" value=""></el-option>
            <el-option label="北京" value='beijing'></el-option>
            <el-option label="上海" value='shanghai'></el-option>
            <el-option label="广州" value='guangzhou'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button  size="small" type="primary" icon="el-icon-search">查询</el-button>
          <el-button  size="small" type="primary" icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--<div class="total-container" ref="total-container" id="total-container">
      <span>提交基础资料中：1</span> <span>审核入驻：21</span><span>审核贸易：2</span><span>预沟通：0</span><span>尽调中：9</span><span>尽调中：9</span><span>签署中：9</span>
    </div>-->
    <el-table :data="list" v-loading="listLoading"  @current-change="handleSelectionChange" highlight-current-row  :max-height=tableMaxHeight>
      <el-table-column
        label="#"
        type="index"
        align="center">
      </el-table-column>

      <el-table-column
        prop="enterpriseName"
        label="企业信息"
        min-width="200">
      </el-table-column>

      <el-table-column
        prop="connectName"
        label="联系人"
        width="200">
      </el-table-column>

      <el-table-column
        prop="zone"
        label="地区"
        min-width="190">
      </el-table-column>

      <el-table-column
        prop="enterDate"
        label="入驻时间"
        width="190">
      </el-table-column>

      <el-table-column
        prop="status"
        label="状态"
        width="150">
      </el-table-column>

      <el-table-column
        label="操作"
        width="122"
        align="center">
        <template slot-scope="scope" >
          <el-button  size="mini" type="primary">
            <router-link to="supplierDetail/13">详情</router-link>
          </el-button>
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
  export default {
    name: 'SupplierMaintenance',
    data () {
      return {
        list: [{
          enterpriseName: 'test1',
          connectName: '联系人1',
          zone: '深圳',
          status: '提交基础资料中',
          enterDate: '2018-05-21 12:12:00'
        },
        {
          enterpriseName: 'test2',
          connectName: '联系人2',
          zone: '上海',
          status: '提交基础资料中',
          enterDate: '2018-05-21 12:12:00'
        },
        {
          enterpriseName: 'test2',
          connectName: '联系人2',
          zone: '上海',
          status: '提交基础资料中',
          enterDate: '2018-05-21 12:12:00'
        },
        {
          enterpriseName: 'test2',
          connectName: '联系人2',
          zone: '上海',
          status: '提交基础资料中',
          enterDate: '2018-05-21 12:12:00'
        }
        ], // 表格数据
        total: 0, // 表格数据总条数
        listLoading: false,
        listQuery: { // 查询参数
          page: 1,
          limit: 30,
          enterpriseName: '', // 企业名
          code: '', // 信用代码
          name: '', // 平台id
          phone: '', // 彩种
          zone: '', // 地区
          status: '', // 状态
          timeScope: [new Date().getTime() - 24 * 60 * 60 * 1000, new Date().getTime() - 24 * 60 * 60 * 1000] // 时间范围
        },
        yesterday: new Date().getTime() - 24 * 60 * 60 * 1000,
        selectedData: '', // 选中某一行的数据
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now() - 24 * 60 * 60 * 1000
          }
        },
        handleSelectionChange: handleSelectionChange.bind(this),
        handleSizeChange: handleSizeChange.bind(this),
        handleCurrentPage: handleCurrentPage.bind(this)
      }
    },
    computed: {
      ...mapGetters([
        'roleHasPermissions', // 用户权限list
        'platformId',
        'tableMaxHeight'
      ])
    },
    created () {
    },
    mounted () {
      setTimeout(() => {
        this.$store.dispatch('SetTableMaxHeight')
      }, 500)
    },
    methods: {
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .total-container{
    >span{
      margin-right: 10px;
      padding-right: 10px;
      border-right: 1px solid #ccc;
    }
  }
</style>
