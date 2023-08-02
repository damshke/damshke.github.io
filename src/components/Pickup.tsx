import * as React from 'react';
import { useEffect, useState } from 'react';
import '../styles/Pickup.css';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

interface PickupProps {
  points: string[];
}

const Pickup: React.FC<PickupProps> = ({ points }) => {

  const [selectedPoint, setSelectedPoint] = useState<string>(points[0]);
  const [mapSize, setMapSize] = useState({ width: '100%', height: '320px' });

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const newWidth = screenWidth >= 1200 ? '100%' : '100%';
      const newHeight = screenWidth >= 320 ? '320px' : '100%';
      setMapSize({ width: newWidth, height: newHeight });
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePointSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPoint(event.target.value);
  };

  return (
    <form>
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
          <Map defaultState={{ center: [55.997, 37.216], zoom: 15 }} options={{ suppressMapOpenBlock: true }} style={{ width: mapSize.width, height: mapSize.height }}>
          {points.map((point, index) => (
              <Placemark
                key={index}
                geometry={[55.997035 + index * 0.001, 37.216751 + index * 0.001]}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref: 'https://ltdfoto.ru/images/2023/07/21/placemark.png',
                  iconImageSize: [33.33, 40],
                  iconImageOffset: [-33.33 / 2, -40 / 2],
                }}
              />
            ))}
          </Map>
        </YMaps>
      </div>
      <div className='button-section'>
        <button className="enter">Оформить заказ</button>
      </div>
    </form>
  );
};

export default Pickup;
