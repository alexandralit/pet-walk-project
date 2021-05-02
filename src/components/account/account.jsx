import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './account.module.css';
import Store from './../../context';

function Account() {
  const data = useContext(Store);
  const history = useHistory();
  
  const user = data.users.filter(user => user.email === data.cookies.login.email);
  
  const signout = () => {
    data.removeCookie('login');
    history.push('/');
  }

  //const image = user[0].img;
// const image = $('img')[0]; // it can also be an <img> element

  console.log(user[0].img);

  return (
      <section className={styles.account}>
        <h2>Account</h2>
        <h3>Profil</h3>

        {data.cookies.login && <div className={styles.container}>
          <img src={user[0].img} alt='' />
          <h4>{user[0].name}</h4>
        </div>}

        <button onClick={signout}>Sign out</button>
        
      </section>
    );
}
  
export default Account;