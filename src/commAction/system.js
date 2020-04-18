import {GData as app} from "../common/global_data";
import request from './../common/request'
import Config from './../common/config'

var RequestURL = Config.REQUEST_URL


export default {
  banner_list(params) {
    let url = RequestURL + 'material/material/admin_banner_list/'
    return request.get(url, params).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  banner_add(params) {
    let url = RequestURL + 'material/material/admin_banner_add/'
    return request.post(url, params).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  banner_edit(params) {
    let url = RequestURL + 'material/material/admin_banner_update/'
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
  banner_delete(params) {
    let url = RequestURL + 'material/material/admin_banner_update/'
    var param = {
      action: 'DELETE”',
      ...params
    }
    return request.post(url, param).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  }
}