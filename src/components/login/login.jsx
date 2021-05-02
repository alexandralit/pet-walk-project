import React, { useRef, useState, useContext, useEffect } from 'react';
import styles from './login.module.css';
import Store from './../../context';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Login() {
  const data = useContext(Store);
  const inputEmail = useRef('');
  const inputPassword = useRef('');
  const [error, setError] = useState(false);
  const history = useHistory();

  const loginUser = (event) => {
    event.preventDefault();
    let result = data.users.filter(user => user.email === inputEmail.current.value);
    if (result.length !== 0) {
      if (result[0].password === inputPassword.current.value) {
        data.setCookie('login', {id: result[0].id, email: result[0].email, password: result[0].password}, { path: '/' });
        history.push('/home');
      }
      else setError(true);
    } else setError(true);
  }

  return (
      <section className={styles.login}>
        <h2>Login</h2>

        <form action="#" onSubmit={loginUser} className={styles.form}>
            <p>Email adress</p>
            <input type="email" placeholder="Email adress" required ref={inputEmail} />

            <p>Password</p>
            <input type="password" placeholder="Password" required ref={inputPassword} />

            {error && <p className={styles.error}>The email or password you’ve entered is incorrect.</p>}
            
            <button>Login</button>
        </form>

        <p>You have not an account ? <Link to="/registration">Signup</Link></p>
      </section>
    );
}
  
export default Login;