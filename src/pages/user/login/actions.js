/**
 * Created by dp-k on 2019/12/5.
 */
import {LOGIN, FETCH_REQUEST, SET_USER} from './actionTypes'

export const login = (options) => {
  return {
    type: FETCH_REQUEST,
    targetType: LOGIN,
    ...options
  }
}
export const setUser = (options) => {
  return {
    type: SET_USER,
    ...options
  }
}