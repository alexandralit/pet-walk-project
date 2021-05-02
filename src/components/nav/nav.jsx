import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './nav.module.css';

function Nav() {
  return (
      <nav className={styles.nav}>
        <NavLink activeClassName={styles.homeActiv} className={styles.home} to='/home'></NavLink>
        <NavLink activeClassName={styles.petActiv} className={styles.pet} to='/mypets'></NavLink>
        <NavLink activeClassName={styles.accountActiv} className={styles.account} to='/account'></NavLink>
      </nav>
    );
}
  
export default Nav;