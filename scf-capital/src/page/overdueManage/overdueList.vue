<template>
  <div class="page-container" ref="page-container" id="page-container"><!---融资审核管理--->
    <div class="filter-container" ref="filter-container"  id="filter-container">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <el-form-item label="企业名称" prop="supplierName" >
          <el-input v-model="listQuery.supplierName" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="还款日期:"  prop="shipDate">
          <el-date-picker
            v-model="shipDate"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions1">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="逾期天数" class="query-select" prop="status">
          <el-select v-model="listQuery.status" style="width:150px;">
            <el-option label="全部" value=""></el-option>
            <el-option label="0-7天 " value='TRANSFER_CONTRACT'></el-option>
            <el-option label="30天以内 " value='GUARANTEE_CONTRACT'></el-option>
            <el-option label="31-60天 " value='FINANCE_AUDIT_ING'></el-option>
            <el-option label="61-90天 " value='FINANCE_AUDIT_REFUSE'></el-option>
            <el-option label="91-180天 " value='CAPTICAL_CONTRACT'></el-option>
            <el-option label="181天以上 " value='WAIT_LOAN'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button  @click="search" size="small" type="primary"><i class="iconfont icon-search"></i>查询</el-button>
          <el-button  @click="resetForm('listQueryForm')" size="small" type="primary"><i class="iconfont icon-reset"></i>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list" @current-change="handleSelectionChange" highlight-current-row :max-height=tableMaxHeight>

      <el-table-column prop="supplierId" label="融资单号" min-width="100">
      </el-table-column>

      <el-table-column prop="supplierName" label="企业信息" min-width="260">
        <template slot-scope="scope">
          <div>{{scope.row.qyxinxi}}</div>
          <div>{{scope.row.qyxinxiNo}}</div>
        </template>
      </el-table-column>

      <el-table-column prop="edu" label="融资金额" width="142" align="center">
      </el-table-column>

      <el-table-column prop="applyTime" label="还款日期" width="152" align="center">
      </el-table-column>

      <el-table-column prop="time" label="逾期天数" width="122" align="center">
      </el-table-column>

      <el-table-column prop="interest" label="逾期罚息" width="122" align="center">
      </el-table-column>

      <el-table-column prop="financeNo" label="操作" width="122" align="center">
        <template slot-scope="scope" v-if="roleHasPermissions['finance_manage_register_list_view']">
          <router-link :to="'overdueDetail/' + scope.row.financeNo"  class="router-link">详情</router-link>
        </template>
      </el-table-column>

    </el-table>
    <div  class="pagination-container" ref="pagination-container" id="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPage" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total='10' layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
      <!--total-->
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { handleSelectionChange, handleSizeChange, handleCurrentPage } from '@/utils/common'
  import { getListData } from '@/api/financeManage/financeAudit'

  export default {
    name: 'overdueList',
    data () {
      return {
        list: [], // 表格数据
        total: 0, // 表格数据总条数
        listQuery: { // 查询参数
          page: 1,
          limit: 30,
          financeNo: '', // 融资单号
          supplierName: '', // 供应商名称
          status: '', // 状态：INVALID-未形成 AUDIT_WAIT-待审核 AUDIT_REFUSE-不达标 AUDIT_PASS-已达标 OVERDUE-过期
          /*applyDate:'', // 到货日期*/
        },
        shipDate:new Date().getTime(),
        yesterday: new Date().getTime() - 24 * 60 * 60 * 1000,
        selectedData: '', // 选中某一行的数据
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now() - 24 * 60 * 60 * 1000
          }
        },
        handleSelectionChange: handleSelectionChange.bind(this),
        handleSizeChange: handleSizeChange.bind(this),
        handleCurrentPage: handleCurrentPage.bind(this),
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      }
    },
    watch:{
      //监听路由切换回调
      '$route':'fetchdata',
      shipDate(val,oldVal){
        let that = this;
        let _Time = Format(val, 'yyyy-MM-dd');
        that.listQuery.applyDate = _Time;
      }
    },
    computed: {
      ...mapGetters([
        'roleHasPermissions', // 用户权限list
        'tableMaxHeight'
      ])
    },
    created () {
//    this.getList()
    },
    mounted () {
      setTimeout(() => {
        this.$store.dispatch('SetTableMaxHeight')
      }, 500)
    },
    methods: {
      fetchdata(){
        //切换路由do
      },
      getList () {
        getListData(this.listQuery).then(res => {
          if (res.data.code === '200') {
            const listData = res.data.data.list
            this.total = res.data.data.total
            this.list = [{
									supplierId:"20189604541216",
            			financeNo: "11180712173701927564",
            			mobile: "17605600505",
            			qyxinxi: "寿任市夫峰农朝科技有限公司",
            			qyxinxiNo: "91370783MA3CPK4N86",
            			frxinxi: "张京峰",
            			frxinxiNo: "370783200142166123",
            			applyTime: "2018-7-31",
            			pingfen: "80，建议通过",
            			status: "suc",
            			statusText: "待审核",
            			edu:'730000',
            			no:'20189604541216',
            			time:'7',
            			style:'到期还本付息',
            			interest:'113.61'
            		},{
									supplierId:"20184960362533",
            			financeNo: "11180712173701927564",
            			mobile: "13901673723",
            			qyxinxi: "延寿县合众农朝专朝合作社",
            			qyxinxiNo: "932302293332439676",
            			frxinxi: "李凤玉",
            			frxinxiNo: "866490795256351452",
            			applyTime: "2018-8-8",
            			pingfen: "72，建议复议",
            			status: "waring",
            			statusText: "待放款",
            			edu:'660000',
            			no:'20184960362533',
            			time:'4',
            			style:'到期还本付息',
            			interest:'113.61'
            		},{
									supplierId:"20189332136015",
            			financeNo: "11180712173701927564",
            			mobile: "13901758693",
            			qyxinxi: "南宁农朝投服宗团有限公司",
            			qyxinxiNo: "93230129MA18YR7692",
            			frxinxi: "宋志忠",
            			frxinxiNo: "520918310074967768",
            			applyTime: "2018-7-24",
            			pingfen: "56，建议拒绝",
            			status: "fail",
            			statusText: "已拒绝",
            			edu:'850000',
            			no:'20189332136015',
            			time:'5',
            			style:'到期还本付息',
            			interest:'113.61'
            		},{
									supplierId:"20182043486939",
            			financeNo: "11180712173701927564",
            			mobile: "13901657057",
            			qyxinxi: "广西理穗农朝宗团有限公司",
            			qyxinxiNo: "91450100MA5L9YPB6W",
            			frxinxi: "胡志崇",
            			frxinxiNo: "983218335771122358",
            			applyTime: "2018-7-12",
            			pingfen: "98，建议通过",
            			status: "suc",
            			statusText: "融资成功",
            			edu:'170000',
            			no:'20182043486939',
            			time:'5',
            			style:'到期还本付息',
            			interest:'113.61'
            		},{
									supplierId:"20186054565133",
            			financeNo: "11180712173701927564",
            			mobile: "13820020619",
            			qyxinxi: "天津农垦渤海农朝有限公司",
            			qyxinxiNo: "91450123708664638C",
            			frxinxi: "卢义贞",
            			frxinxiNo: "852855972755036963",
            			applyTime: "2018-7-23",
            			pingfen: "74，建议复议",
            			status: "waring",
            			statusText: "待审核",
            			edu:'410000',
            			no:'20186054565133',
            			time:'3',
            			style:'到期还本付息',
            			interest:'113.61'
            		},{
									supplierId:"20187514924808",
            			financeNo: "11180712173701927564",
            			mobile: "13901637867",
            			qyxinxi: "问东爱科农朝宗团有限公司",
            			qyxinxiNo: "12230381414441391J",
            			frxinxi: "苏子龙",
            			frxinxiNo: "341371483638515606",
            			applyTime: "2018-7-10",
            			pingfen: "83，建议通过",
            			status: "suc",
            			statusText: "待放款",
            			edu:'380000',
            			no:'20187514924808',
            			time:'1',
            			style:'到期还本付息',
            			interest:'113.61'
            		},{
									supplierId:"20182636285549",
            			financeNo: "11180712173701927564",
            			mobile: "13901637525",
            			qyxinxi: "崇左龙福生态农朝有限公司",
            			qyxinxiNo: "91120224058708642R",
            			frxinxi: "徐宝梁",
            			frxinxiNo: "471154309697246811",
            			applyTime: "2018-7-11",
            			pingfen: "97，建议通过",
            			status: "suc",
            			statusText: "融资成功",
            			edu:'920000',
            			no:'20182636285549',
            			time:'2',
            			style:'到期还本付息',
            			interest:'113.61'
            		},{
									supplierId:"20183176917239",
            			financeNo: "11180712173701927564",
            			mobile: "18008080893",
            			qyxinxi: "厦斯绿莱有限公司",
            			qyxinxiNo: "91131127MA0CEQBR63",
            			frxinxi: "孙万育",
            			frxinxiNo: "823509414012637836",
            			applyTime: "2018-7-5",
            			pingfen: "90，建议通过",
            			status: "suc",
            			statusText: "待审核",
            			edu:'780000',
            			no:'20183176917239',
            			time:'3',
            			style:'到期还本付息',
            			interest:'113.61'
            		},{
									supplierId:"20185229062706",
            			financeNo: "11180712173701927564",
            			mobile: "15520180524",
            			qyxinxi: "广东华农农朝股份有限公司",
            			qyxinxiNo: "9146010032419362X7",
            			frxinxi: "刘春林",
            			frxinxiNo: "440123456789012345",
            			applyTime: "2018-7-19",
            			pingfen: "84，建议通过",
            			status: "suc",
            			statusText: "待放款",
            			edu:'330000',
            			no:'20185229062706',
            			time:'3',
            			style:'到期还本付息',
            			interest:'113.61'
            		},{
									supplierId:"20181454492167",
            			financeNo: "11180712173701927564",
            			mobile: "15195869088",
            			qyxinxi: "深圳天天好果贸易有限公司",
            			qyxinxiNo: "91370700MA3CEBCP05",
            			frxinxi: "樊雨欣",
            			frxinxiNo: "782832326518916650",
            			applyTime: "2018-8-31",
            			pingfen: "88，建议通过",
            			status: "suc",
            			statusText: "融资成功",
            			edu:'650000',
            			no:'20181454492167',
            			time:'2',
            			style:'到期还本付息',
            			interest:'113.61'
            		}]
            
            
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
    }
  }
</style>
