/**
 * Created by dp-k on 2019/12/5.
 */
import {SET_SHOW_FLAG} from './actionTypes'

const State = {
  showFilter: false
}
export default (state = State, action) => {
  var newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case SET_SHOW_FLAG:
      var {flag} = action
      newState.showFilter = flag
      return newState
    default:
      return state;
  }
}
