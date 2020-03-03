<template>
	<div class="page-container" ref="page-container" id="page-container" style="padding-top: 30px;">
    <el-row class="border-line gray-bg">
      <el-col :span="12"><div>查询结果：<span :class="propsData.suggestionCode | filterStatus">{{propsData.suggestionText}}</span></div></el-col>
      <el-col :span="12"><div class="text-right">最终决策：<span :class="propsData.decisionCode | filterStatus">{{propsData.decisionText}}</span></div></el-col>
    </el-row>
    <el-row type="flex">
      <el-col :span="12" class="padding-right" v-if="propsData.strategyQuery">
        <div class="border-line-inner">
          <p class="big-text">查询信息</p>
          <template v-for="(value, key) in propsData.strategyQuery">
          <p><span class="label">{{key}}：</span><span>{{value}}</span></p>
          </template>
        </div>
      </el-col>
      <el-col :span="12" class="padding-left" v-if="propsData.basicInfo">
        <div class="border-line-inner">
          <p class="big-text">基本信息</p>
          <p><span class="label">报告编号：</span><span>{{propsData.basicInfo.reportNo}}</span></p>
          <p><span class="label">查询时间：</span><span>{{propsData.basicInfo.createTime}}</span></p>
          <p><span class="label">生成时间：</span><span>{{propsData.basicInfo.endTime}}</span></p>
          <p><span class="label">策略名称：</span><span>{{propsData.basicInfo.strategyName}}</span></p>
          <p><span class="label">策略编号：</span><span>{{propsData.basicInfo.strategyCode}}</span></p>
        </div>
      </el-col>
    </el-row>
    <el-row class="border-line">
      <el-row>
        <el-col :span="24"><p class="big-text">策略详情</p></el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <template v-for="(item, index) in propsData.modelList">
          <el-col :span="5" class="border-line text-center gray-bg">
            <p>{{item.modelName}}</p>
            <p class="big-text">{{item.modelWeight}}分</p>
            <p :class="item.suggestionCode | filterStatus">{{item.suggestionText}}</p>
          </el-col>
          <el-col :span="1" class="text-center" v-if="index !== (propsData.modelList.length - 1)">
            <div>&gt;</div>
          </el-col>
        </template>
      </el-row>
    </el-row>
    <template v-for="(item, index) in propsData.modelList">
      <div class="content-title gray-bg big-text">{{item.modelName}}</div>
      <template v-for="(subItem, subIndex) in item.rulesetList">
        <el-row :class="subIndex === 0 ? 'border-line-no-top' : 'border-line'">
          <el-col :span="24"><p>根据{{subItem.rulesetName}}规则表</p></el-col>
          <el-col :span="24">
            <table border="0" cellpadding="0" cellspacing="0">
              <thead>
                <tr>
                  <th>命中规则名称</th>
                  <th>逻辑规则</th>
                  <th>规则变量值</th>
                  <th>权重</th>
              </tr>
              </thead>
              <tbody>
                <template v-for="(ssubItem, ssubIndex) in subItem.ruleList">
                  <template v-for="(sssItem, sssIndex) in ssubItem.ruleLogicList">
                    <tr>
                      <td :rowspan="ssubItem.ruleLogicList.length" v-if="sssIndex === 0">{{ssubItem.ruleName}}</td>
                      <td>{{sssItem.ruleLogicValue}}</td>
                      <td>{{sssItem.ruleLogicText}}</td>
                      <td :rowspan="ssubItem.ruleLogicList.length" v-if="sssIndex === 0">{{ssubItem.ruleWeight}}</td>
                    </tr>
                  </template>
                </template>
              </tbody>
            </table>
          </el-col>
        </el-row>
      </template>
    </template>
	</div>
</template>

<script>
import { GetDetailData } from '@/api/approvalrecordManage/index'

