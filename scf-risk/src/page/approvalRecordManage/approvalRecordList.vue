<template>
  <div class="page-container" ref="page-container" id="page-container"><!---审核记录列表--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <el-form-item label="查询时间">
          <el-date-picker
            v-model="listQuery.createTime"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 240px;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="审批信息">
          <el-input v-model="listQuery.strategyQuery" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="策略名称">
          <el-select v-model="listQuery.strategyCode">
            <el-option
              v-for="(item, index) in strategyListData"
              :key="index"
              :label="item.strategyName"
              :value="item.strategyCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="策略建议">
          <el-select v-model="listQuery.suggestion" style="width: 100px;">
            <el-option
              v-for="(item, index) in suggestionListData"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最终决策">
          <el-select v-model="listQuery.decision" style="width: 100px;">
            <el-option
              v-for="(item, index) in decisionListData"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" >
          <el-select v-model="listQuery.status" style="width: 100px;">
            <el-option
              v-for="(item, index) in statusListData"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button  @click="getList" size="small" type="primary"><i class="iconfont icon-search"></i>查询</el-button>
          <el-button  @click="handleResetQueryData" size="small" type="primary"><i class="iconfont icon-reset"></i>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list" @current-change="handleSelectionChange" highlight-current-row :max-height=tableMaxHeight>

      <el-table-column prop="createTime" label="查询时间" width="100">
      </el-table-column>

      <el-table-column prop="reportNo" label="报告编号" min-width="100">
      </el-table-column>

      <el-table-column prop="strategyQuery" label="审批信息" min-width="100">
      </el-table-column>

      <el-table-column prop="strategyName" label="策略名称" width="140">
      </el-table-column>

      <el-table-column label="策略建议" width="100">
        <template slot-scope="scope">
          <span :class="scope.row.suggestionCode | filterStatus">{{scope.row.suggestionText}}</span>
        </template>
      </el-table-column>

      <el-table-column label="最终决策" width="100">
        <template slot-scope="scope">
          <span :class="scope.row.decisionCode | filterStatus">{{scope.row.decisionText}}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="90">
        <template slot-scope="scope">
          <span :class="scope.row.statusCode | filterStatus">{{scope.row.statusText}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="financeNo" label="操作" width="60">
        <template slot-scope="scope">
          <router-link :to="'approvalRecordDetail/' + scope.row.reportNo"  class="router-link">详情</router-link>
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
  import { copyOriginQueryData, handleSelectionChange, handleSizeChange, handleCurrentPage, handleResetQueryData } from '@/utils/common'
  import { Format } from '@/utils/index'
  import { GetStrategyList } from '@/api/common'
  import { GetQueryList } from '@/api/approvalrecordManage/index'

  export default {
    name: 'ApprovalRecordList',
    filters: {
      filterStatus: function (v) {
        if (v === 'PASS' || v === 'SUCCESS') {
          return 'suc'
        } else if (v === 'REJECT') {
          return 'fail'
        }
      }
    },
    data () {
      return {
        list: [],
        total: 0,
        listQuery: {
          createTime: ['', ''],
          strategyQuery: '',
          strategyCode: '',
          suggestion: '',
          decision: '',
          status: '',
          page: 1,
          limit: 30
        },
        originListQuery: null,
        strategyListData: [
          {
            strategyName: '全部',
            strategyCode: ''
          }
        ],
        suggestionListData: [
          {
            label: '全部',
            value: ''
          },
          {
            label: '建议通过',
            value: 'PASS'
          },
          {
            label: '建议复议',
            value: 'REVIEW'
          },
          {
            label: '建议拒绝',
            value: 'REJECT'
          }
        ],
        decisionListData: [
          {
            label: '全部',
            value: ''
          },
          {
            label: '通过',
            value: 'PASS'
          },
          {
            label: '未做决策',
            value: 'NONE'
          },
          {
            label: '拒绝',
            value: 'REJECT'
          }
        ],
        statusListData: [
          {
            label: '全部',
            value: ''
          },
          {
            label: '已生成',
            value: 'DONE'
          },
          {
            label: '未生成',
            value: 'DOING'
          }
        ],
        selectedData: '', // 选中某一行的数据
        copyOriginQueryData: copyOriginQueryData.bind(this),
        handleResetQueryData: handleResetQueryData.bind(this),
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
    created () {
      this.copyOriginQueryData()
      this.getStrategyList()
      this.getList()
    },
    mounted () {
      setTimeout(() => {
        this.$store.dispatch('SetTableMaxHeight')
      }, 500)
    },
    methods: {
      getStrategyList () {
        GetStrategyList().then(res => {
          const { data } = res
          if (data.code === '200') {
            this.strategyListData = this.strategyListData.concat(data.data)
          }
        })
      },
      getList () {
        const createTimeBegin = this.listQuery.createTime[0] ? Format(this.listQuery.createTime[0], 'yyyy-MM-dd') : ''
        const createTimeTo = this.listQuery.createTime[1] ? Format(this.listQuery.createTime[1], 'yyyy-MM-dd') : ''
        const queryData = Object.assign({createTimeBegin, createTimeTo}, this.listQuery)
        GetQueryList(queryData).then(res => {
          const {data} = res
          if (data.code === '200') {
            this.total = data.data.total
            this.list = data.data.list
          }
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .query-select{
    width: 200px;
  }
  .total-container{
    >span{
      margin-right: 10px;
      padding-right: 10px;
      border-right: 1px solid #ccc;
    }
  }
</style>

