export const RECEIVE_USERS = 'RECEIVE_USERS'
//actionCreators
export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}
