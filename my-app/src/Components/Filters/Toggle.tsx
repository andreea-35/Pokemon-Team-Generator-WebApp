import './Toggle.css';

interface ToggleProps {
  filterMethod: boolean; 
  toggleFilterMethod: (method: boolean) => void
}

const FiltersMenu = ({ filterMethod, toggleFilterMethod}: ToggleProps) => {

  return (
    <div className='toggle'>
      <label className="toggle-container">
        <input
            type="checkbox"
            className="toggle-switch"
            checked={filterMethod}
            onChange={(e) => toggleFilterMethod(e.target.checked)}
        />
        <span>Filter Mode: <b>{filterMethod ? 'Inclusive' : 'Exclusive'}</b></span>
        <span className="tooltiptext">Pokemon satisfies <b>{filterMethod ? 'EITHER' : 'ALL'}</b> of the selected filters.</span>
        </label>
    </div>
  )
};

export default FiltersMenu;
