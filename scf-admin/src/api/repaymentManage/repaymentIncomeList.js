import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 银行进账记录列表

/**
 * 查询列表
 * @param supplierName 商户名字
 * @param createDate 创建时间
 * @param incomeDate	T文本	否 还款日期
 * @param status	T文本	状态:AUDIT_WAIT-待审核 AUDIT_PASS-审核通过 AUDIT_REFUSE-审核拒绝
 * @param page	T文本	页码
 * @param limit	T文本	每页显示条数 
 */
export function getListData ({limit, page,createDate,supplierName,incomeDate,status}) {
  const data = {
    limit,
    page,
    createDate,
    supplierName,
    incomeDate,
    status
  }
  return fetch({
    url: test + '/admin/income/list',
    method: 'post',
    data
  })
}

export default {
  getListData
}
