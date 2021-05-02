import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Store from './../../context';
import styles from './pets.module.css';
import plus from './../../assets/img/plus.png';
import arrow from './../../assets/img/Arrow.png';
import moment from 'moment';


function Pets() {
  const data = useContext(Store);

  //const userPets = data.pets.filter();
  //useMemo

  const petСhange = (index, pet) => {
    /*if (data.petsToHome.length > 0) {
      data.petsToHome.map(item => {
        if (item.id !== index) {
          data.setPetsToHome([...data.petsToHome, pet]);
          localStorage.setItem('PetsToHome', JSON.stringify([...data.petsToHome, pet]));
        }
      });
    } else {}*/
    //data.setPetsToHome([...data.petsToHome, pet]);
    //localStorage.setItem('PetsToHome', JSON.stringify([...data.petsToHome, pet]));
    
  }

  console.log(data.user[0].pets.length);

  return (
      <section className={styles.pet}>
        <h2>My pets</h2>

        {data.user[0].pets.length === 0 ? <h4 className={styles.text}>Add your pets</h4> : null}

        {data.user[0].pets.map((pet, index) => (
          <div key={index}>
            {pet.type.dog === 'dog' ? <h3>Dogs</h3> : null }
            {pet.type.cat === 'cat' ? <h3>Cats</h3> : null }
            <div className={styles.petContainer}>
              <span className={styles.photo}><img src={pet.img} alt="" /></span>
              <div>
                <p>{pet.race}</p>
                <h4>{pet.name}</h4>
                <p>{moment(pet.birthday).format('DD.MM.YYYY')}</p>
              </div>
              <Link to={`/mypets/${pet.name}`}><img src={arrow} alt=""/></Link>
            </div>
          </div>
        ))}
      
        <Link to='/mypets/addpets'><img src={plus} alt="" className={styles.add} /></Link>
      </section>
    );
}
  
export default Pets;