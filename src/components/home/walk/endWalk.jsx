import React, { useContext } from 'react';
import styles from './walk.module.css';
import { Link } from 'react-router-dom';
import Store from './../../../context';
import defaultPet from './../../../assets/img/defaultPet.png';
import imgDoneBl from './../../../assets/img/done_bl.png';
import imgDone from './../../../assets/img/done.png';

function EndWalk() {
  const data = useContext(Store);
  const time = JSON.parse(localStorage.getItem('Time'));

  let percentage = Math.round(100 * time / 3600);

  const nowWalk = () => {
    data.user[0].pets.forEach(pet => {
      if (pet.nowWalk === true) {
        pet.nowWalk = false;
        let timeWalk = 0;
        pet.walk.forEach(walk => {
          if (walk.date === new Date().toLocaleDateString()) {
            timeWalk += walk.time;
          }
        });
        pet.stats.today = Math.round(100 * timeWalk / 60);

        if (pet.stats.today >= 0 && pet.stats.today < 32) pet.mood = 'Sad';
        if (pet.stats.today >= 32 && pet.stats.today <= 66) pet.mood = 'Normal';
        if (pet.stats.today > 66) pet.mood = 'Happy';
      }
    });
    const filteredArr = data.users.filter(item => item.id !== data.user[0].id);
    data.setUsers([...filteredArr, ...data.user]);
    localStorage.setItem('Users', JSON.stringify([...filteredArr, ...data.user]));
  }

  return (
      <section className={styles.walk}>
        {percentage >= 100 && <div className={styles.done}></div>}
       <h2>End walk</h2>

      <div className={styles.petContainer}>
        {data.user[0].pets.map((pet, index) => (
          pet.nowWalk && <img src={pet.img} alt="pet" onError={event => event.target.src = defaultPet} key={index} />
        ))}
      </div>

        <div className={styles.statsContainer}>
          <div className={styles.plan}>
            <div>
              <h3>Сompleted plan for a walk</h3>
              <p>{percentage >= 100 ? percentage = 100 : percentage}% accomplished</p>
            </div>
            {percentage < 100 ? 
              <svg className={styles.progressBar}>
                <circle className={styles.progressBarCircle} cx="40" cy="40" r="20"/>
                <circle className={styles.progressBarCirclePlan} cx="40" cy="40" r="20" strokeDashoffset={`calc(126 -  (126 * ${percentage >= 100 ? percentage = 100 : percentage}) / 100)`}/>
              </svg>
            : <img src={imgDoneBl} alt='done' />}
          </div>
          

          <div className={styles.plan}>
            <div>
              <h3>Energy available</h3>
              <p>{100 - (percentage >= 100 ? percentage = 100 : percentage)}% energy</p>
            </div>
            {percentage < 100 ?
              <svg className={styles.progressBar}>
                <circle className={styles.progressBarCircle} cx="40" cy="40" r="20"/>
                <circle className={styles.progressBarCircleEnergy} cx="40" cy="40" r="20" strokeDashoffset={`calc(126 -  (126 * ${100 - (percentage >= 100 ? percentage = 100 : percentage)}) / 100)`}/>
              </svg>
            : <img src={imgDone} alt='done' />}
          </div>
        </div>

        <Link to='/home' className={styles.btn} onClick={nowWalk}>Go back to dashboard</Link>
      </section>
    );
}
  
export default EndWalk;