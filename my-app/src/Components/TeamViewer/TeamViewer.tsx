import { useState, useEffect } from 'react';
import PokemonSlot from '../PokemonSlot/PokemonSlot.tsx';
import './TeamViewer.css';

interface Pokemon {
  id: number;
  name: string;
  type: string;
}

const TeamViewer = () => {
  const [myTeam, setMyTeam] = useState<Pokemon[]>([]);

  // FETCH FUNCTION
  const fetchRandomTeam = async () => {
    try {
      // backend call
      const response = await fetch('http://localhost:3000/api/pokemon/random');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      setMyTeam(data);
    } catch (error) {
      console.error('Error fetching team:', error);
    }
  };

  useEffect(() => {
    fetchRandomTeam();
  }, []); 

  return (
    <div className="viewer-wrapper">
      {/* GENERATE BUTTON */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button 
          onClick={fetchRandomTeam} 
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
        >
          Generate Team
        </button>
      </div>

      {/* POKEMON SLOTS */}
      <div className="team-container">
        {myTeam.map((pokemon) => (
          <PokemonSlot 
            key={pokemon.id}
            name={pokemon.name} 
            type={pokemon.type} 
          />
        ))}
      </div>
    </div>
  );
};

export default TeamViewer;