

 const apiKey ='AIzaSyBrEdevpKRpF13aBB3W8B6ygzm4hA6LLeA';
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
 })}


export const authApi = {

    signUP(email, password) {
       fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, signRequestBody(email, password))
       .then( res => {
           if(res.ok) {
             return  alert('ok')
           } else {
            return res.json().then( data => {
                let errorMessage = `Attempt's failed!`
                if(data && data.error && data.error.message) {
                    if (data.error.message === 'EMAIL_EXISTS') {
                    errorMessage = 'Email already exists'
            }}
            alert(errorMessage);
               });
           }
       })
    },

    signIN(email, password) {
        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, signRequestBody(email, password))
        .then( res => {
            if(res.ok) {
              return  alert('ok')
            } else {
              return res.json().then( data => {
                  let errorMessage = 'Unsuccessful!'
                  if(data && data.error && data.error.message) {
                    if (data.error.message === 'EMAIL_EXISTS' || 'INVALID_PASSWORD') {
                        errorMessage = 'Email or password is incorrect'
              }}
              alert(errorMessage);
            });
            }
        });
     }
}

