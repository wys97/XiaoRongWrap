import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

/**
 * 核心企业详情
 * @param id 核心企业id
 */
export function detail (id) {
  const data = {
    id
  }
  return fetch({
    url: test + '/admin/core_enterprise/detail',
    method: 'post',
    data
  })
}



/**
 * 核心企业详情保存
 * @param id 核心企业id
 * @param enterpriseName 企业简称
 * @param setUpDate 成立日期
 * @param creditLine 授信额度
 * @param scmSite 交易平台
 * @param url 交易平台网址
 * @param subsidiaryJsonList 签约子公司json串
 */
export function coreEnterpriseUpdate ({id,enterpriseName,setUpDate,creditLine,scmSite,url,subsidiaryJsonList}) {
	const data = {
	    id,
	    enterpriseName,
	    setUpDate,
	    creditLine,
	    scmSite,
	    url,
	    subsidiaryJsonList
	}
	return fetch({
	    url: test + '/admin/core_enterprise/update',
	    method: 'post',
	    data
	})
}

/**
 * 新增核心企业
 * @param id 核心企业id
 * @param enterpriseName 企业简称
 * @param setUpDate 成立日期
 * @param creditLine 授信额度
 * @param scmSite 交易平台
 * @param url 交易平台网址
 */
export function coreEnterpriseAdd ({id,enterpriseName,setUpDate,creditLine,scmSite,url}) {
	const data = {
	    id,
	    enterpriseName,
	    setUpDate,
	    creditLine,
	    scmSite,
	    url
	}
	return fetch({
	    url: test + '/admin/core_enterprise/add',
	    method: 'post',
	    data
	})
}

/**
 * 删除核心企业
 * @param id 核心企业id
 */
export function coreEnterpriseDelete (id) {
	const data = {
	    id
	}
	return fetch({
	    url: test + '/admin/core_enterprise/delete',
	    method: 'post',
	    data
	})
}
export default {
  detail,
  coreEnterpriseUpdate,
  coreEnterpriseAdd,
  coreEnterpriseDelete
}
