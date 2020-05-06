import {GData as app} from "../common/global_data";
import request from './../common/request'
import Config from './../common/config'

var RequestURL = Config.REQUEST_URL


export default {
  sale_list(params) {
    let url = RequestURL + 'house/house/admin_rent_list/'
    return request.get(url, params).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  sale_edit(params) {
    let url = RequestURL + 'house/house/admin_rent_update/'
    var param = {
      action: 'UPDATE',
      ...params
    }
    return request.post(url, param).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  sale_delete(params) {
    let url = RequestURL + 'house/house/admin_rent_update/'
    var param = {
      action: 'DELETE',
      ...params
    }
    return request.post(url, param).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  }
}
