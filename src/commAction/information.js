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

}