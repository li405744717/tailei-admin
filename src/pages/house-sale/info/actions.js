/**
 * Created by dp-k on 2019/12/5.
 */
import {SET_SHOW_FLAG} from './actionTypes'

export const setShowFlag = (options) => {
  return {
    type: SET_SHOW_FLAG,
    ...options
  }
}
