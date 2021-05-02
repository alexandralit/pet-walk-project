import React, { useRef, useState, useContext, useEffect } from 'react';
import styles from './registration.module.css';
import Store from './../../context';
import { Link } from 'react-router-dom';
import uniqid from 'uniqid';
import { useHistory } from 'react-router-dom';

function Registration() {
  const data = useContext(Store);
  const [img, setImg] = useState([]);
  const [error, setError] = useState(false);
  const history = useHistory();
  const inputName = useRef('');
  const inputEmail = useRef('');
  const inputPassword = useRef('');
  const imgReg = useRef('');

  useEffect(() => {
    data.setId(uniqid());
  }, []);

  const getInfoUser = (event) => {
    event.preventDefault();

    data.setUsers([...data.users, {id: data.id, img, name: inputName.current.value, email: inputEmail.current.value, password: inputPassword.current.value, pets: []}]);
    localStorage.setItem('Users', JSON.stringify([...data.users, {id: data.id, img, name: inputName.current.value, email: inputEmail.current.value, password: inputPassword.current.value, pets: []}]));
    
    data.setCookie('login', {id: data.id, email: inputEmail.current.value, password: inputPassword.current.value }, { path: '/' });
    
    history.push('/mypets');
  }
  
  const getImage = (event) => {
    //console.log(imgReg.currentSrc);
    const img = document.getElementById("imageUser");
    img.src = URL.createObjectURL(event.target.files[0]);
    img.style.display = "block";
    setImg(URL.createObjectURL(event.target.files[0]));
  }

  return (
      <section className={styles.registration}>
        <h2>New user</h2>
        <h3>Account creation</h3>

        <div className={styles.inputWrapper} onChange={getImage}>
          <input type="file" name="file" id="input_file" className="input_file" accept=".jpg, .jpeg, .png" />
          <label htmlFor="input_file"><i className="fa fa-plus"></i></label>
          <img src="#" id="imageUser" ref={imgReg} />
        </div>

        <form action="#" onSubmit={getInfoUser} className={styles.form}>
            <p>Full name</p>
            <input type="text" placeholder="Full name" required ref={inputName} />

            <p>Email adress</p>
            <input type="email" placeholder="Email adress" required ref={inputEmail} />

            <p>Password</p>
            <input type="password" placeholder="Password" required ref={inputPassword} />
            
            <button>Create my account</button>
        </form>
        <p>You have an account ? <Link to="/login">Login</Link></p>
      </section>
    );
}
  
export default Registration;