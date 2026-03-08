import PokemonSlot from '../PokemonSlot/PokemonSlot.tsx';
import './TeamViewer.css';

const TeamViewer = () => {
  const myTeam = [
    { name: 'aromatisse', type: 'fairy' },
    { name: 'charizard', type: 'fire' },
    { name: 'blastoise', type: 'water' },
    { name: 'venusaur', type: 'grass' },
    { name: 'pikachu', type: 'electric' },
    { name: 'gengar', type: 'ghost' },
  ];

  return (
    <div className="team-container">
      {myTeam.map((pokemon, index) => (
        <PokemonSlot 
          key={index} 
          name={pokemon.name} 
          type={pokemon.type} 
        />
      ))}
    </div>
  );
};

export default TeamViewer;