/*
-In this files are action-generators.
-An action is a javascript object that has "type" and "state".
-One action-generator is responsible to generate one type of action,
    and attach its parameters to the state field.
*/

/* signup user shouldn't ever be used
export function createUserAction (email, password) {
  return {
    type: 'SIGN_UP_USER',
    state: {
      email: email,
      password: password
    }
  }
}
*/

export function LoginUserAction (userData) {
  return {
    type: 'LOGIN_USER',
    userData
  }
}

export function LogoutUserAction(userData){
  return {
    type: 'LOGOUT_USER',
    userData
  }
}

export function LoginStudentAction(userData){
  return {
    type: 'LOGIN_STUDENT',
    userData 
  }
}

export function LoginOrgAction(userData){
  return {
    type: 'LOGIN_ORG',
    userData
  }
}

export function GetOrgsAction(data){
  return {
    type: 'GET_ORGS',
    data
  }
}

export function GetEventsAction(data){
  return {
    type: 'GET_EVENTS',
    data
  }
}
