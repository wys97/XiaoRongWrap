import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 在线审批

/**
* 指定策略查询参数列表
* @param strategyCode
* */

export function GetParameterList (strategyCode) {
  const data = {
    strategyCode
  };
  return fetch({
    url: test + '/risk-api/approval_online/parameter_list',
    method: 'post',
    data
  })
}

/**
* 指定策略查询参数列表
* @param strategyCode
* @param strategyQuery
* */

export function SubmitData (strategyCode, strategyQuery) {
  const data = {
    strategyCode,
    strategyQuery
  };
  return fetch({
    url: test + '/risk-api/approval_online/submit',
    method: 'post',
    data
  })
}

export default {
  GetParameterList,
  SubmitData
}
