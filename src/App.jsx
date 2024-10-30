/* eslint-disable no-unused-vars */
import { useState } from "react";

function App() {
  const [color, setColor] = useState("olive");
  const [colorHistory, setColorHistory] = useState([]);

  // Function to generate a random color in hex format
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let randomColor = '#';
    for (let i = 0; i < 6; i++) {
      randomColor += letters[Math.floor(Math.random() * 16)];
    }
    return randomColor;
  };

  // Function to handle color change and update history
  const handleColorChange = (newColor) => {
    setColorHistory((prev) => [newColor, ...prev.slice(0, 2)]);
    setColor(newColor);
  };

  // Function to copy hex code to clipboard
  const copyHexCode = () => {
    navigator.clipboard.writeText(color);
    alert(`Copied: ${color}`);
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-screen duration-500"
      style={{ backgroundColor: color, transition: "background-color 0.5s ease-in-out" }}
    >
      {/* Display Current Color Hex Code */}
      <div className="mb-4 text-xl font-bold text-gray-800">
        Current Color: <span>{color}</span>
        <button
          onClick={copyHexCode}
          className="px-2 py-1 ml-2 text-sm text-white bg-blue-600 rounded shadow-lg hover:bg-blue-700"
        >
          Copy Hex
        </button>
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
                color === btn.color ? "ring-2 ring-offset-2 ring-offset-gray-100 ring-gray-500" : ""
              }`}
              style={{
                backgroundColor: btn.color,
                color: btn.color === "white" ? "black" : "white",
              }}
              title={`Color: ${btn.color}`} // Tooltip
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
            onClick={() => handleColorChange(getRandomColor())}
            className="px-5 py-2 text-white transition-transform duration-150 ease-in-out transform bg-gray-800 rounded-full shadow-lg outline-none hover:scale-110"
            title="Random Color"
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
            title={`Color: ${historyColor}`}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
