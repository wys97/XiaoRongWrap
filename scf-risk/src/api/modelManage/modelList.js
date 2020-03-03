import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

/**
 * 查询列表
 * @param limit 每页记录数
 * @param page 当前页数
 * @param modelName 规则集名称
 * @param modelScene 应用场景
 */
export function getListData ({limit, page,modelName,modelScene}) {
  const data = {
    limit,
    page,
    modelName,
    modelScene
  }
  return fetch({
    url: test + '/risk-api/model_manage/model_list',
    method: 'post',
    data
  })
}

/**
 * 新增版本
 * @param modelCode 规则集code
 * @param modelVersion 规则集版本号
 */
export function addVersion ({modelCode,modelVersion,modelDescription}) {
  const data = {
    modelCode,
    modelVersion,
    modelDescription
  }
  return fetch({
    url: test + '/risk-api/model_manage/add_model_version',
    method: 'post',
    data
  })
}

/**
 * 查询列表
 * @param modelCode 规则集code
 * @param modelVersion 规则集版本号
 * @param modelStatus 启用还是禁用      状态. ENABLED: 启用; DISABLED: 禁用
 */
export function enableDisableModel ({modelCode,modelVersion,modelStatus}) {
  const data = {
    modelCode,
    modelVersion,
    modelStatus
  }
  return fetch({
    url: test + '/risk-api/model_manage/enable_disable_model',
    method: 'post',
    data
  })
}

export default {
  getListData,
  addVersion,
  enableDisableModel
}
