/**
 * Created by dp-k on 2019/12/5.
 */
import {FETCH_REQUEST, LOGIN, SET_USER} from './actionTypes'

const State = {
  id: null,
  token: null,
  userInfo: {}
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
