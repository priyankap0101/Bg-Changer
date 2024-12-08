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
      className="flex flex-col items-center justify-center w-full min-h-screen p-4 bg-gradient-to-tr"
      style={{
        background: isGradient
          ? `linear-gradient(${gradientAngle}deg, ${color}, ${secondaryColor})`
          : color,
        filter: `brightness(${brightness}%)`,
        transition: "background 0.5s ease-in-out, filter 0.5s ease-in-out",
      }}
    >
      <div className="w-full max-w-md p-4 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Color Palette Manager
          </h2>
          <div className="inline-block p-2 border rounded-lg shadow-inner dark:border-gray-700">
            <span
              className="inline-block px-4 py-1 text-sm font-medium rounded-lg"
              style={{
                backgroundColor: color,
                color: getContrastTextColor(color),
              }}
            >
              {color}
            </span>
          </div>
        </div>

        {/* Actions Section */}
        <div className="p-3 space-y-4 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Actions
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={randomColor}
              className="flex items-center justify-center px-2 py-1 text-xs font-medium text-white bg-yellow-500 rounded shadow hover:bg-yellow-600"
            >
              <FaRandom className="mr-1" /> Random
            </button>
            <button
              onClick={copyHexCode}
              className="flex items-center justify-center px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded shadow hover:bg-blue-600"
            >
              <FaCopy className="mr-1" /> Copy Hex
            </button>
            <button
              onClick={saveToFavorites}
              className="flex items-center justify-center px-2 py-1 text-xs font-medium text-white bg-green-500 rounded shadow hover:bg-green-600"
            >
              <FaSave className="mr-1" /> Save
            </button>
            <button
              onClick={() => setShowPicker(!showPicker)}
              className="flex items-center justify-center px-2 py-1 text-xs font-medium text-white bg-purple-600 rounded shadow hover:bg-purple-700"
            >
              <FaPalette className="mr-1" />{" "}
              {showPicker ? "Close Picker" : "Pick Color"}
            </button>
          </div>
        </div>

        {/* Color Picker Section */}
        {showPicker && (
          <div className="p-3 rounded-md shadow bg-gray-50 dark:bg-gray-700">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Color Picker
            </h3>
            <SketchPicker
              color={color}
              onChangeComplete={(color) => handleColorChange(color.hex)}
            />
          </div>
        )}

        {/* Controls Section */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-3 rounded-md shadow bg-gray-50 dark:bg-gray-700">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Brightness
            </label>
            <input
              type="range"
              min="50"
              max="150"
              value={brightness}
              onChange={(e) => setBrightness(e.target.value)}
              className="w-full accent-purple-600"
            />
          </div>
          <div className="p-3 rounded-md shadow bg-gray-50 dark:bg-gray-700">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Gradient Angle
            </label>
            <input
              type="range"
              min="0"
              max="360"
              value={gradientAngle}
              onChange={(e) => setGradientAngle(e.target.value)}
              className="w-full accent-blue-500"
            />
            <span className="block mt-1 text-xs text-gray-500 dark:text-gray-300">
              {gradientAngle}°
            </span>
          </div>
        </div>

        {/* Gradient Toggle & Export */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <button
            onClick={() => setIsGradient(!isGradient)}
            className="px-4 py-2 text-xs font-semibold text-white rounded shadow bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            Toggle Gradient
          </button>
          <button
            onClick={exportPalette}
            className="px-4 py-2 text-xs font-semibold text-white rounded shadow bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-500"
          >
            Export Palette
          </button>
        </div>

        {/* Favorite Colors */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Favorite Colors
          </h3>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {favoriteColors.map((favColor, index) => (
              <div key={index} className="flex flex-col items-center">
                <button
                  onClick={() => handleColorChange(favColor)}
                  className="w-8 h-8 border border-gray-300 rounded-full"
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
