import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 商户还款登记列表

/**
 * 查询列表
 * @param supplierName 商户名字
 * @param repaymentDate	T文本	否 提交日期
 * @param status	T文本	状态:CONFIRM_ING-待确认 CONFIRM-已确认 UN_RECEIVE-未收到
 * @param page	T文本	页码
 * @param limit	T文本	每页显示条数 
 */
export function getListData ({limit, page,supplierName,repaymentDate,status}) {
  const data = {
    limit,
    page,
    supplierName,
    repaymentDate,
    status
  }
  return fetch({
    url: test + '/admin/repayment/register_list',
    method: 'post',
    data
  })
}

export default {
  getListData
}
