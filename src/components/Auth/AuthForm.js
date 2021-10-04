import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { authApi } from '../../api/auth-api';
import LoadingSpinner from '../UI/LoadingSpinner';
import { AuthContext } from '../../store/auth-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const userEmail = emailRef.current.value;
    const userPassword = passwordRef.current.value;


    if (isLogin) {
      setIsLoading(true)
      authApi.signIn(userEmail, userPassword)
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json()
          } else {
            return res.json().then(data => {
              let errorMessage = 'Unsuccessful!'
              if (data && data.error && data.error.message) {
                if (data.error.message === 'EMAIL_NOT_FOUND' || 'INVALID_PASSWORD') {
                  errorMessage = 'Email or password is incorrect'
                }
              }
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          authCtx.isLogin(data.idToken);
          history.replace('/profile')
        })
        .catch((err) => {
          alert(err.message)
        })
    } else {
      setIsLoading(true)
      authApi.signUP(userEmail, userPassword)
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json()
          } else {
            return res.json().then(data => {
              let errorMessage = `Attempt's failed!`
              if (data && data.error && data.error.message) {
                if (data.error.message === 'EMAIL_EXISTS') {
                  errorMessage = 'Email already exists'
                }
              }
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          authCtx.isLogin(data.idToken);
          history.replace('/profile')
        })
        .catch((err) => {
          alert(err.message)
        })
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          {isLoading ? <LoadingSpinner /> : <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
