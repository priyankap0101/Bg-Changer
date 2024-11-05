import { useState } from "react";
import { SketchPicker } from "react-color";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
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

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-screen p-8"
      style={{
        background: isGradient
          ? `linear-gradient(${gradientAngle}deg, ${color}, ${secondaryColor})`
          : color,
        filter: `brightness(${brightness}%)`,
        transition: "background 0.5s ease-in-out, filter 0.5s ease-in-out",
      }}
    >
      <div className="w-full max-w-lg p-4 space-y-4 bg-white rounded-lg shadow-lg">
        <div className="text-xl font-bold text-center text-gray-800">
          Current Color: <span style={{ color }}>{color}</span>
        </div>

        <div className="flex justify-center gap-3">
          <button onClick={copyHexCode} className="bg-blue-500 action-btn">
            <FaCopy className="inline mr-1" /> Copy Hex
          </button>
          <button onClick={saveToFavorites} className="bg-green-500 action-btn">
            <FaSave className="inline mr-1" /> Save to Favorites
          </button>
          <button onClick={randomColor} className="bg-yellow-500 action-btn">
            <FaRandom className="inline mr-1" /> Random Color
          </button>
        </div>

        <button
          onClick={() => setShowPicker(!showPicker)}
          className="w-full px-4 py-2 mb-4 text-white bg-purple-600 rounded shadow-lg hover:bg-purple-700"
        >
          {showPicker ? "Close Picker" : "Pick a Color"}
        </button>
        {showPicker && (
          <SketchPicker
            color={color}
            onChangeComplete={(color) => handleColorChange(color.hex)}
          />
        )}

        <div className="mt-4">
          <label className="text-lg font-semibold">Brightness</label>
          <input
            type="range"
            min="50"
            max="150"
            value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex items-center mt-4">
          <label className="text-lg font-semibold">Gradient Angle</label>
          <input
            type="range"
            min="0"
            max="360"
            value={gradientAngle}
            onChange={(e) => setGradientAngle(e.target.value)}
            className="w-full ml-2"
          />
          <span className="ml-2">{gradientAngle}°</span>
        </div>

        <div className="flex gap-4 mt-4">
          <button onClick={() => setIsGradient(!isGradient)} className="bg-pink-500 action-btn">
            Toggle Gradient
          </button>
          <button onClick={exportPalette} className="bg-orange-500 action-btn">
            <FaPalette className="inline mr-1" /> Export Palette
          </button>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Favorite Colors</h3>
          <div className="flex gap-2 mt-2">
            {favoriteColors.map((favColor, index) => (
              <div key={index} className="flex items-center gap-2">
                <button
                  onClick={() => handleColorChange(favColor)}
                  className="w-8 h-8 rounded-full"
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
      <ToastContainer />
    </div>
  );
}

export default App;
