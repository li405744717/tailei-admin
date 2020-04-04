import Config from "./config";

export class GData {
  static globalData = {
    requestList: [],
    recordList: [],
    user: {
      userInfo: {}
    },
    window: {},
    token: null
  }
}

// const globalData = {}
export function set(key, val) {
  GData.globalData[key] = val
}

export function get(key) {
  let val = GData.globalData[key]
  return val
}
