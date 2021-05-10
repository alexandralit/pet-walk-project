import React, { useRef, useState, useContext } from 'react';
import styles from './editInfo.module.css';
import Store from '../../../context';
import arrow from './../../../assets/img/icon_arrow.png';
import { useHistory, useParams } from 'react-router-dom';

function EditInfo() {
  const data = useContext(Store);
  const { name } = useParams();
  const history = useHistory();
  const [img, setImg] = useState(null);
  const inputName = useRef('');
  const inputRace = useRef('');
  const inputBirthday = useRef('');
  const imgRef = useRef('');
  const [errorName, setErrorName] = useState(false);
  const [errorRace, setErrorRace] = useState(false);
  const [errorBirthday, setErrorBirthday] = useState(false);

  const petInfo = data.user[0].pets.find(pet => pet.name === name);
  const index = data.user[0].pets.indexOf(petInfo);

  const saveInfo = (event) => {
    event.preventDefault();

    if (inputName.current.value.length >= 2) {
      setErrorName(false);
      if (inputRace.current.value.length >= 2) {
        setErrorRace(false);
        if (inputBirthday.current.value.length !== 0 && Date.parse(inputBirthday.current.value) <= Date.now()) {
          setErrorBirthday(false);

          data.user[0].pets.splice(index, 1);

          if (img) petInfo.img = img;
          petInfo.name = inputName.current.value;
          petInfo.race = inputRace.current.value;
          petInfo.birthday = inputBirthday.current.value;
          data.user[0].pets.push(petInfo)
          
          const filteredArr = data.users.filter(item => item.id !== data.user[0].id);
          data.setUsers([...filteredArr, ...data.user]);
          localStorage.setItem('Users', JSON.stringify([...filteredArr, ...data.user]));
          history.push('/mypets');

        } else {
          setErrorBirthday(true);
        }
      } else {
        setErrorRace(true);
      }
    } else {
      setErrorName(true);
    }
  }

  const deleteInfo = () => {
    const index = data.user[0].pets.indexOf(petInfo);
    data.user[0].pets.splice(index, 1);

    const filteredArr = data.users.filter(item => item.id !== data.user[0].id);
    data.setUsers([...filteredArr, ...data.user]);
    localStorage.setItem('Users', JSON.stringify([...filteredArr, ...data.user]));
    history.push('/mypets');
  }

  const getImage = (event) => {
    setImg(URL.createObjectURL(event.target.files[0]));
    imgRef.current.style.display = 'block';
  }
  
  return (
      <section className={styles.edit}>
        <button className={styles.goBack} onClick={() => history.goBack()}><img src={arrow} alt="button"/></button>

        <h2>Edit pet information</h2>

        <div className={styles.inputWrapper} onChange={getImage}>
          <input type="file" name="file" id="input_file" className="input_file" accept=".jpg, .jpeg, .png" />
          <label htmlFor="input_file"><i className="fa fa-plus"></i></label>
          <img src={img} id="imagePet" ref={imgRef} alt="pet" />
        </div>
       
        <form action="#" onSubmit={saveInfo} className={styles.form} noValidate>
            <p>Name</p>
            <input type="text" placeholder="Name" defaultValue={`${petInfo.name}`} ref={inputName} />

            {errorName && <h5 className={styles.error}>The pet name must contain at least 2 symbols.</h5>}

            <p>Race</p>
            <input type="text" placeholder="Race" defaultValue={`${petInfo.race}`} ref={inputRace} />

            {errorRace && <h5 className={styles.error}>The pet race must contain at least 2 symbols.</h5>}

            <p>Birthday</p>
            <input type="date" placeholder="01.01.2021" defaultValue={`${petInfo.birthday}`} min="2000-01-01" ref={inputBirthday} />

            {errorBirthday && <h5 className={styles.error}>Wrong date selected.</h5>}


            <button className={styles.btn}>Save</button>
        </form>

        <button className={styles.btn} onClick={deleteInfo}>Delete</button>
      </section>
    );
}
  
export default EditInfo;