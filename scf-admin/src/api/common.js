import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 公共接口

/**
 * 银行列表
 */
export function comboboxBankList () {
  return fetch({
    url: test + '/admin/combobox/bank_list',
    method: 'post'
  })
}

/**
 * 核心企业
 */
export function comboboxCentreEnterprise () {
  return fetch({
    url: test + '/admin/combobox/centre_enterprise',
    method: 'post'
  })
}

/**
 * 资金方
 */
export function queryCapitalEnterprise () {
  return fetch({
    url: test + '/admin/supplier_register/query_capital_enterprise',
    method: 'post'
  })
}

export default {
  comboboxBankList,
  comboboxCentreEnterprise,
  queryCapitalEnterprise
}