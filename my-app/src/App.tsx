import { useState, useEffect } from 'react';
import TeamViewer from './Components/TeamViewer/TeamViewer.tsx';
import PokemonList from './Components/PokemonList/PokemonList.tsx';

interface Pokemon {
  id: number;
  name: string;
  type: string;
}

const App = () => {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]); // full results
  const [currentTeam, setCurrentTeam] = useState<Pokemon[]>([]); // generated team

  // function to shuffle array and grab the first 6
  const pickRandomTeam = (roster: Pokemon[]) => {
    const shuffled = [...roster].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  };

  // generate
  const generateTeam = () => {
    setCurrentTeam(pickRandomTeam(allPokemon));
  };

  // fetch data
  useEffect(() => {
    fetch('http://localhost:3000/api/pokemon')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setAllPokemon(data);                    // set full list
        setCurrentTeam(pickRandomTeam(data));   // pick 6 for the starting team
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, []); // the [] means "only run this once"

  return (
    <main>
      <h2>My Pokémon Team Generator</h2>
      
      {/* pass current 6 and reroll function as props */}
      <TeamViewer team={currentTeam} onReroll={generateTeam} />

      <hr style={{ margin: '40px 0' }} />

      {/* pass full pokemon list as a prop */}
      <PokemonList fullRoster={allPokemon} />
    </main>
  );
};

export default App;