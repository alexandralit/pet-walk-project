import React, { useRef, useState, useContext, useEffect } from 'react';
import styles from './addPets.module.css';
import Store from './../../../context';
import uniqid from 'uniqid';
import arrow from './../../../assets/img/icon_arrow.png';
import { useHistory } from 'react-router-dom';

function AddPets() {
  const data = useContext(Store);
  const [type, setType] = useState('dog');
  const [img, setImg] = useState(null);
  const [randomImgDog, setRandomImgDog] = useState(null);
  const [randomImgCat, setRandomImgCat] = useState(null);
  const inputName = useRef('');
  const inputRace = useRef('');
  const inputBirthday = useRef('');
  const imgRef = useRef('');
  const history = useHistory();
  const [errorName, setErrorName] = useState(false);
  const [errorRace, setErrorRace] = useState(false);
  const [errorBirthday, setErrorBirthday] = useState(false);

  useEffect(() => {
    let cleanupFunction = false;
    async function fetchDataDog() {
      let response = await fetch('https://dog.ceo/api/breeds/image/random');
      let result = await response.json()
      if(!cleanupFunction) setRandomImgDog(result.message);
    }

    fetchDataDog();
    return () => cleanupFunction = true;
  }, [randomImgDog]);

  useEffect(() => {
    let cleanupFunction = false;
    async function fetchDataCat() {
      let response = await fetch('https://api.thecatapi.com/v1/images/search', {
        headers: {'x-api-key' : '65189188-623d-4a25-a091-84b04c3cfaf2'}
      });
      let result = await response.json()
      if(!cleanupFunction) setRandomImgCat(result[0].url);
    }

    fetchDataCat();
    return () => cleanupFunction = true;
  }, [randomImgCat]);

  const getInfoPet = (event) => {
    event.preventDefault();

    if (inputName.current.value.length >= 2) {
      setErrorName(false);
      if (inputRace.current.value.length >= 2) {
        setErrorRace(false);
        if (inputBirthday.current.value.length !== 0 && Date.parse(inputBirthday.current.value) <= Date.now()) {
          setErrorBirthday(false);
          if (!img) { 
            if (type === 'dog') {
              data.user[0].pets.push({id: uniqid(), type, img: randomImgDog, name: inputName.current.value, race: inputRace.current.value, birthday: inputBirthday.current.value, stats: {open: false, today: 0}, nowWalk: false, walk: [], mood: 'Sad'});
              setRandomImgDog(null);
            } 
            if (type === 'cat') {
              data.user[0].pets.push({id: uniqid(), type, img: randomImgCat, name: inputName.current.value, race: inputRace.current.value, birthday: inputBirthday.current.value, stats: {open: false, today: 0}, nowWalk: false, walk: [], mood: 'Sad'}); 
              setRandomImgCat(null);
            }
          } else {
            data.user[0].pets.push({id: uniqid(), type, img, name: inputName.current.value, race: inputRace.current.value, birthday: inputBirthday.current.value, stats: {open: false, today: 0}, nowWalk: false, walk: [], mood: 'Sad'}); 
          }
      
            const filteredArr = data.users.filter(item => item.id !== data.user[0].id);
            data.setUsers([...filteredArr, ...data.user]);
            localStorage.setItem('Users', JSON.stringify([...filteredArr, ...data.user]));
      
            setImg(null);
            imgRef.current.style.display = 'none';
            imgRef.current.src = '#';
            inputName.current.value = inputRace.current.value = inputBirthday.current.value = '';
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

  const changeType = (event) => {
    setType(event.target.value);
  }

  const getImage = (event) => {
    if (event.target.files[0]) {
      setImg(URL.createObjectURL(event.target.files[0]));
      imgRef.current.style.display = 'block';
    }
  }
  
  return (
      <section className={styles.addPet}>
        <button className={styles.goBack} onClick={() => history.goBack()}><img src={arrow} alt=""/></button>

        <h2>Add a pet</h2>

        <div className={styles.inputWrapper}>
          <input type="file" name="file" id="input_file" className="input_file" accept=".jpg, .jpeg, .png" onChange={getImage} />
          <label htmlFor="input_file"><i className="fa fa-plus"></i></label>
          <img src={img} id="imagePet" ref={imgRef} alt="pet" />
        </div>

        <div className={styles.type}>
          <p>Type</p>
          <div className="radio_btn" onChange={changeType}>
            <input id="radio-dog" type="radio" name="radio" value="dog" defaultChecked />
            <label htmlFor="radio-dog">Dog</label>

            <input id="radio-cat" type="radio" name="radio" value="cat" />
            <label htmlFor="radio-cat">Cat</label>
          </div>
        </div>

        <form action="#" onSubmit={getInfoPet} className={styles.form} noValidate>
            <p>Name</p>
            <input type="text" placeholder="Name" minLength="2" required ref={inputName} />

            {errorName && <h5 className={styles.error}>The pet name must contain at least 2 symbols.</h5>}

            <p>Race</p>
            <input type="text" placeholder="Race" minLength="2" required ref={inputRace} />

            {errorRace && <h5 className={styles.error}>The pet race must contain at least 2 symbols.</h5>}

            <p>Birthday</p>
            <input type="date" placeholder="01.01.2021" required min="2010-01-01" ref={inputBirthday} />

            {errorBirthday && <h5 className={styles.error}>Wrong date selected.</h5>}

            <button>Add a pet</button>
        </form>
      </section>
    );
}
  
export default AddPets;