import {GData as app} from "../common/global_data";
import request from './../common/request'
import Config from './../common/config'

var RequestURL = Config.REQUEST_URL


export default {
  house_list(params) {
    let url = RequestURL + 'house/house/admin_house_list/'
    return request.get(url, params).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  house_edit(params) {
    let url = RequestURL + 'house/house/admin_house_update/'
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
  house_info(params) {
    let url = RequestURL + 'house/house/admin_house_retrieve/'
    return request.get(url, params).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  }
}