export default {
  name: 'OnlineApprovalSearchResult',
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
      id: '',
      propsData: {
        suggestionCode: '',
        suggestionText: '',
        decisionCode: '',
        decisionText: '',
        strategyQuery: null,
        basicInfo: null,
        modelList: []
      }
    }
  },
  watch: {
    '$route' (to, froms) {
      if (to.name === '审批记录详情' || to.name === '查询结果') {
        if (this.id !== to.params.id) {
          this.id = this.$route.params.id
          this.getPropsData()
        }
      }
    }
  },
  created () {
    this.id = this.$route.params.id
  },
  mounted () {
    if (this.id) {
      // have
      this.getPropsData()
    }
  },
  methods: {
    getPropsData () {
      const defaultData = {
        suggestionCode: '',
        suggestionText: '',
        decisionCode: '',
        decisionText: '',
        strategyQuery: null,
        basicInfo: null,
        modelList: []
      }
      this.propsData = Object.assign({}, defaultData)
      GetDetailData(this.id).then(res => {
        const { data } = res
        if (data.code === '200') {
          const currentData = data.data
          // currentData = {
          //   "suggestionCode": "PASS",
          //   "suggestionText": "建议通过",
          //   "decisionCode": "NONE",
          //   "decisionText": "未做决策",
          //   "strategyQuery": {
          //     "姓名": "王小二",
          //     "手机号": "1800000000"
          //   },
          //   "basicInfo": {
          //     "reportNo": "5BBEEFD7A1D9F45FBD04216A",
          //     "createTime": "2018-10-11 14:38:15",
          //     "endTime": "2018-10-11 14:38:16",
          //     "strategyName": "银行卡四要素验证",
          //     "strategyCode": "DEMO_ST0001"
          //   },
          //   "modelList": [
          //     {
          //       "modelCode": "DEMO_MD0001",
          //       "modelName": "银行卡四要素验证",
          //       "modelWeight": "40",
          //       "suggestionCode": "PASS",
          //       "suggestionText": "建议通过",
          //       "rulesetList": [
          //         {
          //           "rulesetCode": "DEMO_RS0001",
          //           "rulesetName": "银行卡四要素验证",
          //           "ruleList": [
          //             {
          //               "ruleCode": "DEMO_RS0001$RL0001",
          //               "ruleName": "银行卡四要素验证不一致",
          //               "ruleWeight": "100",
          //               "ruleLogicList": [
          //                 {
          //                   "ruleLogicText": "11",
          //                   "ruleLogicValue": "(百融-信息验证-身份证二要素验证 >= 1"
          //                 },
          //                 {
          //                   "ruleLogicText": "11",
          //                   "ruleLogicValue": "and 百融-信息验证-身份证二要素验证 < 10)"
          //                 }
          //               ]
          //             },
          //             {
          //               "ruleCode": "DEMO_RS0001$RL0002",
          //               "ruleName": "银行卡四要素验证一致",
          //               "ruleWeight": "0",
          //               "ruleLogicList": [
          //                 {
          //                   "ruleLogicText": "11",
          //                   "ruleLogicValue": "百融-信息验证-身份证二要素验证 == 0"
          //                 }
          //               ]
          //             },
          //             {
          //               "ruleCode": "DEMO_RS0001$RL0003",
          //               "ruleName": "银行卡四要素验证银行卡有问题",
          //               "ruleWeight": "40",
          //               "ruleLogicList": [
          //                 {
          //                   "ruleLogicText": "11",
          //                   "ruleLogicValue": "百融-信息验证-身份证二要素验证 == 11"
          //                 }
          //               ]
          //             }
          //           ]
          //         }
          //       ]
          //     }
          //   ]
          // }
          this.propsData = Object.assign({}, defaultData, currentData)
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $gridBackground: #f0f1f5;
  $borderColor: #dcdfe6;
  table{
    border-top: 1px solid $borderColor;
    border-left: 1px solid $borderColor;
    border-collapse: separate;
    width:100%;
    text-align: center;
    margin-bottom: 20px;
  }
  thead{
    color:black;
    background-color: $gridBackground;
  }
  th{
    font-weight: normal;
  }
  th,td{
    border-bottom: 1px solid $borderColor;
    border-right: 1px solid $borderColor;
    height:28px;
  }
  p{
    margin-bottom: 10px;
  }
  .page-container{
    font-size: 14px;
    color: #606266;
    overflow-y: auto;
  }
  .text-right{
    text-align: right;
  }
  .text-center{
    text-align: center;
  }
  .border-line{
    border: 1px solid $borderColor;
    padding:20px;
    margin-bottom: 10px;
  }
  .border-line-no-top{
    border: 1px solid $borderColor;
    padding:20px;
    margin-bottom: 10px;
    border-top:none;
  }
  .border-line-inner{
    border: 1px solid $borderColor;
    padding:20px;
    margin-bottom: 10px;
    height: calc(100% - 10px);
  }
  .padding-left{
    padding-left: 5px;
  }
  .padding-right{
    padding-right: 5px;
  }
  .content-title{
    border: 1px solid $borderColor;
    padding:20px;
  }
  .gray-bg{
    background-color: $gridBackground;
  }
</style>
