import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Store from './../../context';
import styles from './home.module.css';
import moment from 'moment';
import defaultPet from './../../assets/img/defaultPet.png';
import imgDoneBl from './../../assets/img/done_bl.png';
import imgDone from './../../assets/img/done.png';

function Home() {
  const data = useContext(Store);
  const history = useHistory();
  const [unblock, setUnblock] = useState(false);

  const openStats = (pet) => {
    setUnblock(!unblock);
    const currentItem = data.user[0].pets.find(item => item.id === pet.id);
    currentItem.stats.open = !currentItem.stats.open;
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

        {data.user[0].pets.length === 0 && <h4 className={styles.text}>Add your pets</h4>}

        {data.user[0].pets.map((pet, index) => (
        <div key={index}>
          <div className={styles.petContainer} onClick={petSelection}>
            <img src={pet.img} alt="pet" onError={event => event.target.src = defaultPet} />
            <div>
              <p>{pet.race}</p>
              <h4>{pet.name}</h4>
              <p>{moment(pet.birthday).format('DD.MM.YYYY')}</p>
            </div>
            <div className={styles.mood}>
              {pet.mood === 'Sad' && 
                <div className={styles.points1}><div></div><div></div><div></div></div>
              }
              {pet.mood === 'Normal' && 
                <div className={styles.points2}><div></div><div></div><div></div></div>
              }
              {pet.mood === 'Happy' && 
                <div className={styles.points3}><div></div><div></div><div></div></div>
              }
              <p>{pet.mood}</p>
            </div>
          </div>

        <h3 onClick={() => openStats(pet)}>Stats {pet.stats.open ? <i className="fa fa-chevron-down"></i> : <i className="fa fa-chevron-right"></i>}</h3>

        {pet.stats.open && 

        <div className={styles.statsContainer}>
          <div className={styles.plan}>
            <div>
              <h3>Today’s plan</h3>
              <p>{pet.stats.today >= 100 ? pet.stats.today = 100 : pet.stats.today}% accomplished</p>
            </div>
            {pet.stats.today < 100 ? 
              <svg className={styles.progressBar}>
                <circle className={styles.progressBarCircle} cx="40" cy="40" r="20"/>
                <circle className={styles.progressBarCirclePlan} cx="40" cy="40" r="20" strokeDashoffset={`calc(126 -  (126 * ${pet.stats.today >= 100 ? pet.stats.today = 100 : pet.stats.today}) / 100)`}/>
              </svg>
            : <img src={imgDoneBl} alt='done' />}
          </div>

          <div className={styles.plan}>
            <div>
              <h3>Energy available</h3>
              <p>{100 - (pet.stats.today >= 100 ? pet.stats.today = 100 : pet.stats.today)}% energy</p>
            </div>
            {pet.stats.today < 100 ? 
              <svg className={styles.progressBar}>
                <circle className={styles.progressBarCircle} cx="40" cy="40" r="20"/>
                <circle className={styles.progressBarCircleEnergy} cx="40" cy="40" r="20" strokeDashoffset={`calc(126 -  (126 * ${100 - (pet.stats.today >= 100 ? pet.stats.today = 100 : pet.stats.today)}) / 100)`}/>
              </svg>
              : <img src={imgDone} alt='done' />}
          </div>
        </div>
        }
        </div>
        ))}

        {data.user[0].pets.length > 0 && <Link to='/walk' className={styles.btn} onClick={nowWalk}>Start a walk</Link>}
        
      </section>
    );
}
  
export default Home;