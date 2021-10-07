import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';

export const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  isLogin: (token) => { },
  isLogout: () => { },
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationTime =  localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationTime);

  if (remainingTime <= 60000) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null
  }

  return {
    token: storedToken,
    duration: remainingTime
  }
}

export function AuthContextProvider(props) {

  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  };


  const [token, setToken] = useState(initialToken);
  const logStatus = !!token;
  let logoutTimer;

  if (logoutTimer) {
    clearTimeout(logoutTimer);
  };

useEffect (() => {
  if (tokenData) {
    logoutTimer = setTimeout(logoutHandler, tokenData.duration)
  }
}, [tokenData, logoutHandler])

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
  }, []);

  const loginHandler = (token, expirationTime) => {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime);
    setToken(token);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const contextValue = {
    token,
    isLoggedIn: logStatus,
    isLogin: loginHandler,
    isLogout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}