import React, { useContext, useState } from 'react';
import styles from './petSelection.module.css';
import Store from './../../../context';
import arrow from './../../../assets/img/icon_arrow.png';
import { Link, useHistory } from 'react-router-dom';

function PetSelection() {
  const data = useContext(Store);
  const history = useHistory();
  const [error, setError] = useState(false);

  const selection = (pet) => {
    setError(false);
    const currentItem = data.user[0].pets.find(item => item.id === pet.id);
    
    if (currentItem.nowWalk) {
      currentItem.style = {opacity: '1', transition: 'all 0.5s linear'};
      currentItem.nowWalk = false;
    }
    else {
      currentItem.style = {opacity: '0.5', transition: 'all 0.5s linear'};
      currentItem.nowWalk = true;
    }
    
    const filteredArr = data.users.filter(item => item.id !== data.user[0].id);
    data.setUsers([...filteredArr, ...data.user]);
    localStorage.setItem('Users', JSON.stringify([...filteredArr, ...data.user]));
  }

  const deleteStyle = (event) => {
    if (!data.user[0].pets.find(item => item.nowWalk === true)) {
      event.preventDefault();
      setError(true);
    }
    else {
      data.user[0].pets.map(item => item.style && delete item.style);
      const filteredArr = data.users.filter(item => item.id !== data.user[0].id);
      data.setUsers([...filteredArr, ...data.user]);
      localStorage.setItem('Users', JSON.stringify([...filteredArr, ...data.user]));
    }
  }
  
  return (
      <section className={styles.petSelection}>
        <button className={styles.goBack} onClick={() => history.goBack()}><img src={arrow} alt=""/></button>

        <h3>Pet selection</h3>

        {error && <p className={styles.error}>Choose a pet</p>}

        <div className={styles.container}>
          {data.user[0].pets.map((pet, index) => (
            <div key={index} className={styles.pet}>
              <div onClick={() => selection(pet)} style={pet.style}><img src={pet.img} alt='' /></div>
              <h4>{pet.name}</h4>
            </div>
          ))}
        </div>
        
        <Link to='/walk' onClick={deleteStyle} className={styles.btn}>Start a walk</Link>
      </section>
    );
}
  
export default PetSelection;