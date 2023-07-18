import * as React from 'react';
import { useEffect, useState } from 'react';
import '../styles/Pickup.css';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';


interface PickupProps {
  points: string[];
}

const Pickup: React.FC<PickupProps> = () => {


  return (
    <div>
      <div>
        <YMaps>
          <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} options={{ suppressMapOpenBlock: true }} height="560px" width="952px">
            <Placemark
              geometry={[55.75, 37.57]}
              options={{
                iconLayout: 'default#image',
                
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
