import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 首页

/**
 * 待办事项
 */
export function backlog () {
  return fetch({
    url: test + '/capital-api/index/backlog',
    method: 'post',
  })
}

/**
 * 账户信息
 */
export function balance () {
  return fetch({
    url: test + '/capital-api/index/balance',
    method: 'post',
  })
}
/*
 *逾期信息
 * */
export function overdueBackPlan(){
	return fetch({
		url:test + '/capital-api/index/overdue_back_plan',
		method:'post',
	})
}

/*
 *非逾期信息
 * */
export function normalBackPlan(){
	return fetch({
		url:test + '/capital-api/index/normal_back_plan',
		method:'post',
	})
}

/*
 *回款数据
 * */
export function collectionData(){
	return fetch({
		url:test + '/capital-api/index/collectionData',
		method:'post',
	})
}

/*
 *放款数据
 * */
export function lendingData(){
	return fetch({
		url:test + '/capital-api/index/lendingData',
		method:'post',
	})
}

export default {
	backlog,
  	balance,
  	overdueBackPlan,
  	normalBackPlan,
  	collectionData,
  	lendingData
}