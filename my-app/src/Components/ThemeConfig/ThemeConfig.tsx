import './ThemeConfig.css';
import { HexAlphaColorPicker } from "react-colorful";

interface ThemeConfigProps {
  color: string;
  setColor: (color: string) => void;
}

const ThemeConfig = ({ color, setColor }: ThemeConfigProps) => {

  return (
    <div className='theme-menu'>
        <h4 className="category-name">Background</h4>
        <hr className="category-divider" />

        {/* Color Picker */}
        <div className="color-picker-wrapper">
            <HexAlphaColorPicker color={color} onChange={setColor} />
            <div className="hex-display">
                {color.toUpperCase()}
            </div>
        </div>
    </div>
  );
};

export default ThemeConfig;