import { useState } from "react";
import { SketchPicker } from "react-color";

function App() {
  const [color, setColor] = useState("olive");
  const [colorHistory, setColorHistory] = useState([]);
  const [favoriteColors, setFavoriteColors] = useState([]);
  const [brightness, setBrightness] = useState(100);
  const [gradientAngle, setGradientAngle] = useState(90);
  const [showPicker, setShowPicker] = useState(false);
  const [isGradient, setIsGradient] = useState(false);
  const [secondaryColor, setSecondaryColor] = useState("blue");
  const [previousColor, setPreviousColor] = useState(color);

  const handleColorChange = (newColor) => {
    setPreviousColor(color);
    setColor(newColor);
    if (!colorHistory.includes(newColor)) {
      setColorHistory((prev) => [newColor, ...prev.slice(0, 2)]);
    }
  };

  const copyHexCode = () => {
    navigator.clipboard.writeText(color);
    alert(`Copied: ${color}`);
  };

  const saveToFavorites = () => {
    if (!favoriteColors.includes(color)) {
      setFavoriteColors([...favoriteColors, color]);
    }
  };

  const deleteFavoriteColor = (favColor) => {
    setFavoriteColors(favoriteColors.filter((c) => c !== favColor));
  };

  const exportPalette = () => {
    const palette = JSON.stringify(favoriteColors, null, 2);
    const blob = new Blob([palette], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "favorite-colors.json";
    link.click();
  };

  const toggleGradient = () => setIsGradient(!isGradient);

  const resetColor = () => setColor("olive");
  const resetBrightness = () => setBrightness(100);

  const randomColor = () => {
    const randomHex = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    handleColorChange(randomHex);
  };

  const undoLastColor = () => {
    handleColorChange(previousColor);
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-screen duration-500"
      style={{
        background: isGradient
          ? `linear-gradient(${gradientAngle}deg, ${color}, ${secondaryColor})`
          : color,
        filter: `brightness(${brightness}%)`,
        transition:
          "background-color 0.5s ease-in-out, filter 0.5s ease-in-out",
      }}
    >
      <div className="mb-4 text-xl font-bold text-gray-800">
        <span onClick={() => setShowPicker(true)} className="cursor-pointer">
          Current Color: <span>{color}</span>
        </span>
        <button
          onClick={copyHexCode}
          className="px-2 py-1 ml-2 text-sm text-white bg-blue-600 rounded shadow-lg hover:bg-blue-700"
        >
          Copy Hex
        </button>
        <button
          onClick={saveToFavorites}
          className="px-2 py-1 ml-2 text-sm text-white bg-green-600 rounded shadow-lg hover:bg-green-700"
        >
          Save to Favorites
        </button>
        <button
          onClick={undoLastColor}
          className="px-2 py-1 ml-2 text-sm text-white bg-yellow-600 rounded shadow-lg hover:bg-yellow-700"
        >
          Undo
        </button>
        <button
          onClick={resetColor}
          className="px-2 py-1 ml-2 text-sm text-white bg-red-600 rounded shadow-lg hover:bg-red-700"
        >
          Reset Color
        </button>
      </div>

      <button
        onClick={() => setShowPicker(!showPicker)}
        className="px-2 py-1 mb-4 text-white bg-purple-600 rounded shadow-lg hover:bg-purple-700"
      >
        {showPicker ? "Close Picker" : "Pick a Color"}
      </button>
      {showPicker && (
        <SketchPicker
          color={color}
          onChangeComplete={(color) => handleColorChange(color.hex)}
        />
      )}

      <div className="flex items-center mb-6">
        <label
          htmlFor="brightness-slider"
          className="mr-4 text-lg font-semibold text-gray-800"
        >
          Brightness
        </label>
        <input
          id="brightness-slider"
          type="range"
          min="50"
          max="150"
          value={brightness}
          onChange={(e) => setBrightness(e.target.value)}
          className="w-32 h-2 bg-gray-300 rounded-lg cursor-pointer accent-blue-500"
        />
        <button
          onClick={resetBrightness}
          className="px-2 py-1 ml-4 text-sm text-white bg-gray-600 rounded shadow-lg hover:bg-gray-700"
        >
          Reset Brightness
        </button>
        <span className="ml-4 text-lg">{brightness}%</span>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <label htmlFor="gradient-angle" className="text-lg font-semibold">
          Gradient Angle
        </label>
        <input
          type="range"
          min="0"
          max="360"
          value={gradientAngle}
          onChange={(e) => setGradientAngle(e.target.value)}
          className="w-32 h-2 rounded-lg cursor-pointer accent-blue-500"
        />
        <span className="ml-2">{gradientAngle}°</span>
      </div>

      <div className="flex gap-4 mb-4">
        {[
          { color: "#ff6347", label: "Tomato" },
          { color: "#4682b4", label: "SteelBlue" },
        ].map((theme) => (
          <button
            key={theme.color}
            onClick={() => handleColorChange(theme.color)}
            className="px-4 py-2 text-white rounded shadow-lg hover:scale-105"
            style={{ backgroundColor: theme.color }}
          >
            {theme.label}
          </button>
        ))}
      </div>

      <button
        onClick={toggleGradient}
        className="px-2 py-1 mb-4 text-white bg-pink-600 rounded shadow-lg hover:bg-pink-700"
      >
        Toggle Gradient
      </button>
      <button
        onClick={exportPalette}
        className="px-2 py-1 mb-4 text-white bg-orange-600 rounded shadow-lg hover:bg-orange-700"
      >
        Export Palette
      </button>
      <button
        onClick={randomColor}
        className="px-2 py-1 mb-4 text-white bg-teal-600 rounded shadow-lg hover:bg-teal-700"
      >
        Random Color
      </button>

      <div className="flex gap-2 mb-6">
        {colorHistory.map((historyColor, index) => (
          <button
            key={index}
            onClick={() => handleColorChange(historyColor)}
            className="w-8 h-8 rounded-full shadow-lg hover:ring-2 hover:ring-offset-2 hover:ring-gray-500"
            style={{ backgroundColor: historyColor }}
          />
        ))}
      </div>

      <div className="fixed p-4 bg-white rounded-lg shadow-lg bottom-10 left-10">
        <h3 className="text-lg font-semibold">Favorite Colors</h3>
        <div className="flex gap-2 mt-2">
          {favoriteColors.map((favColor, index) => (
            <div key={index} className="flex items-center gap-2">
              <button
                onClick={() => handleColorChange(favColor)}
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: favColor }}
              />
              <span className="text-sm">{favColor}</span>
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
  );
}

export default App;
