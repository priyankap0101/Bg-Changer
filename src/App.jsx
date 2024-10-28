/* eslint-disable no-unused-vars */
import { useState } from "react";

function App() {
  const [color, setColor] = useState("olive");

  return (
    <div
      className="flex items-center justify-center w-full h-screen duration-200"
      style={{ backgroundColor: color }}
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
              onClick={() => setColor(btn.color)}
              className="px-5 py-2 text-white transition-transform duration-150 ease-in-out transform rounded-full shadow-lg outline-none hover:scale-110"
              style={{
                backgroundColor: btn.color,
                color: btn.color === "white" ? "black" : "white",
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
