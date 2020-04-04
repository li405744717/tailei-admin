import {GData as app} from "../common/global_data";
import request from './../common/request'
import Config from './../common/config'

var KbURL = Config.KBURL
var AgentURL = Config.AGENTURL
var AnalystURL = Config.ANALYSTURL
var ConfigURL = Config.CONFIGURL

export default {
  login(params) {
    let url = AgentURL + 'account/login/'
    return request.post(url, params, null, true).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  agent_login(params) {
    let url = AgentURL + 'account/fplogin/'
    return request.get(url, params, null, true).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  },
  agent_authorize(params) {
    let url = AgentURL + 'account/authorize/'
    return request.post(url, params, null, true).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  }
}