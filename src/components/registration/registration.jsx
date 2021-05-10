import React, { useRef, useState, useContext } from 'react';
import styles from './registration.module.css';
import Store from './../../context';
import { Link } from 'react-router-dom';
import uniqid from 'uniqid';
import { useHistory } from 'react-router-dom';

function Registration() {
  const data = useContext(Store);
  const id = uniqid();
  const [img, setImg] = useState(null);
  const history = useHistory();
  const inputName = useRef('');
  const inputEmail = useRef('');
  const inputPassword = useRef('');
  const imgRef = useRef('');
  const [error, setError] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  

  const getInfoUser = (event) => {
    event.preventDefault();

    let result = data.users.filter(user => user.email === inputEmail.current.value);
    const regexp = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/;

    if (inputName.current.value.length >= 2) {
      setErrorName(false);
      if (regexp.test(inputEmail.current.value)) {
        setErrorEmail(false);
        if (inputPassword.current.value.length >= 6) {
          setErrorPassword(false);
          if (result.length === 0) {
            data.setUsers([...data.users, {id, img, name: inputName.current.value, email: inputEmail.current.value, password: inputPassword.current.value, pets: []}]);
            localStorage.setItem('Users', JSON.stringify([...data.users, {id, img, name: inputName.current.value, email: inputEmail.current.value, password: inputPassword.current.value, pets: []}]));
            
            data.setCookie('login', {id, email: inputEmail.current.value, password: inputPassword.current.value }, { path: '/' });
            
            history.push('/mypets');
          } else {
            setError(true);
          }
        } else {
          setErrorPassword(true);
        }
      } else {
        setErrorEmail(true);
      }
    } else {
      setErrorName(true);
    }
  }
  
  const getImage = (event) => {
    setImg(URL.createObjectURL(event.target.files[0]));
    imgRef.current.style.display = 'block';
  }

  return (
      <section className={styles.registration}>
        <h2>New user</h2>
        <h3>Account creation</h3>

        <div className={styles.inputWrapper} onChange={getImage}>
          <input type="file" name="file" id="input_file" className="input_file" accept=".jpg, .jpeg, .png" />
          <label htmlFor="input_file"><i className="fa fa-plus"></i></label>
          <img src={img} id="imageUser" ref={imgRef} alt="user" />
        </div>

        <form action="#" onSubmit={getInfoUser} className={styles.form} noValidate>
            <p>Full name</p>
            <input type="text" placeholder="Full name" minLength="2" required ref={inputName} />

            {errorName && <p className={styles.error}>Your name should have at least 2 symbols.</p>}

            <p>Email adress</p>
            <input type="email" placeholder="Email adress" required ref={inputEmail} />

            {errorEmail && <p className={styles.error}>Your email is incorrect.</p>}
            {error && <p className={styles.error}>Your email already exists.</p>}

            <p>Password</p>
            <input type="password" placeholder="Password" minLength="6" required ref={inputPassword} />

            {errorPassword && <p className={styles.error}>The password should have at least 6 symbols.</p>}
            
            <button>Create my account</button>
        </form>
        
        <p>You have an account ? <Link to="/login">Login</Link></p>
      </section>
    );
}
  
export default Registration;