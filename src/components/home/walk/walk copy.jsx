import React, { useRef, useState } from 'react';
import styles from './walk.module.css';
import { YMaps, Map, Placemark, SearchControl } from 'react-yandex-maps';
import { usePosition } from 'use-position';
import marker from './../../../assets/img/Position.png';

function Walk() {
  

  const watch = true;
  const {
    latitude,
    longitude,
    speed,
    timestamp,
    accuracy,
    error,
  } = usePosition(watch, {enableHighAccuracy: true});

  const mapData = {
    center: [latitude, longitude],
    zoom: 14,
  };

  const coordinatesDefault = {
    center: [53.902284, 27.561831],
    zoom: 5,
  };

  const coordinates = [
    [latitude, longitude],
  ];

  const mapOptions = {
    iconLayout: 'default#image',
    iconImageHref: marker,
    iconImageSize: [200, 200],
    iconImageOffset: [-100, -120]
  };

  const [ymaps, setYmaps] = useState(null);
  // Завел для хранения маршрута переменную(аналогия переменной класса в стэйтлесс компоненте)
  const routes = useRef(null);

  const searchRef = useRef(null);
  

  // В данном случае строим маршрут сразу, но можно изменить и строить по клику на кнопку
  const getRoute = ref => {
    if (ymaps) {
      const multiRoute = new ymaps.multiRouter.MultiRoute(
        {
          // Описание опорных точек мультимаршрута.
          referencePoints: [[latitude, longitude], "Минск, ул. 50 лет Победы",
          [latitude, longitude], "Минск, ул. Садовая 10",],
          // Параметры маршрутизации.
          params: {
            // Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
            results: 1
          }
        },
        {
          // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
          boundsAutoApply: true,
          // Внешний вид линии маршрута.
          routeActiveStrokeWidth: 6,
          routeActiveStrokeColor: "#fa6600"
        }
      );

     // Кладем полученный маршрут в переменную
      routes.current = multiRoute;
      ref.geoObjects.add(multiRoute);
    }
  };

  const getRoutes = () => {
    // Теперь в этой переменной можем получить инстанс маршрута
    console.log(routes.current.getWayPoints());
  };

  //const [position, setPosition] = useState([]);

  return (
      <section className={styles.walk}>
        <h2>Walk</h2>

        latitude: {latitude}<br/>
        longitude: {longitude}<br/>

        <div className={styles.map}></div>
        <YMaps query={{apikey: '387dd1ae-c6ad-46a5-aa9b-d9f61cb40dbf' }}>
          <Map defaultState={coordinatesDefault} state={mapData} setPosition={mapData.center} className={styles.mapSize} modules={["multiRouter.MultiRoute"]}
          onLoad={ymaps => setYmaps(ymaps)}
          state={mapData}
          instanceRef={ref => ref && getRoute(ref)}>
            <SearchControl instanceRef={ref => {
              if (ref) searchRef.current = ref;
            }} onClick={console.log(searchRef.current)}/>
            {coordinates.map((coordinate, index) => (
              <Placemark key={index} geometry={coordinate} options={mapOptions} />
            ))}
            
          </Map>
        </YMaps>
      </section>
    );
}
  
export default Walk;