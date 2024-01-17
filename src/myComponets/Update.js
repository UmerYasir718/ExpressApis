import React, { useState } from "react";
import Navbar from "./Navbar";

const Update = () => {
  const [searchName, setSearchName] = useState("");
  const [foundItems, setFoundItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [updateData, setUpdateData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8000/items/${searchName}`);
      const jsonData = await response.json();

      if (jsonData.error) {
        setError(jsonData.error);
        setFoundItems([]);
      } else {
        setError("");
        setFoundItems(jsonData.items);
      }
    } catch (error) {
      console.error("Error searching for items:", error);
    }
  };

  const handleUpdateForm = (item) => {
    setSelectedItem(item);
    setUpdateData(item);
  };

  const handleTitleChange = (e) => {
    setUpdateData({ ...updateData, title: e.target.value });
  };

  const handlePriceChange = (e) => {
    setUpdateData({ ...updateData, price: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setUpdateData({ ...updateData, description: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setUpdateData({ ...updateData, category: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/items/update/${selectedItem._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      const jsonData = await response.json();

      if (jsonData.error) {
        console.error("Error updating item:", jsonData.error);
      } else {
        setSearchName("");
        setFoundItems([]);
        setSelectedItem(null);
        setUpdateData({
          title: "",
          price: "",
          description: "",
          category: "",
        });
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-5" style={{ marginLeft: "50px", marginTop: "50px" }}>
        <h1>
          Search by Name:
          <br />
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            style={{ width: "800px" }}
          />
        </h1>
        <br />
        <button
          style={{ width: "300px", height: "30px" }}
          onClick={handleSearch}
        >
          Search
        </button>

        {error && <p>{error}</p>}

        <div>
          {foundItems.map((item) => (
            <div key={item._id}>
              <p>{item.title}</p>
              <p>{item.price}</p>
              <p>{item.description}</p>
              <button onClick={() => handleUpdateForm(item)}>Update</button>
            </div>
          ))}
        </div>

        {selectedItem && (
          <div>
            <h2>Update Item</h2>
            <label>
              Title:
              <input
                type="text"
                value={updateData.title}
                onChange={handleTitleChange}
              />
            </label>
            <label>
              Price:
              <input
                type="text"
                value={updateData.price}
                onChange={handlePriceChange}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={updateData.description}
                onChange={handleDescriptionChange}
              />
            </label>
            <label>
              Category:
              <input
                type="text"
                value={updateData.category}
                onChange={handleCategoryChange}
              />
            </label>
            <button onClick={handleUpdate}>Update Item</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Update;
