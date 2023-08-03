import * as React from 'react';
import { useState } from 'react';
import Pickup from './Pickup';
import Delivery from './Delivery';
import '../styles/Tabs.css';

enum Tab {
  Delivery = 'Доставка',
  Pickup = 'Самовывоз',
}

interface Point {
  name: string;
  coordinates: [number, number]; 
}

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Delivery);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
  };

  const points: Point[] = [
    { name: 'Пункт выдачи заказов жилой комплекс Жемчужина Зеленограда', coordinates: [55.968121, 37.152640] },
    { name: 'Пункт выдачи заказов 14 микрорайон', coordinates: [55.989658, 37.154159] },
    { name: 'Пункт выдачи заказов к355А', coordinates: [55.994083, 37.224617] },
    { name: 'Пункт выдачи заказов к317Ас1', coordinates: [55.997035, 37.216751] },
  ];


  return (
    <div className='container'>
      <h1>Выберите способ доставки</h1>

      <nav>
        <button onClick={() => handleTabClick(Tab.Delivery)} className={activeTab === Tab.Delivery ? 'active' : 'non-active'}>
          Доставка
        </button>
        <button onClick={() => handleTabClick(Tab.Pickup)} className={activeTab === Tab.Pickup ? 'active' : 'non-active'}>
          Самовывоз
        </button>
      </nav>

      <div className='content-container'>
        {activeTab === Tab.Delivery && <Delivery />}
        {activeTab === Tab.Pickup && <Pickup points={points} />}
      </div>
    </div>
  );
};

export default Tabs;
