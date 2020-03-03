import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 公共接口

/**
 * 下拉列表-策略  ---- 在线审批、审批记录
 */
export function GetStrategyList () {
  return fetch({
    url: test + '/risk-api/combobox/strategy_list',
    method: 'post'
  })
}

/**
 * 下拉列表-数据源分类  ---- 模型管理-详情页面
 */
export function GetCategoryList () {
  return fetch({
    url: test + '/risk-api/combobox/data_category_list',
    method: 'post'
  })
}

/**
 * 下拉列表-场景 ---- 模型
 */
export function GetSceneList () {
  return fetch({
    url: test + '/risk-api/combobox/scene_list',
    method: 'post'
  })
}
/**
 * 银行列表
 */
export function comboboxBankList () {
  return fetch({
    url: test + '/risk-api/combobox/bank_list',
    method: 'post'
  })
}

/**
 * 核心企业
 */
export function comboboxCentreEnterprise () {
  return fetch({
    url: test + '/risk-api/combobox/centre_enterprise',
    method: 'post'
  })
}

/**
 * 资金方
 */
export function queryCapitalEnterprise () {
  return fetch({
    url: test + '/risk-api/supplier_register/query_capital_enterprise',
    method: 'post'
  })
}
export default {
  GetStrategyList,
  GetCategoryList,
  comboboxBankList,
  comboboxCentreEnterprise,
  queryCapitalEnterprise,
  GetSceneList
}
