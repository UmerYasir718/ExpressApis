import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
const Data = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/items");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <Navbar />
      {/* Display data in a list */}
      <ul className="mt-5">
        {data.map((item) => (
          <li key={item._id}>
            <strong>Name: {item.title}</strong>
            <p>Price: {item.price}</p>
            <p>Description: {item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Data;
