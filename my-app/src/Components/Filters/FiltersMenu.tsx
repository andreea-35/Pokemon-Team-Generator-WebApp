import './FiltersMenu.css';

interface FilterCategory {
  name: String;
  options: string[];
}

interface FiltersMenuProps {
  title: string;
  categories: FilterCategory[];
}

const FiltersMenu = ({ title, categories }: FiltersMenuProps) => {

  return (
    <div className='filters-menu'>
      <h2 className="menu-title">{title}</h2>
      
      {categories.map((cat) => (
        <div key={cat.name as string} className="filter-group">
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
