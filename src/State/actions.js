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

export function LoginUserAction () {
  return {
    type: 'LOGIN_USER',
  }
}

export function LogoutUserAction(){
  return {
    type: 'LOGOUT_USER'
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
