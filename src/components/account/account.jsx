import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './account.module.css';
import Store from './../../context';
import defaultUser from './../../assets/img/defaultUser.png';
import { AreaChart, Area, YAxis, CartesianGrid, Tooltip, XAxis } from 'recharts';

function Account() {
  const data = useContext(Store);
  const [chartsData, setChartsData] = useState([]);
  const [openCharts, setOpenCharts] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  const [noWalks, setNoWalks] = useState(false);
  const [width, setWidth] = useState('');
  let name = data.user[0].name[0].toUpperCase();

  const charts = (id) => {
    setShowCharts(true);
    data.user[0].pets.map(pet => delete pet.style);
    const petInfo = data.user[0].pets.find(pet => pet.id === id);

    if (petInfo.walk.length === 0) setNoWalks(true);
    else setNoWalks(false);

    petInfo.style = {opacity: '0.7', transition: 'all 0.5s linear', color: '#1D6CE3'};
    setChartsData(petInfo.walk);
  }

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    return data.user[0].pets.map(pet => delete pet.style);
  });
  
  return (
      <section className={styles.account}>
        <h2>Account</h2>
        <h3>Profil</h3>

        <div className={styles.container}>
          {data.user[0].img ? <img src={data.user[0].img} onError={event => event.target.src = defaultUser} alt='person' /> 
          : <div className={styles.profilImg}><p>{name}</p></div>}
          <h4>{data.user[0].name}</h4>
          <Link to='/account/signout' className={styles.btn}><div></div><div></div><div></div></Link>
        </div>

        <h4 onClick={() => setOpenCharts(!openCharts)} className={styles.history}>My walking history {openCharts ? <i className="fa fa-chevron-down"></i> : <i className="fa fa-chevron-right"></i>}</h4>

        {openCharts &&
        <div className={styles.charts}>

          {data.user[0].pets.length === 0 && <h4 className={styles.text}>Add your pets</h4>}
            
          {data.user[0].pets.map((pet, index) => (
            <p key={index} style={pet.style} onClick={() => charts(pet.id)}>{pet.name}</p>
          ))}

          {showCharts && !noWalks &&
            <div id={styles.areaChart}>
            <AreaChart width={width <= 1024 ? width - 40 : 980} height={200} data={chartsData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1D6CE3" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#1D6CE3" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="time" stroke="#1D6CE3" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart> 
            </div>
          }

          {noWalks && <p id={styles.noWalks}>No walks</p>}
        </div>}
      </section>
    );
}
  
export default Account;