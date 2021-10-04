import { Link, useHistory } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../store/auth-context';


const MainNavigation = () => {

  const authCtx = useContext(AuthContext);

  const isLogged = authCtx.isLoggedIn;
  const history = useHistory();


  const logoutHandler = () => {
    authCtx.isLogout();
    history.replace('/auth');
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLogged && <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {isLogged && <li>
            <Link to='/profile'>Profile</Link>
          </li>}
          {isLogged && <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
