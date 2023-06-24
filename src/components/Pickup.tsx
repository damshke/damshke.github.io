import * as React from 'react';
import { useState } from 'react';
import '../styles/Pickup.css';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

interface PickupProps {
  points: string[];
}

interface Label {
  id: string;
  address: string;
}

// // to do:
//     нормальное добавление меток;
//     кастомная иконка метки;



const Pickup: React.FC<PickupProps> = ({ points }) => {
  const [selectedPoint, setSelectedPoint] = useState<string>(points[0]);
  const [labels, setLabels] = useState<Label[]>([]); 
  const [newLabelAddress, setNewLabelAddress] = useState<string>('');

  const handlePointSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPoint(event.target.value);
  };

  const handleAddLabel = () => {
    if (newLabelAddress.trim() === '') {
      return;
    }

    const newLabel: Label = {
      id: String(labels.length + 1), 
      address: newLabelAddress,
    };

    setLabels((prevLabels) => [...prevLabels, newLabel]);
    setNewLabelAddress('');
  };

  return (
    <div className="container">
      <div className="radio">
        {points.map((point) => (
          <label key={point} className="radio-label">
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
      <div className="labels">
        {labels.map((label) => (
          <div key={label.id} className="label">
            <input type="radio" value={label.address} checked={selectedPoint === label.address} onChange={handlePointSelection} />
            {label.address}
          </div>
        ))}
      </div>
      <div className="map-container">
        <YMaps>
          <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} options={{ suppressMapOpenBlock: true }}>
            {labels.map((label) => (
              <Placemark key={label.id} geometry={[55.75, 37.57]} options={{ preset: 'islands#blueDotIcon' }} />
            ))}
          </Map>
        </YMaps>
      </div>
      <div className="add-label-container">
        <input
          type="text"
          placeholder="Введите адрес"
          value={newLabelAddress}
          onChange={(e) => setNewLabelAddress(e.target.value)}
        />
        <button className="add-label-button" onClick={handleAddLabel}>
          Добавить метку
        </button>
      </div>
      <button className="enter">Оформить заказ</button>
    </div>
  );
};

export default Pickup;
