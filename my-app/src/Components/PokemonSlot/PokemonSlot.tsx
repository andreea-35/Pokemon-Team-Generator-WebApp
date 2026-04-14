import './PokemonSlot.css'

interface PokemonSlotProps {
  name: string;
  primary_type: string;
}

function PokemonSlot ({ name, primary_type }: PokemonSlotProps) {
  const circleStyle = {
    backgroundColor: `var(--type-${primary_type.toLowerCase()})`
  };

  return (
    <div className='pokemon-slot'>
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