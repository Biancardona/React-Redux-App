import * as types from "./actionTypes";

export function beginApiCall() {
  return { type: types.BEGIIN_API_CALL };
}
export function apiCallError() {
  return { type: types.API_CALL_ERROR };
}
