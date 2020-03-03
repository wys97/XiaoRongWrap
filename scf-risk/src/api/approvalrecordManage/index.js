import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 审批记录

/**
 *指定策略查询参数列表
 * @param createTimeBegin 查询时间-从. yyyy-MM-dd
 * @param createTimeTo 查询时间-到. yyyy-MM-dd
 * @param strategyQuery 审批信息. 模糊查询
 * @param strategyCode "全部" + 见 "公共 > 下拉列表-策略"
 * @param suggestion 策略建议. "全部" + PASS: 建议通过; REVIEW: 建议复议; REJECT: 建议拒绝
 * @param decision 决策结果. "全部" + PASS: 通过; REJECT: 拒绝; NONE: 未做决策
 * @param status 状态. "全部" + DONE: 已生成; DOING: 未生成
 * @param page 页码
 * @param limit
* */

export function GetQueryList ({createTimeBegin, createTimeTo, strategyQuery, strategyCode, suggestion, decision, status, page, limit}) {
  const data = {
    createTimeBegin,
    createTimeTo,
    strategyQuery,
    strategyCode,
    suggestion,
    decision,
    status,
    page,
    limit
  }
  return fetch({
    url: test + '/risk-api/approval_record/list',
    method: 'post',
    data
  })
}

/**
 *查询审批记录详情
 * @param reportNo 报告编号
 * */

export function GetDetailData (reportNo) {
  const data = {
    reportNo
  }
  return fetch({
    url: test + '/risk-api/approval_record/detail',
    method: 'post',
    data
  })
}

export default {
  GetQueryList,
  GetDetailData
}
