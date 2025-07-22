import React from 'react';

const TabSwitcher = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'login', label: 'Masuk', description: 'Akses akun yang sudah ada' },
    { id: 'register', label: 'Daftar', description: 'Buat akun baru' }
  ];

  return (
    <div className="mb-6">
      <div className="flex bg-muted rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 px-4 py-3 rounded-md font-body font-medium text-sm transition-clinical ${
              activeTab === tab.id
                ? 'bg-card text-foreground shadow-clinical'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="mt-3 text-center">
        <p className="font-caption text-xs text-muted-foreground">
          {tabs.find(tab => tab.id === activeTab)?.description}
        </p>
      </div>
    </div>
  );
};

export default TabSwitcher;