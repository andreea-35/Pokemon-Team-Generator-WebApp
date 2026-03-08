import './PokemonSlot.css'

interface PokemonSlotProps {
  name: string;
  type: string;
}

function PokemonSlot ({ name, type }: PokemonSlotProps) {
  const circleStyle = {
    backgroundColor: `var(--type-${type.toLowerCase()})`
  };

  return (
    <div>
        <div className="circle" style={circleStyle} />
        <img 
            src={`https://play.pokemonshowdown.com/sprites/home-centered/${name.toLowerCase()}.png`}
            alt={name} 
            onError={(e) => { e.currentTarget.src = 'path/to/fallback-image.png'; }} 
        />
    </div>
  )
}

export default PokemonSlot