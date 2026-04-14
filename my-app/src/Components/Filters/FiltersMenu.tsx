import './FiltersMenu.css';

interface FilterCategory {
  name: String;
  options: string[];
}

interface FiltersMenuProps {
  categories: FilterCategory[];
  selectedFilters: string[]; 
  onToggle: (name: string) => void
}

const FiltersMenu = ({ categories, selectedFilters, onToggle}: FiltersMenuProps) => {

  return (
    <div className='filters-menu'>
      {categories.map((cat) => (
        <div key={cat.name as string} className="filter-group">
          <h4 className="category-name">{cat.name}</h4>
          <hr className="category-divider" />
          
          <div className="button-grid">
            {cat.options.map((opt) => {
              const isActive = selectedFilters.includes(opt) // current button is selected

              // normalize names and replace spaces with dashes
              const cleanOption = opt.toLowerCase().replace(/\s+/g, '-');
              const cleanCategory = cat.name.toLowerCase().replace(/\s+/g, '-');
              
              // construct the css color name
              const buttonColor = `var(--${cleanCategory}-${cleanOption})`;

              return (
                <button 
                  key={opt} 
                  onClick={() => onToggle(opt)}
                  className={ `filter-btn ${isActive ?'active' : ''}`}
                  style={{ 
                    backgroundColor: buttonColor
                  }}
                >
                {opt}
              </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FiltersMenu;
