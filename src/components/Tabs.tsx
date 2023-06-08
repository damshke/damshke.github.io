interface TabProps {
    label: string;
    selected: boolean;
    onClick: () => void;
  }
  
  const Tab: React.FC<TabProps> = ({ label, selected, onClick }) => (
    <button onClick={onClick} className={selected ? 'active' : ''}>
      {label}
    </button>
  );

  return (
    <div>
      <Tab
        label="Delivery"
        selected={activeTab === 'delivery'}
        onClick={() => setActiveTab('delivery')}
      />
      <Tab
        label="Pickup"
        selected={activeTab === 'pickup'}
        onClick={() => setActiveTab('pickup')}
      />
      {activeTab === 'delivery' ? <DeliveryTab /> : <PickupTab />}
    </div>
  );