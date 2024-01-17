import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Delete = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/items");
      const jsonData = await response.json();
      setItems(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/items/delete/${itemId}`,
        {
          method: "DELETE",
        }
      );

      const jsonData = await response.json();

      if (jsonData.error) {
        console.error("Error deleting item:", jsonData.error);
      } else {
        // Item deleted successfully, update state
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-4">
        {error && <p>{error}</p>}

        <div>
          {items.map((item) => (
            <div key={item._id}>
              <p>{item.title}</p>
              <p>{item.price}</p>
              <p>{item.description}</p>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Delete;
