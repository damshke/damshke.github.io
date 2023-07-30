import * as React from 'react';
import { useState } from 'react';
import Pickup from './Pickup';
import Delivery from './Delivery';
import '../styles/Tabs.css'

enum Tab {
    Delivery = 'Доставка',
    Pickup = 'Самовывоз'
}

const Tabs: React.FC = () => {

    const [activeTab, setActiveTab] = useState<Tab>(Tab.Delivery);

    const handleTabClick = (tab: Tab) => {
        setActiveTab(tab);
    }

    const points = ['Пункт выдачи заказов к317Ас1', 'Пункт выдачи заказов к331'];

    return (
        <div className='container'>
            <h1>Выберите способ доставки</h1>

            <nav>
                <button onClick={() => handleTabClick(Tab.Delivery)} className={activeTab === Tab.Delivery ? 'active' : 'non-active'}>Доставка</button>
                <button onClick={() => handleTabClick(Tab.Pickup)} className={activeTab === Tab.Pickup ? 'active' : 'non-active'}>Самовывоз</button>
            </nav>

            <div className='content-container'>
                {activeTab === Tab.Delivery && (
                    <Delivery />
                )}

                {activeTab === Tab.Pickup && (
                    <Pickup points={points} />
                )}
            </div>
        </div>
    );
};

export default Tabs;
