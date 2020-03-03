import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 首页

/**
 * 业务监控汇总
 */
export function getBusinessMonitors () {
  return fetch({
    url: test + '/risk-api/index/business_monitors',
    method: 'post',
  })
}


/**
 * 统计数据
 */
export function getStatisticalData () {
  return fetch({
    url: test + '/risk-api/index/statistical_data',
    method: 'post',
  })
}

export default {
  getBusinessMonitors,
  getStatisticalData
}