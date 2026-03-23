import './PokemonList.css';

interface Pokemon {
  id: number;
  name: string;
  primary_type: string;
}

interface PokemonListProps {
  fullRoster: Pokemon[];
}

const PokemonList = ({ fullRoster }: PokemonListProps) => {
  return (
    <div className="pokemon-list-container">
      <h2>All matches</h2>
      
      <div className="list-wrapper">
        {fullRoster.map((pokemon) => (
          <div className="list-row" key={pokemon.id}>
            
            {/* pokemon icon */}
            <img 
              src={`https://play.pokemonshowdown.com/sprites/home-centered/${pokemon.name.toLowerCase()}.png`} 
              alt={pokemon.name} 
              className="list-sprite"
              onError={(e) => { e.currentTarget.src = 'https://play.pokemonshowdown.com/sprites/gen8icons/substitute.png'; }}
            />
            
            <span className="list-name">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </span>
        
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;