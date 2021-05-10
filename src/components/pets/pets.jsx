import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Store from './../../context';
import styles from './pets.module.css';
import plus from './../../assets/img/plus.png';
import arrow from './../../assets/img/Arrow.png';
import moment from 'moment';

function Pets() {
  const data = useContext(Store);

  return (
      <section className={styles.pet}>
        <h2>My pets</h2>

        {data.user[0].pets.length === 0 ? <h4 className={styles.text}>Add your pets</h4> : null}

        {data.user[0].pets.find(pet => pet.type === 'dog') ? <h3>Dogs</h3> : null}

        {data.user[0].pets.map((pet, index) => (
          <div key={index}>
            {pet.type === 'dog' && 
              <div className={styles.petContainer}>
                <div className={styles.photo}><img src={pet.img} alt="pet" /></div>
                <div>
                  <p>{pet.race}</p>
                  <h4>{pet.name}</h4>
                  <p>{moment(pet.birthday).format('DD.MM.YYYY')}</p>
                </div>
                <Link to={`/mypets/${pet.name}`}><img src={arrow} alt="button"/></Link>
              </div>
            }
          </div>
        ))}

        {data.user[0].pets.find(pet => pet.type === 'cat') ? <h3>Cats</h3> : null}

        {data.user[0].pets.map((pet, index) => (
          <div key={index}>
            {pet.type === 'cat' && 
              <div className={styles.petContainer}>
                <div className={styles.photo}><img src={pet.img} alt="pet" /></div>
                <div>
                  <p>{pet.race}</p>
                  <h4>{pet.name}</h4>
                  <p>{moment(pet.birthday).format('DD.MM.YYYY')}</p>
                </div>
                <Link to={`/mypets/${pet.name}`}><img src={arrow} alt="button"/></Link>
              </div>
            }
          </div>
        ))}
      
        <Link to='/mypets/addpets'><img src={plus} alt="button" className={styles.add} /></Link>
      </section>
    );
}
  
export default Pets;