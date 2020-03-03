import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 供应商入驻

/**
 * 查询列表
 * @param limit 每页记录数
 * @param page 当前页数
 * @param enterpriseName	T文本	否 企业名称
 * @param repreName	T文本	否  法人名字
 * @param idcard	T文本	否 法人身份证
 * @param beginCreateTime	T文本	否 开始日期
 * @param endCreateTime	T文本	否 结束日期
 */
export function getListData ({limit, page,enterpriseName,repreName,idcard,beginCreateTime,endCreateTime}) {
  const data = {
    limit,
    page,
    enterpriseName,
    repreName,
    idcard,
    beginCreateTime,
    endCreateTime
  }
  return fetch({
    url: test + '/capital-api/supplier/management_list',
    method: 'post',
    data
  })
}

export default {
  getListData
}
