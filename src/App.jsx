import { useState } from "react";
import { SketchPicker } from "react-color";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCopy, FaUndo, FaSave, FaRandom, FaPalette } from "react-icons/fa";

function App() {
  const [color, setColor] = useState("#808000"); // Hex format for easier handling
  const [colorHistory, setColorHistory] = useState([]);
  const [favoriteColors, setFavoriteColors] = useState([]);
  const [brightness, setBrightness] = useState(100);
  const [gradientAngle, setGradientAngle] = useState(90);
  const [showPicker, setShowPicker] = useState(false);
  const [isGradient, setIsGradient] = useState(false);
  const [secondaryColor, setSecondaryColor] = useState("#0000FF");

  const handleColorChange = (newColor) => {
    setColor(newColor);
    if (!colorHistory.includes(newColor)) {
      setColorHistory((prev) => [newColor, ...prev.slice(0, 4)]); // Limit history to 5
    }
  };

  const notify = (message) => toast.success(message);

  const copyHexCode = () => {
    navigator.clipboard.writeText(color);
    notify(`Copied: ${color}`);
  };

  const saveToFavorites = () => {
    if (!favoriteColors.includes(color)) {
      setFavoriteColors([...favoriteColors, color]);
      notify("Color saved to favorites!");
    }
  };

  const deleteFavoriteColor = (favColor) => {
    setFavoriteColors(favoriteColors.filter((c) => c !== favColor));
    notify("Color removed from favorites.");
  };

  const exportPalette = () => {
    const palette = JSON.stringify(favoriteColors, null, 2);
    const blob = new Blob([palette], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "favorite-colors.json";
    link.click();
    notify("Palette exported successfully!");
  };

  const randomColor = () => {
    const randomHex = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    handleColorChange(randomHex);
  };

  const getContrastTextColor = (hexColor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#000" : "#FFF";
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-screen p-8 bg-gradient-to-tr"
      style={{
        background: isGradient
          ? `linear-gradient(${gradientAngle}deg, ${color}, ${secondaryColor})`
          : color,
        filter: `brightness(${brightness}%)`,
        transition: "background 0.5s ease-in-out, filter 0.5s ease-in-out",
      }}
    >
      <div className="w-full max-w-lg p-6 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-800 dark:text-white">
            Current Color
          </h2>
          <span
            className="inline-flex items-center justify-center px-4 py-2 text-xl font-semibold transition-transform transform rounded-full shadow-md hover:scale-105"
            style={{
              backgroundColor: color,
              color: getContrastTextColor(color), // Adjusts text color for better readability
            }}
          >
            {color}
          </span>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={copyHexCode}
            className="p-2 bg-blue-500 rounded-md action-btn"
          >
            <FaCopy className="inline mr-1" /> Copy Hex
          </button>
          <button
            onClick={saveToFavorites}
            className="p-2 bg-green-500 rounded-md action-btn"
          >
            <FaSave className="inline mr-1" /> Save
          </button>
          <button
            onClick={randomColor}
            className="p-2 bg-yellow-500 rounded-md action-btn"
          >
            <FaRandom className="inline mr-1" /> Random
          </button>
        </div>

        <button
          onClick={() => setShowPicker(!showPicker)}
          className="w-full px-4 py-2 text-white transition-transform bg-purple-600 rounded shadow-lg hover:bg-purple-700 hover:scale-105"
        >
          {showPicker ? "Close Picker" : "Pick a Color"}
        </button>
        {showPicker && (
          <SketchPicker
            color={color}
            onChangeComplete={(color) => handleColorChange(color.hex)}
          />
        )}

        <div>
          <label className="text-lg font-semibold">Brightness</label>
          <input
            type="range"
            min="50"
            max="150"
            value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
            className="w-full accent-purple-600"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="text-lg font-semibold">Gradient Angle</label>
          <input
            type="range"
            min="0"
            max="360"
            value={gradientAngle}
            onChange={(e) => setGradientAngle(e.target.value)}
            className="w-full accent-blue-500"
          />
          <span className="text-sm font-medium">{gradientAngle}°</span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setIsGradient(!isGradient)}
            className="px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 transform rounded-full shadow-md bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            Toggle Gradient
          </button>

          <button
            onClick={exportPalette}
            className="px-4 py-2 font-medium text-white transition-all duration-300 ease-in-out bg-orange-500 rounded-md hover:bg-red-600 hover:shadow-lg hover:shadow-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Export Palette
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Favorite Colors</h3>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {favoriteColors.map((favColor, index) => (
              <div key={index} className="flex flex-col items-center">
                <button
                  onClick={() => handleColorChange(favColor)}
                  className="w-10 h-10 border-2 border-gray-300 rounded-full"
                  style={{ backgroundColor: favColor }}
                />
                <button
                  onClick={() => deleteFavoriteColor(favColor)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer theme={isGradient ? "dark" : "light"} />
    </div>
  );
}

export default App;
