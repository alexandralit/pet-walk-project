import React, { useEffect, useRef, useContext, useState } from 'react';
import styles from './walk.module.css';
import Store from './../../../context';
import { Link } from 'react-router-dom';
import defaultPet from './../../../assets/img/defaultPet.png';

function Walk() {
  const data = useContext(Store);
  const [seconds, setSeconds] = useState(0);
  const timer = useRef(null);
        
  useEffect(() => {
    timer.current = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
  }, [timer]);

  let sec = seconds;
  let minutes = 0;
  let hours = 0;

  while (sec >= 60) {
    sec -= 60;
    minutes += 1;

    while (minutes >= 60) {
      minutes -= 60;
      hours += 1;
    }
  }

  const endWalk = () => {
    let time = Math.round(seconds / 60)
    data.user[0].pets.map(pet => pet.nowWalk && pet.walk.push({date: new Date().toLocaleDateString(), weekDay: new Date().getDay(), time: time}));

    const filteredArr = data.users.filter(item => item.id !== data.user[0].id);
    data.setUsers([...filteredArr, ...data.user]);
    localStorage.setItem('Users', JSON.stringify([...filteredArr, ...data.user]));
    localStorage.setItem('Time', JSON.stringify(seconds));
  }

  useEffect(() => {
    return () => {
      setSeconds(0);
      timer.current = clearInterval(timer.current);
    }
  }, []);

  return (
      <section className={styles.walk}>
        <h2>Walk</h2>

        <div className={styles.petContainer}>
        {data.user[0].pets.map((pet, index) => (
          pet.nowWalk && <img src={pet.img} alt="pet" onError={event => event.target.src = defaultPet} key={index} />
        ))}
        </div>

        <div className={styles.info}>
          <h3>{hours} h {minutes} min {sec} s</h3>
          <p>Walking time</p>
        </div>

        <Link to='/walk/endWalk' onClick={endWalk} className={styles.btn}>End the walk</Link>
        
      </section>
    );
}
  
export default Walk;