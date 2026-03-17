import { useRef } from 'react';
import html2canvas from 'html2canvas';
import PokemonSlot from '../PokemonSlot/PokemonSlot.tsx';
import './TeamViewer.css';

interface Pokemon {
  id: number;
  name: string;
  type: string;
}

interface TeamViewerProps {
  team: Pokemon[];
  onReroll: () => void;
}

const TeamViewer = ({ team, onReroll }: TeamViewerProps) => {

  // reference to team container
  const teamRef = useRef<HTMLDivElement>(null);

  const exportAsImage = async () => {
    if (!teamRef.current) return;

    try {
      const canvas = await html2canvas(teamRef.current, {
        useCORS: true,
        backgroundColor: null,
        scale: 2,
      });

      // canvas to downloadable image URL
      const image = canvas.toDataURL('image/png');

      // temporary <a> tag to trigger the download
      const link = document.createElement('a');
      link.href = image;
      link.download = 'my-pokemon-team.png';
      link.click();

    } catch (error) {
      console.error('Failed to export image:', error);
    }
  };

  return (
    <div className="viewer-wrapper">
      {/* GENERATE BUTTON */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button onClick={onReroll} 
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
        >
          Generate Team
        </button>

      {/* EXPORT AS IMAGE BUTTON */}
      <button onClick={exportAsImage} 
      style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}>
          Export as PNG
        </button>
      </div>

      {/* POKEMON SLOTS */}
      <div className="team-container" ref={teamRef}>
        {team.map((pokemon) => (
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