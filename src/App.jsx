import { useState } from "react";

function App() {
  const [color, setColor] = useState("olive");
  const [colorHistory, setColorHistory] = useState([]);
  const [favoriteColors, setFavoriteColors] = useState([]);
  const [brightness, setBrightness] = useState(100); // Default brightness at 100%
  const [showModal, setShowModal] = useState(false);

  // Function to update the color and add it to history
  const handleColorChange = (newColor) => {
    setColor(newColor);
    if (!colorHistory.includes(newColor)) {
      setColorHistory((prev) => [newColor, ...prev.slice(0, 2)]);
    }
  };

  // Copy color hex code to clipboard
  const copyHexCode = () => {
    navigator.clipboard.writeText(color);
    alert(`Copied: ${color}`);
  };

  // Add color to favorites if not already added
  const saveToFavorites = () => {
    if (!favoriteColors.includes(color)) {
      setFavoriteColors([...favoriteColors, color]);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-screen duration-500"
      style={{
        backgroundColor: color,
        filter: `brightness(${brightness}%)`, // Apply brightness filter based on slider
        transition:
          "background-color 0.5s ease-in-out, filter 0.5s ease-in-out",
      }}
    >
      {/* Display current color with copy/save options */}
      <div className="mb-4 text-xl font-bold text-gray-800">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
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
      </div>

      {/* Brightness Slider */}
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
        <span className="ml-4 text-lg">{brightness}%</span>
      </div>

      {/* Buttons for Changing Colors */}
      <div className="fixed inset-x-0 flex flex-wrap justify-center px-2 bottom-12">
        <div className="flex flex-wrap justify-center gap-4 px-6 py-4 text-black bg-white shadow-2xl rounded-xl">
          {[
            { color: "red", label: "Red" },
            { color: "green", label: "Green" },
            { color: "blue", label: "Blue" },
            { color: "pink", label: "Pink" },
            { color: "white", label: "White" },
          ].map((btn) => (
            <button
              key={btn.color}
              onClick={() => handleColorChange(btn.color)}
              className={`px-5 py-2 transition-transform duration-150 ease-in-out transform rounded-full shadow-lg outline-none hover:scale-110 ${
                color === btn.color ? "ring-2 ring-offset-2 ring-gray-500" : ""
              }`}
              style={{
                backgroundColor: btn.color,
                color: btn.color === "white" ? "black" : "white",
              }}
            >
              {btn.label}
            </button>
          ))}

          {/* Reset Button */}
          <button
            onClick={() => handleColorChange("olive")}
            className="px-5 py-2 text-black transition-transform duration-150 ease-in-out transform bg-gray-200 rounded-full shadow-lg outline-none hover:scale-110"
          >
            Reset
          </button>

          {/* Random Color Button */}
          <button
            onClick={() =>
              handleColorChange(
                `#${Math.floor(Math.random() * 16777215).toString(16)}`
              )
            }
            className="px-5 py-2 text-white transition-transform duration-150 ease-in-out transform bg-gray-800 rounded-full shadow-lg outline-none hover:scale-110"
          >
            🎲 Random Color
          </button>
        </div>
      </div>

      {/* Display Last 3 Colors */}
      <div className="fixed flex gap-2 bottom-24">
        {colorHistory.map((historyColor, index) => (
          <button
            key={index}
            onClick={() => handleColorChange(historyColor)}
            className="w-8 h-8 rounded-full shadow-lg"
            style={{ backgroundColor: historyColor }}
          />
        ))}
      </div>

      {/* Display Favorite Colors */}
      <div className="fixed flex gap-2 bottom-36">
        {favoriteColors.map((favColor, index) => (
          <button
            key={index}
            onClick={() => handleColorChange(favColor)}
            className="w-8 h-8 rounded-full shadow-lg"
            style={{ backgroundColor: favColor }}
          />
        ))}
      </div>

      {/* Modal for Color Information */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="p-4 bg-white rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold">Color Information</h2>
            <p>Hex: {color}</p>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
