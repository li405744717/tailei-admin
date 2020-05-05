import {GData as app} from "../common/global_data";
import request from './../common/request'
import Config from './../common/config'

var RequestURL = Config.REQUEST_URL


export default {
  pay_list(params) {
    let url = RequestURL + 'charge/charge/admin_charge_list/'
    return request.get(url, params).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  pay_edit(params) {
    let url = RequestURL + 'charge/charge/admin_charge_update/'
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
  pay_set_list(params) {
    let url = RequestURL + 'charge/charge/admin_fee_config_list/'
    return request.get(url, params).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  pay_set_edit(params) {
    let url = RequestURL + 'charge/charge/admin_fee_config_update/'
    var param = {
      action: 'UPDATE',
      ...params
    }
    console.log(param)
    return request.post(url, param).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
}