import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';
const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => {
      //assumption: Always succeeds!
      history.replace('/')
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        {/* Note: don't use minLength for real projects because it could be easily disabled */}
        <input
          type='password'
          id='new-password'
          minLength='7'
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
