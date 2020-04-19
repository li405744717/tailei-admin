import {GData as app} from "../common/global_data";
import request from './../common/request'
import Config from './../common/config'

var RequestURL = Config.REQUEST_URL

export default {
  login(params) {
    let url = RequestURL + 'account/staff/staff_login/'
    return request.post(url, params, null, true).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  }
}