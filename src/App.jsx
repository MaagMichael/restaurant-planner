import "./App.css";
import { useState } from "react";

function App() {
  const [tables, setTables] = useState([
    { id: 1, typ: "small", x: 50, y: 50, status: "taken" },
    { id: 2, typ: "small", x: 150, y: 50, status: "free" },
    { id: 3, typ: "small", x: 150, y: 200, status: "free" },
    { id: 4, typ: "big", x: 400, y: 200, status: "taken" },
  ]);

  const [selectedTable, setSelectedTable] = useState(null);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [tempPosition, setTempPosition] = useState({ x: 0, y: 0 });
  const [tempType, setTempType] = useState("");

  const handleClick = (tableId) => {
    setTables(
      tables.map((table) =>
        table.id === tableId
          ? { ...table, status: table.status === "free" ? "taken" : "free" }
          : table
      )
    );
  };

  const handleDoubleClick = (table) => {
    setSelectedTable(table);
    setTempPosition({ x: table.x, y: table.y });
    setTempType(table.typ);
    setIsWidgetOpen(true);
  };

  const handlePositionChange = (axis, change) => {
    setTempPosition((prev) => ({
      ...prev,
      [axis]: prev[axis] + change,
    }));
  };

  const handleOkay = () => {
    setTables(
      tables.map((table) =>
        table.id === selectedTable.id
          ? { ...table, x: tempPosition.x, y: tempPosition.y, typ: tempType }
          : table
      )
    );
    setIsWidgetOpen(false);
  };

  return (
    <>
      <div className="max-w-[1000px] mx-auto">
        <p>Table data:</p>
        {tables.map((table) => (
          <div key={table.id}>
            No.: {table.id} x: {table.x} y: {table.y} Status: {table.status}{" "}
            Typ: {table.typ}{" "}
          </div>
        ))}
      </div>

      <div className="text-center space-y-2">
        <p>Edit instructions</p>
        <p>Single Click - toggle status betwenn "free" and "taken"</p>
        <p>
          Double Click - change table attributes for x and y position and table
          size small/big for layout adaption
        </p>
        <p>Hover to see Table id information</p>
      </div>
      <div className="flex justify-center items-center ">
        <div className="relative w-[1000px] h-[600px] bg-gray-300 rounded-lg">
          {tables.map((table) => (
            <div
              key={table.id}
              className={`group absolute ${
                table.typ === "big" ? "w-[100px]" : "w-[50px]"
              } h-[50px] bg-red-500 rounded flex items-center justify-center  font-bold cursor-pointer ${
                table.status === "taken"
                  ? "text-black opacity-50"
                  : "text-white"
              }`}
              style={{
                left: `${table.x}px`,
                top: `${table.y}px`,
              }}
              onClick={() => handleClick(table.id)}
              onDoubleClick={() => handleDoubleClick(table)}
            >
              {table.id}

              <div className="invisible group-hover:visible absolute -top-8 left-1/2 transform -translate-x-1/2  bg-black text-white px-2 py-1 rounded text-sm whitespace-nowrap">
                Table {table.id} - {table.status}
              </div>
            </div>
          ))}

          {/* widget for changeing x and y position */}
          {isWidgetOpen && (
            <div className="absolute opacity-70 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
              <div className="space-y-4">
                <h3 className="text-lg font-bold mb-4">
                  Edit Table {selectedTable.id}
                </h3>

                <span className="w-20 mr-2">Toggle Type:</span>
                <button
                  onClick={() =>
                    setTempType(tempType === "small" ? "big" : "small")
                  }
                  className={`px-4 py-2 rounded ${
                    tempType === "small"
                      ? "bg-blue-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {tempType === "small" ? "Small" : "Big"}
                </button>

                <div className="flex items-center gap-4">
                  <span className="w-20">X Position:</span>
                  <button
                    onClick={() => handlePositionChange("x", -50)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span className="w-16 text-center">{tempPosition.x}px</span>
                  <button
                    onClick={() => handlePositionChange("x", 50)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <span className="w-20">Y Position:</span>
                  <button
                    onClick={() => handlePositionChange("y", -50)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span className="w-16 text-center">{tempPosition.y}px</span>
                  <button
                    onClick={() => handlePositionChange("y", 50)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-between gap-4 mt-6">
                <button
                  onClick={handleOkay}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Okay
                </button>
                <button
                  onClick={() => setIsWidgetOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
