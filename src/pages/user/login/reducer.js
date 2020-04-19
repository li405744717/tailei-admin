/**
 * Created by dp-k on 2019/12/5.
 */
import {FETCH_REQUEST, LOGIN, SET_USER} from './actionTypes'
import {permission} from "../../../common/router";

const permissions = [
  "banner",
  "share",
  "push",
  "right",
  "pay_list",
  "pay_send",
  "pay_set",
  "house_list",
  "house_import_list",
  "house_sale_list",
  "house_sale_info",
  "repair",
  "worker",
  "suggest",
  "information_list",
  "information_type"
]


const State = {
  id: null,
  token: null,//'052756c520a19d1dc9fa5f361344590d474b0adf',
  userInfo: {
    account: '134****1234'
  },
  permissions: [],
  userPermissionPaths: []
}
export default (state = State, action) => {
  var newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case SET_USER:
      newState.id = action.id
      newState.token = action.token
      newState.role = action.role
      newState.permissions = action.permissions
      newState.name = action.name
      var userPermissionPaths = []
      for (var key of permissions) {
        userPermissionPaths = userPermissionPaths.concat(permission[key])
      }
      userPermissionPaths = userPermissionPaths.concat(permission.noPermission)
      newState.userPermissionPaths = userPermissionPaths
      return newState

    default:
      return state;
  }
}
