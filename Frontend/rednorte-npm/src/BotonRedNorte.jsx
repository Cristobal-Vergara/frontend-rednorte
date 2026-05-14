import React from 'react';

export const BotonRedNorte = ({ label, onClick, color = '#007bff' }) => {
  return (
    <button 
      onClick={onClick} 
      style={{ 
        backgroundColor: color, 
        color: 'white', 
        padding: '10px 20px', 
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      {label}
    </button>
  );
};