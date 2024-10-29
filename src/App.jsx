/* eslint-disable no-unused-vars */
import { useState } from "react";

function App() {
  const [color, setColor] = useState("olive");

  // Function to generate a random color in hex format
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let randomColor = "#";
    for (let i = 0; i < 6; i++) {
      randomColor += letters[Math.floor(Math.random() * 16)];
    }
    return randomColor;
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  return (
    <div
      className="flex items-center justify-center w-full h-screen duration-500"
      style={{
        backgroundColor: color,
        transition: "background-color 0.5s ease-in-out",
      }}
    >
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
                color === btn.color
                  ? "ring-2 ring-offset-2 ring-offset-gray-100 ring-gray-500"
                  : ""
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
    </div>
  );
}

export default App;
