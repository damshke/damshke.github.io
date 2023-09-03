import React, { useEffect, useState, useRef } from 'react';
import '../styles/Pickup.css';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
/* @ts-ignore next-line */
import Icon from "../pin.svg"

interface Point {
  name: string;
  coordinates: [number, number];
}

interface Point {
  name: string;
  coordinates: [number, number]; 
}

const points: Point[] = [
  { name: 'Пункт выдачи заказов жилой комплекс Жемчужина Зеленограда', coordinates: [55.968121, 37.152640] },
  { name: 'Пункт выдачи заказов 14 микрорайон', coordinates: [55.989658, 37.154159] },
  { name: 'Пункт выдачи заказов к355А', coordinates: [55.994083, 37.224617] },
];

const Pickup: React.FC = () => {

  const [selectedPoint, setSelectedPoint] = useState<Point>(points[0]);
  const [isMapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<ymaps.Map | undefined>(undefined);

  useEffect(() => {
    if (mapRef.current && isMapLoaded && points.length > 0) {
      const bounds = points.reduce(
        (accumulator, point) => {
          const [lat, lon] = point.coordinates;
          return [
            [Math.min(accumulator[0][0], lat), Math.min(accumulator[0][1], lon)],
            [Math.max(accumulator[1][0], lat), Math.max(accumulator[1][1], lon)],
          ];
        },
        [[Infinity, Infinity], [-Infinity, -Infinity]]
      );

      const map = mapRef.current;
      map.setBounds(bounds, {
        checkZoomRange: true,
        zoomMargin: [40],
      });
    }
  }, [isMapLoaded]);

  const handlePointSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPointName = event.target.value;
    const selectedPoint = points.find((point) => point.name === selectedPointName);
    if (selectedPoint) {
      setSelectedPoint(selectedPoint);
    }
  };

  return (
    <form>
      <div className='radio-buttons'>
        {points.map((point) => (
          <label key={point.name} className={`radio-label ${selectedPoint.name === point.name ? 'selected' : ''}`}>
            <input
              type='radio'
              value={point.name}
              checked={selectedPoint.name === point.name}
              onChange={handlePointSelection}
            />
            {point.name}
          </label>
        ))}
      </div>
      <div>
        <YMaps>
          <Map
            instanceRef={mapRef}
            defaultState={{ center: selectedPoint.coordinates, zoom: 15 }}
            behavior={{ drag: false }}
            options={{ suppressMapOpenBlock: true,  }}
            style={{ width: '100%', height: '320px' }}
            onLoad={() => setMapLoaded(true)}
          >
            {points.map((point) => (
              <Placemark
                key={point.name}
                geometry={point.coordinates}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref: Icon,
                  iconImageSize: [33.33, 40],
                  iconImageOffset: [-33.33 / 2, -40 / 2],
                }}
              />
            ))}
          </Map>
        </YMaps>
      </div>
      <div className='button-section'>
        <button className='enter'>Оформить заказ</button>
      </div>
    </form>
  );
};

export default Pickup;