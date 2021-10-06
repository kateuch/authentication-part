import React from 'react';
import { useState } from 'react';

export const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    isLogin: (token) => {},
    isLogout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime -currentTime;
  return remainingDuration
}

export function AuthContextProvider (props) {

  const initialToken = localStorage.getItem('token') || null
    const [token, setToken] = useState(initialToken);

    const logStatus = !!token;

    const logoutHandler = () => {
      localStorage.removeItem('token')
      setToken(null);
    ;}

    const loginHandler = (token, expirationTime) => {
      localStorage.setItem('token', token)
      setToken(token);

      const remainingTime = calculateRemainingTime(expirationTime);

      setTimeout(logoutHandler, 3000)
    };



    const contextValue = {
      token,
      isLoggedIn: logStatus,
      isLogin: loginHandler,
      isLogout: logoutHandler,
    }
    return (
      <AuthContext.Provider value={contextValue}>
        {props.children}
      </AuthContext.Provider>
    );
  }