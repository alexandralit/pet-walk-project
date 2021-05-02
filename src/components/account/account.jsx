import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './account.module.css';
import Store from './../../context';

function Account() {
  const data = useContext(Store);
  const history = useHistory();
  const [sign, setSign] = useState(false);
  
  const signout = () => {
    data.removeCookie('login');
    //data.cookies.remove("login");
    setSign(true)
    console.log(data.cookies);
    history.push('/');
  }

  useEffect(() => {
    return data.removeCookie('login');
  }, [sign])

  return (
      <section className={styles.account}>
        <h2>Account</h2>
        <h3>Profil</h3>

        <div className={styles.container}>
          <img src={data.user[0].img} alt='' />
          <h4>{data.user[0].name}</h4>
        </div>

        <button onClick={signout}>Signout</button>
        
      </section>
    );
}
  
export default Account;