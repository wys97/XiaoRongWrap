import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 还款详情

/**
 * 还款登记详情
 * @param orderNo 还款登记表 id
 */
export function supplierCreditDetail (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/credit_manage/supplier_credit_detail',
    method: 'post',
    data
  })
}



export default {
  supplierCreditDetail,
}
