import React, { useEffect, useContext } from 'react';
import styles from './walk.module.css';
import Store from './../../../context';
import { Link } from 'react-router-dom';

function Walk() {
  const data = useContext(Store);

  let timer;
        
  useEffect(() => {
    timer = setInterval(() => {
      data.setSeconds(seconds => seconds + 1);
    }, 1000);
  }, [timer]);

  let seconds = data.seconds;
  let minutes = 0;
  let hours = 0;

  while (seconds >= 60) {
    seconds -= 60;
    minutes += 1;

    while (minutes >= 60) {
      minutes -= 60;
      hours += 1;
    }
  }

  const endWalk = () => {
    data.user[0].pets.map(pet => {
      if (pet.nowWalk) pet.walk.push({date: new Date().toLocaleDateString(), weekDay: new Date().getDay(), time: data.seconds});
    });

    const filteredArr = data.users.filter(item => item.id !== data.user[0].id);
    data.setUsers([...filteredArr, ...data.user]);
    localStorage.setItem('Users', JSON.stringify([...filteredArr, ...data.user]));
    localStorage.setItem('Time', JSON.stringify(data.seconds));
  }

  useEffect(() => {
    return () => {
      data.setSeconds(0);
      timer = clearInterval(timer);
    }
  }, []);

  return (
      <section className={styles.walk}>
        <h2>Walk</h2>

        <div className={styles.petContainer}>
        {data.user[0].pets.map((pet, index) => (
          pet.nowWalk && <img src={pet.img} alt="" key={index} />
        ))}
        </div>

        <div className={styles.infoMap}>
          <h3>{hours} h {minutes} min {seconds} s</h3>
          <p>Walking time</p>
        </div>

        <Link to='/walk/endWalk' onClick={endWalk} className={styles.btn}>End the walk</Link>
        
      </section>
    );
}
  
export default Walk;