import React from 'react';
import { Link } from 'react-router-dom';
import logo from './../../assets/img/logo.png';
import pet from './../../assets/img/petWalk.png';
import styles from './startPage.module.css';

function StartPage() {

  return (
    <section className={styles.container}>
      <div className={styles.startPage}>
        <img src={logo} alt="logo app" />
        <img src={pet} alt="pet walk" />
        <p>The Pet Walk app is designed for taking care of your pet. Fixe objectives based on their needs. See their progresses and share them with the community.</p>
        <Link to='/registration' className={styles.btnStart}>Let’s start</Link>
      </div>
    </section>
  );
}

export default StartPage;
