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
      className="flex flex-col items-center justify-center w-full h-screen p-8 duration-500"
      style={{
        background: isGradient
          ? `linear-gradient(${gradientAngle}deg, ${color}, ${secondaryColor})`
          : color,
        filter: `brightness(${brightness}%)`,
        transition:
          "background-color 0.5s ease-in-out, filter 0.5s ease-in-out",
      }}
    >
      <div className="w-full max-w-md p-4 space-y-4 bg-white rounded-lg shadow-lg">
        <div className="mb-4 text-xl font-bold text-center text-gray-800">
          Current Color: <span style={{ color }}>{color}</span>
        </div>

        <div className="flex justify-center gap-3">
          <button onClick={copyHexCode} className="bg-blue-600 action-btn">
            Copy Hex
          </button>
          <button onClick={saveToFavorites} className="bg-green-600 action-btn">
            Save to Favorites
          </button>
          <button onClick={undoLastColor} className="bg-yellow-600 action-btn">
            Undo
          </button>
          <button onClick={resetColor} className="bg-red-600 action-btn">
            Reset Color
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

        <div className="mt-4 space-y-2">
          <label htmlFor="brightness-slider" className="text-lg font-semibold">
            Brightness
          </label>
          <input
            id="brightness-slider"
            type="range"
            min="50"
            max="150"
            value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="gradient-angle" className="text-lg font-semibold">
            Gradient Angle
          </label>
          <input
            type="range"
            min="0"
            max="360"
            value={gradientAngle}
            onChange={(e) => setGradientAngle(e.target.value)}
            className="w-full"
          />
          <span className="ml-2">{gradientAngle}°</span>
        </div>

        <div className="flex gap-4 mt-4">
          <button onClick={toggleGradient} className="bg-pink-600 action-btn">
            Toggle Gradient
          </button>
          <button onClick={exportPalette} className="bg-orange-600 action-btn">
            Export Palette
          </button>
          <button onClick={randomColor} className="bg-teal-600 action-btn">
            Random Color
          </button>
        </div>

        <div className="flex gap-2 mt-4">
          {colorHistory.map((historyColor, index) => (
            <button
              key={index}
              onClick={() => handleColorChange(historyColor)}
              className="w-8 h-8 rounded-full shadow-lg hover:ring-2 hover:ring-offset-2"
              style={{ backgroundColor: historyColor }}
            />
          ))}
        </div>

        <div className="p-4 mt-6 bg-gray-100 rounded-lg">
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
    </div>
  );
}

export default App;
