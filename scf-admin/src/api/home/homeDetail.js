import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 首页
/**
 * 待办事项
 */
export function backlog () {
  return fetch({
    url: test + '/admin/index/backlog',
    method: 'post',
  })
}

/**
 * 数据统计
 */
export function dataStatistics () {
  return fetch({
    url: test + '/admin/index/data_statistics',
    method: 'post',
  })
}
/*
 *代收统计
 * */
export function collectionStatistics(){
	return fetch({
		url:test + '/admin/index/collection_statistics',
		method:'post',
	})
}

/*
 *逾期统计
 * */
export function overdueStatistical(){
	return fetch({
		url:test + '/admin/index/overdue_statistical',
		method:'post',
	})
}

/*
 *回款数据
 * */
export function collectionData(){
	return fetch({
		url:test + '/admin/index/collection_data',
		method:'post',
	})
}

/*
 *放款数据
 * */
export function loanData(){
	return fetch({
		url:test + '/admin/index/loan_data',
		method:'post',
	})
}

export default {
	backlog,
  	dataStatistics,
  	collectionStatistics,
  	overdueStatistical,
  	collectionData,
  	loanData
}