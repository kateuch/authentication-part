import React from 'react';
import { useState } from 'react';

export const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    isLogin: (token) => {},
    isLogout: () => {},
});

export function AuthContextProvider (props) {
    const [token, setToken] = useState(null);

    const logStatus = !!token;

    const loginHandler = (token) => {
      setToken(token);
    };
    const logoutHandler = () => {
      setToken(null);
    }


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