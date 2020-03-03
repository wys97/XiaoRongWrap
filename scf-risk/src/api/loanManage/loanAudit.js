import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 供应商入驻

/**
 * 查询列表
 * @param limit 每页记录数
 * @param page 当前页数
 * @param financeNo	T文本	否 融资单号
 * @param supplierName	T文本	否供应商名称
 * @param applyDate	T文本	否融资日期
 * @param status	T文本	否 状态：WAIT_LOAN-待资金方放款 SUCCESS-融资成功 FAIL-融资失败
 */
export function getListData ({limit, page,financeNo,supplierName,applyDate,status}) {
  const data = {
    limit,
    page,
    financeNo,
    supplierName,
    applyDate,
    status
  }
  return fetch({
    url: test + '/risk-api/loan/list',
    method: 'post',
    data
  })
}

export default {
  getListData
}
