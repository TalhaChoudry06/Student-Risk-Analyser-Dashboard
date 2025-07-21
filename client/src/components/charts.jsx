import React, { useState } from "react";
import axios from "axios";
import "../css/Charts.css"; 

const Charts = ({ graphs }) => {
  const [chartImage, setChartImage] = useState(null);
  const [selectedChart, setSelectedChart] = useState(null);

  const handleChartClick = async (category, item) => {
    setSelectedChart({ category, item });

    try {
      const res = await axios.post("http://localhost:5000/api/generate_chart", {
        category,
        item,
      });

      setChartImage(`data:image/png;base64,${res.data.image}`);
    } catch (err) {
      console.error("Chart generation failed:", err);
    }
  };

  return (
    <div className="chart-container">
      {Object.entries(graphs).map(([category, items]) => (
        <div key={category} className="chart-category">
          <h2>{category}</h2>
          <div className="chart-buttons">
            {items.map((item) => (
              <button
                key={item}
                onClick={() => handleChartClick(category, item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      ))}

      {chartImage && (
        <div className="chart-output">
          <h3>
            {selectedChart.category} - {selectedChart.item}
          </h3>
          <img src={chartImage} alt="Generated Chart" />
        </div>
      )}
    </div>
  );
};

export default Charts;
