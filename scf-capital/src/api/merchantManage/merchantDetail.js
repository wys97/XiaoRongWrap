import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

/**
 * 商户管理详情-基本信息 企业信息
 * @param supplierId 供应商ID
 */
export function enterprise (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/management_detail_enterprise',
    method: 'post',
    data
  })
}

/**
 * 商户管理详情-基本信息 法定代表人信息
 * @param supplierId 供应商ID
 */
export function repre (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/management_detail_repre',
    method: 'post',
    data
  })
}

/**
 * 商户管理详情-基本信息 担保人信息
 * @param supplierId 供应商ID
 */
export function guarantor (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/management_detail_guarantor',
    method: 'post',
    data
  })
}

/**
 * 商户管理-贸易信息
 * @param supplierId 供应商ID
 */
export function tradeInfo (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/trade_info',
    method: 'post',
    data
  })
}

/**
 * 商户管理-头部信息
 * @param supplierId 供应商ID
 */
export function headInfo (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/head_info',
    method: 'post',
    data
  })
}

export default {
  enterprise,
  repre,
  guarantor,
  tradeInfo,
  headInfo
}
