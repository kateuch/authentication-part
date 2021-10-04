import classes from './ProfileForm.module.css';
import { AuthContext } from '../../store/auth-context';
import { useContext, useRef } from 'react';
import { authApi } from '../../api/auth-api';



const ProfileForm = () => {

  const newPasswordRef = useRef()
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const onChangePassword = (event) => {
    event.preventDefault();

    const newPassword = newPasswordRef.current.value;


    authApi.newPassword(token, newPassword)
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return res.json().then(data => {
          let errorMessage = `Attempt's failed! Try again.`

          throw new Error(errorMessage);
        });
      }
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  return (
    <form className={classes.form} onSubmit={onChangePassword}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='6' ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button >Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
