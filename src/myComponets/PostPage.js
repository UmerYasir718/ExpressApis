import React, { useState } from "react";
import Navbar from "./Navbar";
const PostPage = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePostItem = async () => {
    if (!title || !price || !description || !category) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    const formData = {
      title,
      price,
      description,
      category,
    };

    try {
      const response = await fetch("http://localhost:8000/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Item added successfully!");
        // You can redirect or perform any other action after a successful post
      } else {
        console.error("Failed to add item:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="mt-5"
        style={{
          margin: "auto",
          padding: "5px",
          fontSize: "30px",
        }}
      >
        <label>
          Title:
          <br />
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <br />

        <label>
          Price:
          <br />
          <input type="number" value={price} onChange={handlePriceChange} />
        </label>
        <br />
        <label>
          Description:
          <br />
          <textarea value={description} onChange={handleDescriptionChange} />
        </label>
        <br />
        <label>
          Category:
          <br />
          <input type="text" value={category} onChange={handleCategoryChange} />
        </label>
        <br />
        <button
          style={{ padding: "15px", fontSize: "15px", marginTop: "20px" }}
          onClick={handlePostItem}
        >
          Post Item
        </button>
      </div>
    </>
  );
};

export default PostPage;
