import './ThemeConfig.css';
import { HexAlphaColorPicker } from "react-colorful";

interface ThemeConfigProps {
  color: string;
  setColor: (color: string) => void;
}

const ThemeConfig = ({ color, setColor }: ThemeConfigProps) => {

    // handler for when user types
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value);
    };

  return (
    <div className='theme-menu'>
        <h4 className="category-name">Background</h4>
        <hr className="category-divider" />

        {/* Color Picker */}
        <div className="color-picker-wrapper">
            <HexAlphaColorPicker color={color} onChange={setColor} />
            <input 
            type="text"
            value={color?.toUpperCase() || ""} // keeps text uppercase as user types
            onChange={handleInputChange}       // fires function on every keystroke
            className="hex-display"
            />
        </div>
    </div>
  );
};

export default ThemeConfig;