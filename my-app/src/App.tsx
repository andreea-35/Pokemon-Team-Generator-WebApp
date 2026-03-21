import { useState, useEffect } from 'react';
import TeamViewer from './Components/TeamViewer/TeamViewer.tsx';
import PokemonList from './Components/PokemonList/PokemonList.tsx';
import FiltersMenu from './Components/Filters/FiltersMenu.tsx';

interface Pokemon {
  id: number;
  name: string;
  type: string;
}

const App = () => {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]); // full results
  const [currentTeam, setCurrentTeam] = useState<Pokemon[]>([]); // generated team
  const filterCategories = [
    { name: 'Types', options: ['Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'] },
    { name: 'Nat Dex', options: ['Gen 1', 'Gen 2', 'Gen 3', 'Gen 4', 'Gen 5', 'Gen 6', 'Gen 7', 'Gen 8', 'Gen 9'] },
    { name: 'Vibe', options: ['Cool', 'Cute', 'Goofy', 'Little Guy'] },
  ];

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
    <main style = {{ display: 'flex', minHeight: '100vh'}}>
    {/* Center Area */}
      <section style={{ flex: '3', padding: '20px'}}>
        <h2 style={{ textAlign: 'center' }}>My Pokémon Team Generator</h2>
      
        {/* pass current 6 and reroll function as props */}
        <TeamViewer team={currentTeam} onReroll={generateTeam} />

        <hr style={{ margin: '40px 0' }} />

        {/* pass full pokemon list as a prop */}
        <PokemonList fullRoster={allPokemon} />
      </section>
      <aside style={{ flex:'1'}}>
        {/* pass categories as a prop */}
        <FiltersMenu title='' categories={filterCategories}/>  
      </aside>
    </main>
  );
};

export default App;