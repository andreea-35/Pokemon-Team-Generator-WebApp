import './FiltersMenu.css';

interface FiltersMenuProps {
  testText: string;
}

const FiltersMenu = ({ testText }: FiltersMenuProps) => {
  const filterCategories = [
    { name: 'Types', options: ['Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'] },
    { name: 'Nat Dex', options: ['Gen 1', 'Gen 2', 'Gen 3', 'Gen 4', 'Gen 5', 'Gen 6', 'Gen 7', 'Gen 8', 'Gen 9'] },
    { name: 'Vibe', options: ['Cool', 'Cute', 'Goofy', 'Little Guy'] },
  ];

  return (
    <div className='filters-menu'>
      <h2 className="menu-title">{testText}</h2>
      
      {filterCategories.map((cat) => (
        <div key={cat.name} className="filter-group">
          <h4 className="category-name">{cat.name}</h4>
          <hr className="category-divider" />
          
          <div className="button-grid">
            {cat.options.map((opt) => (
              <button key={opt} className="filter-btn">
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FiltersMenu;
