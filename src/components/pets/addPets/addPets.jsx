import React, { useRef, useState, useContext } from 'react';
import styles from './addPets.module.css';
import Store from './../../../context';
import arrow from './../../../assets/img/icon_arrow.png';
import { useHistory } from 'react-router-dom';

function AddPets() {
  const data = useContext(Store);
  const [type, setType] = useState('dog');
  const [img, setImg] = useState(null);
  const inputName = useRef('');
  const inputRace = useRef('');
  const inputBirthday = useRef('');
  const imgRef = useRef('');
  const history = useHistory();

  const getInfoPet = (event) => {
    event.preventDefault();

    if (!img) {

      setImg()
    }

    data.user[0].pets.push({id: data.user[0].pets.length, type, img, name: inputName.current.value, race: inputRace.current.value, birthday: inputBirthday.current.value, stats: {open: false, today: 0}, nowWalk: false, walk: [], mood: 'Sad'});

    const filteredArr = data.users.filter(item => item.id !== data.user[0].id);
    data.setUsers([...filteredArr, ...data.user]);
    localStorage.setItem('Users', JSON.stringify([...filteredArr, ...data.user]));

    document.getElementById("imagePet").src = '#';
    document.getElementById("imagePet").style.display = 'none';
    inputName.current.value = inputRace.current.value = inputBirthday.current.value = '';
  }

  const changeType = (event) => {
    setType(event.target.value)
  }

  const getImage = (event) => {
    const img = document.getElementById("imagePet");
    img.src = URL.createObjectURL(event.target.files[0]);
    img.style.display = "block";
    setImg(URL.createObjectURL(event.target.files[0]));
  }
  
  return (
      <section className={styles.addPet}>
        <button className={styles.goBack} onClick={() => history.goBack()}><img src={arrow} alt=""/></button>

        <h2>Add a pet</h2>

        <div className={styles.inputWrapper} onChange={getImage}>
          <input type="file" name="file" id="input_file" className="input_file" accept=".jpg, .jpeg, .png" />
          <label htmlFor="input_file"><i className="fa fa-plus"></i></label>
          <img src="#" id="imagePet" ref={imgRef} />
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

        <form action="#" onSubmit={getInfoPet} className={styles.form}>
            <p>Name</p>
            <input type="text" placeholder="Name" required ref={inputName} />

            <p>Race</p>
            <input type="text" placeholder="Race" required ref={inputRace} />

            <p>Birthday</p>
            <input type="date" placeholder="01.01.2021" required min="2000-01-01" ref={inputBirthday} />

            <button>Add a pet</button>
        </form>
      </section>
    );
}
  
export default AddPets;