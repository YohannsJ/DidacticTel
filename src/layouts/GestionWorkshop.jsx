
import React from "react";
import { useNavigate } from "react-router-dom";
import NetworkManager from "../components/Games/Gestion/NetworkManager";

const GestionWorkshop = () => {
  const navigate = useNavigate();
  
  return (
    <div style={{ padding: '20px' }}>
      {/* Page header removed: title will be handled by the game's welcome hero to avoid duplicate headings */}
      {/* Welcome paragraph removed per user request */}
      <NetworkManager />
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        padding: '16px 24px', 
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderTop: '1px solid rgba(0,0,0,0.1)'
      }}>
        <button 
          onClick={() => navigate('/NandGame')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}
          title="Ir al juego anterior: NandGame (Hardware)"
        >
          ← Juego anterior
        </button>
        <button 
          onClick={() => navigate('/Espectro')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}
          title="Ir al siguiente juego: Espectro (Telecomunicaciones)"
        >
          Siguiente juego →
        </button>
      </div>
      
    </div>
  );
};

export default GestionWorkshop;
