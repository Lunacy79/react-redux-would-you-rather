export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const EMPTY_AUTHED_USER = "EMPTY_AUTHED_USER";


export function setAuthedUser(id) {
  console.log(id)
  return {
    type: SET_AUTHED_USER,
    id
  };
}


export function emptyAuthedUser(id) {
  return {
    type: EMPTY_AUTHED_USER,
    id
  };
}