/*
-In this files are action-generators. 
-An action is a javascript object that has "type" and "state".
-One action-generator is responsible to generate one type of action, 
    and attach its parameters to the state field. 
*/
export function createUserAction(email, password){
    return {
        type: 'SIGN_UP_USER',
        state: {
            email: email,
            password: password
        }
    }
}

export function LoginUserAction(email, password){
    return {
        type: 'LOGIN_USER',
        state: {
            email: email,
            password: password
        }
    }
}