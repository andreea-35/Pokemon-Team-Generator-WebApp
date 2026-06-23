import './FiltersMenu.css';

interface ToggleProps {
  filterMethod: boolean; 
  toggleFilterMethod: (method: boolean) => void
}

const FiltersMenu = ({ filterMethod, toggleFilterMethod}: ToggleProps) => {

  return (
    <div className='filters-menu'>
      <label className="toggle-container">
        <input
            type="checkbox"
            className="toggle-switch"
            checked={filterMethod}
            onChange={(e) => toggleFilterMethod(e.target.checked)}
        />
        Filter Mode: {filterMethod ? 'Inclusive' : 'Exclusive'}
        </label>
    </div>
  )
};

export default FiltersMenu;
