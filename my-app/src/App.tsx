import { useState, useEffect } from 'react';
import TeamViewer from './Components/TeamViewer/TeamViewer.tsx';
import PokemonList from './Components/PokemonList/PokemonList.tsx';
import FiltersMenu from './Components/Filters/FiltersMenu.tsx';
import ThemeConfig from './Components/ThemeConfig/ThemeConfig.tsx';
import type { Pokemon } from './types/pokemon';

const App = () => {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]); // full results
  const [currentTeam, setCurrentTeam] = useState<Pokemon[]>([]); // generated team
  const [teamBgColor, setTeamBgColor] = useState<string>('#e0e0e0ff');

  // function to shuffle array and grab the first 6
  const pickRandomTeam = (roster: Pokemon[]) => {
    const shuffled = [...roster].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  };

  // generate
  const generateTeam = () => {
    // setCurrentTeam(pickRandomTeam(allPokemon));
    let filteredList = allPokemon;

    // if filters active, filter
    if (selectedFilters.length > 0) {
      // gets all possible types/vibes
      const typeOptions = filterCategories.find( c => c.name == 'Type')?.options || [];
      const vibeOptions = filterCategories.find( c => c.name == 'Vibe')?.options || [];

      // match the selected filters against the possible options by category for sorting
      const selectedTypes = selectedFilters.filter( f => 
        typeOptions.includes(f));
      const selectedVibes = selectedFilters.filter( f => 
        vibeOptions.includes(f));

      filteredList = allPokemon.filter((p) => {
        const matchesType =
          selectedTypes.length === 0 || // if empty, set as true
          selectedTypes.some(f => f.toLowerCase().trim() === p.primary_type?.toLowerCase().trim()) ||
          selectedTypes.some(f => f.toLowerCase().trim() === p.secondary_type?.toLowerCase().trim());
        
        const matchesVibe = 
          selectedVibes.length === 0 ||
          selectedVibes.some(f => f.toLowerCase().trim() === p.main_vibe?.toLowerCase().trim()) ||
          selectedVibes.some(f => f.toLowerCase().trim() === p.sec_vibe?.toLowerCase().trim());
  
        
        return matchesType && matchesVibe;
      });
    }

    setFilteredPokemon(filteredList);

    // check if any pokemon fit the criteria
    if (filteredList.length > 0) {
      setCurrentTeam(pickRandomTeam(filteredList));
    } else {
      alert("No Pokemon match the criteria.");
      setCurrentTeam([]);
    }
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
        setFilteredPokemon(data);               // set filtered pokemon to initial data
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, []); // the [] means "only run this once"

  // filter categories
  const filterCategories = [
    { name: 'Type', options: ['Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'] },
    { name: 'Vibe', options: ['Cool', 'Cute', 'Goofy', 'Little Guy', 'Cunty'] },
  ];

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  // filter list debug
  useEffect(() => {
    console.log("Current Filters:", selectedFilters);
  }, [selectedFilters]);

  const toggleFilter = (filterName: string) => {
    setSelectedFilters((prev) => 
      prev.includes(filterName)
        ? prev.filter(f => f !== filterName) // remove if not selected anymore (keeps everything that isn't the selected one)
        : [...prev, filterName] // add if new (at end of list)
    )
  }

  return (
    <main style = {{ display: 'flex', minHeight: '100vh'}}>
    {/* Left side: Theme Area */}
    <aside style={{ flex:'1'}}>
        <ThemeConfig color={teamBgColor} setColor={setTeamBgColor}/>  
      </aside>
    {/* Center Area */}
      <section style={{ flex: '3', padding: '20px'}}>
        <h2 style={{ textAlign: 'center' }}>My Pokémon Team Generator</h2>
      
        {/* pass current 6 and reroll function as props */}
        <TeamViewer team={currentTeam} onReroll={generateTeam} bgColor={teamBgColor}/>

        <hr style={{ margin: '40px 0' }} />

        {/* pass full pokemon list as a prop */}
        <PokemonList fullRoster={filteredPokemon} />
      </section>
      <aside style={{ flex:'1'}}>
        {/* pass categories as a prop */}
        <FiltersMenu categories={filterCategories} selectedFilters={selectedFilters} onToggle={toggleFilter}/>  
      </aside>
    </main>
  );
};

export default App;