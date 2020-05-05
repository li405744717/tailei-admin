import {GData as app} from "../common/global_data";
import request from './../common/request'
import Config from './../common/config'

var RequestURL = Config.REQUEST_URL


export default {
  repair_list(params) {
    let url = RequestURL + 'repair/repair/admin_repair_records/'
    return request.get(url, params).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  repair_update(params) {
    let url = RequestURL + 'repair/repair/admin_repair_update/'
    return request.post(url, params).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  repair_man_list() {
    let url = RequestURL + 'account/staff/staff_list/?role=worker'
    return request.get(url, {}).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  }
}