import React, { useRef, useState, useContext } from 'react';
import styles from './walk.module.css';
import Store from '../../../context';
import { YMaps, Map, Placemark, SearchControl } from 'react-yandex-maps';
import { usePosition } from 'use-position';
import marker from './../../../assets/img/Position.png';

function MapWalk() {
  const data = useContext(Store);
  const watch = true;
  const {
    latitude,
    longitude,
    speed,
    timestamp,
    accuracy,
    error,
  } = usePosition(watch, {enableHighAccuracy: true});

  const [ymaps, setYmaps] = useState(null);
  const routes = useRef(null);
  const searchRef = useRef(null);

  const mapData = {
    center: [latitude, longitude],
    zoom: 14,
    //controls: ['routeButtonControl'],
  };

  const mapOptions = {
    iconLayout: 'default#image',
    iconImageHref: marker,
    iconImageSize: [200, 200],
    iconImageOffset: [-100, -120]
  };

  const getRoute = ref => {
    if (ymaps) {
      ymaps.ready(['Map', 'control.SearchControl']).then(function() {
        var map = new ymaps.Map('map',
          { center: [55.57, 37.62], zoom: 9, controls: ['searchControl'] },
          { searchControlProvider: 'yandex#search' });
        
        map.controls.get('searchControl').events.add('clear', function() {
          alert('clear');
        });
      }).catch(console.error);
      const multiRoute = new ymaps.multiRouter.MultiRoute(
        {
          referencePoints: [[latitude, longitude], "Минск, ул. 50 лет Победы",
                            [latitude, longitude], "Минск, ул. Садовая 10"],
          params: { 
            routingMode: 'pedestrian',
            results: 1
          },
          controls: ['routePanel']
        },
        {
          boundsAutoApply: true, // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком
          activeRouteAutoSelection: true,
          wayPointStart: marker,
          routeActiveStrokeWidth: 4, // Внешний вид линии маршрута.
          routeActiveStrokeColor: "#1D6CE3",
          routeActivePedestrianSegmentStrokeStyle: "solid",
          routeActivePedestrianSegmentStrokeColor: "#1D6CE3",
          wayPointStartIconColor: "#FFFFFF",
          wayPointStartIconFillColor: "#B3B3B3",
        }
      );
      multiRoute.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = multiRoute.getActiveRoute();
        // Получение коллекции путей активного маршрута.
        var activeRoutePaths = activeRoute.getPaths();
        // Проход по коллекции путей.
        activeRoutePaths.each(function(path) {
            //data.setInfo({distance: path.properties.get("distance").text, time: path.properties.get("duration").text, objective: 0});
            localStorage.setItem('Info', JSON.stringify([...data.info, {distance: path.properties.get("distance").text, time: path.properties.get("duration").text}]));
            localStorage.setItem('Path', JSON.stringify([{distance: path.properties.get("distance").text, time: path.properties.get("duration").text}]));
            console.log("Длина пути: " + path.properties.get("distance").text);
            console.log("Время прохождения пути: " + path.properties.get("duration").text);
        });
    });

      routes.current = multiRoute;
      ref.geoObjects.add(multiRoute);
    }
  };
  console.log(routes.current);

  return (
        <YMaps query={{apikey: '387dd1ae-c6ad-46a5-aa9b-d9f61cb40dbf' }}>
          <Map state={mapData} setPosition={mapData.center} className={styles.mapSize} modules={["multiRouter.MultiRoute"]}
          onLoad={ymaps => setYmaps(ymaps)}
          state={mapData}
          instanceRef={ref => ref && getRoute(ref)}>
            <SearchControl instanceRef={ref => {
              if (ref) searchRef.current = ref;
            }}  onChange={console.log(searchRef.current)}/>
         
              <Placemark geometry={[latitude, longitude]} options={mapOptions} />
          </Map>
        </YMaps>
    );
}
  
export default MapWalk;