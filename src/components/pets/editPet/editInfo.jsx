import React, { useRef, useState, useContext } from 'react';
import styles from './editInfo.module.css';
import Store from '../../../context';
import arrow from './../../../assets/img/icon_arrow.png';
import { useHistory, useParams } from 'react-router-dom';

function EditInfo() {
  const data = useContext(Store);
  const { name } = useParams();
  const history = useHistory();
  const [type, setType] = useState('dog');
  const [img, setImg] = useState(null);
  const inputName = useRef('');
  const inputRace = useRef('');
  const inputBirthday = useRef('');
  //console.log(name);

  const petInfo = data.user[0].pets.filter(pet => pet.name === name);
  //console.log(pet);

  const saveInfo = (event) => {
    event.preventDefault();
    //data.setPets(prevState => prevState.filter(el => el.name !== name));
    
    //history.push('mypets');
    //console.log(newArrayPets);
  }

  const deleteInfo = (event) => {
    //data.setPets([...data.pets, {user: data.id, id: data.pets.length, type, img, name: inputName.current.value, race: inputRace.current.value, birthday: inputBirthday.current.value}]);
    //localStorage.setItem('Pets', JSON.stringify([...data.pets, {user: data.id, id: data.pets.length, type, img, name: inputName.current.value, race: inputRace.current.value, birthday: inputBirthday.current.value}]));
    //const user = data.user[0].filter(pet => pet.name !== name);
    data.user[0].map(item => {
      item.pets.filter(pet => pet.id !== petInfo[0].id);
    })
    //data.user[0].pets.filter(pet => pet.id !== petInfo[0].id);
    const filteredArr = data.users.filter(item => item.id !== data.user[0].id);
    data.setUsers([...filteredArr, ...data.user]);
    localStorage.setItem('Users', JSON.stringify([...filteredArr, ...data.user]));
    //history.push('mypets');
    //console.log(user);
  }

  const getImage = (event) => {
    const img = document.getElementById("imagePet");
    img.src = URL.createObjectURL(event.target.files[0]);
    img.style.display = "block";
    setImg(URL.createObjectURL(event.target.files[0]));
  }
  
  return (
      <section className={styles.edit}>
        <button className={styles.goBack} onClick={() => history.goBack()}><img src={arrow} alt=""/></button>

        <h2>Edit pet information</h2>

        <div className={styles.inputWrapper} onChange={getImage}>
          <input type="file" name="file" id="input_file" className="input_file" accept=".jpg, .jpeg, .png" />
          <label htmlFor="input_file"><i className="fa fa-plus"></i></label>
          <img src="#" id="imagePet" />
        </div>
       
        <form action="#" onSubmit={saveInfo} className={styles.form}>
            <p>Name</p>
            <input type="text" placeholder="Name" defaultValue={`${petInfo[0].name}`} ref={inputName} />

            <p>Race</p>
            <input type="text" placeholder="Race" defaultValue={`${petInfo[0].race}`} ref={inputRace} />

            <p>Birthday</p>
            <input type="date" placeholder="01.01.2021" defaultValue={`${petInfo[0].birthday}`} min="2000-01-01" ref={inputBirthday} />

            <button className={styles.btn}>Save</button>
        </form>

          <button className={styles.btn} onClick={deleteInfo}>Delete</button>
      </section>
    );
}
  
export default EditInfo;