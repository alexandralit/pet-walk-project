import React, { useContext } from 'react';
import styles from './walk.module.css';
import { Link } from 'react-router-dom';
import Store from './../../../context';

function EndWalk() {
  const data = useContext(Store);
  const time = JSON.parse(localStorage.getItem('Time'));
  let percentage = Math.round(100 * time / 1800);
  let counterWalks = 0;

  const nowWalk = () => {
    data.user[0].pets.map(pet => pet.nowWalk = false);
    const filteredArr = data.users.filter(item => item.id !== data.user[0].id);
    data.setUsers([...filteredArr, ...data.user]);
    localStorage.setItem('Users', JSON.stringify([...filteredArr, ...data.user]));
  }

  return (
      <section className={styles.walk}>
       <h2>End walk</h2>

      <div className={styles.petContainer}>
        {data.user[0].pets.map((pet, index) => (
          pet.nowWalk && <img src={pet.img} alt="" key={index} />
        ))}
      </div>

        <div className={styles.statsContainer}>
          <div className={styles.plan}>
            <div>
              <h3>Today’s plan</h3>
              <p>{percentage}% accomplished</p>
            </div>
            <svg className={styles.progressBar}>
              <circle className={styles.progressBarCircle} cx="40" cy="40" r="20"/>
              <circle className={styles.progressBarCirclePlan} cx="40" cy="40" r="20" strokeDashoffset={`calc(126 -  (126 * ${percentage}) / 100)`}/>
            </svg>
          </div>

          <div className={styles.plan}>
            <div>
              <h3>Energy available</h3>
              <p>{100 - percentage}% energy</p>
            </div>
            <svg className={styles.progressBar}>
              <circle className={styles.progressBarCircle} cx="40" cy="40" r="20"/>
              <circle className={styles.progressBarCircleEnergy} cx="40" cy="40" r="20" strokeDashoffset={`calc(126 -  (126 * ${100 - percentage}) / 100)`}/>
            </svg>
          </div>

          <div className={styles.plan}>
            <div>
              <h3>Weekly objectives</h3>
              <p>{14 - percentage} walks left</p>
            </div>
            <svg className={styles.progressBar}>
              <circle className={styles.progressBarCircle} cx="40" cy="40" r="20"/>
              <circle className={styles.progressBarCircleObjectives} cx="40" cy="40" r="20" strokeDashoffset={`calc(126 -  (126 * ${14 - counterWalks}) / 100)`}/>
            </svg>
          </div>
        </div>

        <Link to='/home' className={styles.btn} onClick={nowWalk}>Go back to dashboard</Link>
        
      </section>
    );
}
  
export default EndWalk;