
const apiKey = 'AIzaSyBrEdevpKRpF13aBB3W8B6ygzm4hA6LLeA';
const signRequestBody = (email, password) => {
  return ({
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password,
      returnSecureToken: true
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}


export const authApi = {

  signUP(email, password) {
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, signRequestBody(email, password))

  },

  signIn(email, password) {
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, signRequestBody(email, password))
  },
  newPassword(token, newPassword) {
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify({
        idToken: token,
        password: newPassword,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

}

