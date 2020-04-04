import request from './../common/request'
export default  {
  rankList(param, url) {
    return request.get(url, param, null, true).then(data => {
      return data
    })
  },

}