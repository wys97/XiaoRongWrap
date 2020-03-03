import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 供应商入驻

/**
 * 查询列表
 * @param limit 每页记录数
 * @param page 当前页数
 * receivableNo	T文本	否应收账款编号
 * supplierName	T文本	否供应商名称
 * shipNo	T文本	否 到货单号
 * shipDate	T文本	否 到货日期
 * status	T文本	否 状态：INVALID-未形成 AUDIT_WAIT-待审核 AUDIT_REFUSE-不达标 AUDIT_PASS-已达标 OVERDUE-已过期
 * page	T文本	是   第几页
 */
export function getListData ({limit, page,receivableNo,supplierName,shipNo,shipDate,status}) {
  const data = {
    limit,
    page,
    receivableNo,
	supplierName,
	shipNo,
	shipDate,
	status
  }
  return fetch({
    url: test + '/risk-api/account_receivable/list',
    method: 'post',
    data
  })
}

export default {
  getListData
}
