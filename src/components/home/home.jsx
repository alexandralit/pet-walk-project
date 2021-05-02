import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Store from './../../context';
import styles from './home.module.css';
import moment from 'moment';

function Home() {
  const data = useContext(Store);
  const history = useHistory();
  const [unblock, setUnblock] = useState(false);
  const percentage = data.time;
  if (data.time === 0) percentage = 0;

  const openStats = (pet) => {
    setUnblock(!unblock);

    const currentItem = data.user[0].pets.find(item => item.id === pet.id);
  }

  const nowWalk = () => {
    data.user[0].pets.map(pet => pet.nowWalk = true);
    const filteredArr = data.users.filter(item => item.id !== data.user[0].id);
    data.setUsers([...filteredArr, ...data.user]);
    localStorage.setItem('Users', JSON.stringify([...filteredArr, ...data.user]));
  }

  const petSelection = () => {
    history.push('home/petselection');
  }

  return (
      <section className={styles.home}>
        <h2>Home</h2>
        <h3>Dashboard</h3>

        {data.user[0].pets.length === 0 ? <h4 className={styles.text}>Add your pets</h4> : null}

        {data.user[0].pets.map((pet, index) => (
        <div key={index}>
          <div className={styles.petContainer} onClick={petSelection}>
            <img src={pet.img} alt="" />
            <div>
              <p>{pet.race}</p>
              <h4>{pet.name}</h4>
              <p>{moment(pet.birthday).format('DD.MM.YYYY')}</p>
            </div>
            <div className={styles.mood}>
              <div className={styles.points}><div></div><div></div><div></div></div>
              <p>Happy</p>
            </div>
          </div>

        <h3 onClick={() => openStats(pet)}>Stats {unblock ? <i className="fa fa-chevron-down"></i> : <i className="fa fa-chevron-right"></i>}</h3>

        {
        unblock && 

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
              <p>{percentage}% energy</p>
            </div>
            <svg className={styles.progressBar}>
              <circle className={styles.progressBarCircle} cx="40" cy="40" r="20"/>
              <circle className={styles.progressBarCircleEnergy} cx="40" cy="40" r="20" strokeDashoffset={`calc(126 -  (126 * ${percentage}) / 100)`}/>
            </svg>
          </div>

          <div className={styles.plan}>
            <div>
              <h3>Weekly objectives</h3>
              <p>{percentage} walks left</p>
            </div>
            <svg className={styles.progressBar}>
              <circle className={styles.progressBarCircle} cx="40" cy="40" r="20"/>
              <circle className={styles.progressBarCircleObjectives} cx="40" cy="40" r="20" strokeDashoffset={`calc(126 -  (126 * ${percentage}) / 100)`}/>
            </svg>
          </div>
        </div>

        }
        </div>
        ))}

        <Link to='/walk' className={styles.btn} onClick={nowWalk}>Start a walk</Link>
      </section>
    );
}
  
export default Home;