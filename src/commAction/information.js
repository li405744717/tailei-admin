import {GData as app} from "../common/global_data";
import request from './../common/request'
import Config from './../common/config'

var RequestURL = Config.REQUEST_URL


export default {
  information_list(params) {
    let url = RequestURL + 'material/material/admin_passage_list/'
    return request.get(url, params).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  information_create(params) {
    let url = RequestURL + 'material/material/admin_passage_create/'
    return request.post(url, params).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  information_type_list(params) {
    let url = RequestURL + 'material/material/admin_label_list/'
    return request.get(url, params).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  information_type_create(params) {
    let url = RequestURL + 'material/material/admin_label_create/'
    return request.post(url, params).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  information_type_edit(params) {
    let url = RequestURL + 'material/material/admin_label_update/'
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
  information_type_delete(params) {
    let url = RequestURL + 'material/material/admin_label_update/'
    var param = {
      action: 'DELETE',
      ...params
    }
    return request.post(url, param).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
}
