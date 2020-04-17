/**
 * Created by dp-k on 2019/12/5.
 */
import {FETCH_REQUEST, LOGIN, SET_USER} from './actionTypes'

const State = {
  id: null,
  token: '3c35d374c0c0e14a995567a8fc06b0a64d44c255',
  userInfo: {
    account: '134****1234'
  }
}
export default (state = State, action) => {
  var newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case SET_USER:
      newState.id = action.id
      newState.token = action.token
      return newState

    default:
      return state;
  }
}
