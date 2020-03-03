import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 供应商入驻

/**
 * 查询列表
 * @param limit 每页记录数
 * @param page 当前页数
 * @param financeNo	T文本	融资单号
 * @param supplierName	T文本	否供应商名称
 * @param applyDate	T文本	否融资日期
 * @param status	T文本	否 状态：TRANSFER_CONTRACT-待供应商签署 GUARANTEE_CONTRACT-待担保人签署 FINANCE_AUDIT_ING-融资审核中 FINANCE_AUDIT_REFUSE-融资审核拒绝 WAIT_LOAN-待资金方放款 SUCCESS-融资成功 FAIL-融资失败 INVALID-失效
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
    url: test + '/risk-api/finance/list',
    method: 'post',
    data
  })
}

export default {
  getListData
}
