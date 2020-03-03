import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 商户入驻

/**
 * 查询列表
 * @param limit 每页记录数
 * @param page 当前页数
 * @param centerName	T文本	否 核心企业条件查询
 */
export function getListData ({limit, page,centerName}) {
  const data = {
    limit,
    page,
    centerName
  }
  return fetch({
    url: test + '/admin/core_enterprise/list',
    method: 'post',
    data
  })
}

export default {
  getListData
}
