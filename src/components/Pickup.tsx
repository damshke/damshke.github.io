import * as React from 'react';
import { useState } from 'react';
import '../styles/Pickup.css'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';


interface PickupProps {
    points: string[];
}

const Pickup: React.FC<PickupProps> = ({ points }) => {

    const [selectedPoint, setSelectedPoint] = useState<string>(points[0]);

    const handlePointSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPoint(event.target.value);
    };


    return (
        <div className="container">
            <div className="radio">
                {points.map((point) => (
                    <label key={point}>
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
            <YMaps>
                <div className="map-container">
                    <Map
                        defaultState={{ center: [55.75, 37.57], zoom: 9 }}
                        options={{ suppressMapOpenBlock: true }}
                    >
                        {points.map((point) => (
                            <Placemark key={point} geometry={[55.75, 37.57]} options={{ preset: 'islands#redDotIcon' }} />
                        ))}
                    </Map>
                </div>
            </YMaps>
            <button className='enter'>Оформить заказ</button>
        </div >
    );
};

export default Pickup;