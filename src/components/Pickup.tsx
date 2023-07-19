import * as React from 'react';
import { useEffect, useState } from 'react';
import '../styles/Pickup.css';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

// to do:
// предусмотреть любое количество меток
// убрать скролл на тач устройствах
// выровнять радиокнопки

interface PickupProps {
  points: string[];
}

const Pickup: React.FC<PickupProps> = ({ points }) => {

  const [selectedPoint, setSelectedPoint] = useState<string>(points[0]);

  const handlePointSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPoint(event.target.value);
  };

  return (
    <div>
      <div className='radio-buttons'>
        {points.map((point) => (
          <label key={point} className={`radio-label ${selectedPoint === point ? 'selected' : ''}`}>
            <input
              type="radio"
              value={point}
              checked={selectedPoint === point}
              onChange={handlePointSelection}
            />
            {point}
          </label>
        ))}
      </div>
      <div>
        <YMaps>
          <Map defaultState={{ center: [55.997, 37.216], zoom: 15 }} options={{ suppressMapOpenBlock: true }} height="560px" width="952px">
            <Placemark
              geometry={[55.997035, 37.216751]}
              options={{
                iconLayout: 'default#image',
                iconImageHref: 'https://ltdfoto.ru/images/2023/07/19/placemark.png',
                iconImageSize: [33.33, 40],
                iconImageOffset: [-33.33 / 2, -40 / 2],
              }}
            />
            <Placemark
              geometry={[55.995831, 37.220695]}
              options={{
                iconLayout: 'default#image',
                iconImageHref: 'https://ltdfoto.ru/images/2023/07/19/placemark.png',
                iconImageSize: [33.33, 40],
                iconImageOffset: [-33.33 / 2, -40 / 2],
              }}
            />
          </Map>
        </YMaps>
      </div>
      <button className="enter">Оформить заказ</button>
    </div>
  );
};

export default Pickup;
