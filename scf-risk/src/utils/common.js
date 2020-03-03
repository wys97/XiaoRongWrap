function deepCopy (obj) {
  if (typeof obj !== 'object') {
    return obj
  }
  var newobj = {}
  for (let attr in obj) {
    newobj[attr] = deepCopy(obj[attr])
  }
  return newobj
}
export function copyOriginQueryData () {
  if (this.listQuery) {
    this.originListQuery = deepCopy(this.listQuery)
  }
}
export function handleResetQueryData () {
  this.listQuery = deepCopy(this.originListQuery)
  this.getList && this.getList()
}
export function handleSelectionChange (currentRow) {
  this.selectedData = currentRow
}
export function handleSizeChange (val) {
  this.listQuery.limit = val
  this.getList && this.getList()
}
export function handleCurrentPage (val) {
  this.listQuery.page = val
  this.getList && this.getList()
}
