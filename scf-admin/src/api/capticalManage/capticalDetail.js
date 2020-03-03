import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

//资金方详情

/** 
 * 资金方详情查询
 * @param capticalId   资金方编号
 * 
 * */

export function detail(capticalId){
	let data = {
		capticalId
	}
	return fetch({
		url:test+'/admin/captical_manage/detail',
		method:'post',
		data
	})
}
/*
 * 申请数字证书
 *@param capticalId 资金方编号
 * */
export function applyCertificate(capticalId){
	let data = {
		capticalId
	}
	return fetch({
		url:test+'/admin/captical_manage/apply_certificate',
		method:'post',
		data
	})
}
export default{
	detail,
	applyCertificate
}
