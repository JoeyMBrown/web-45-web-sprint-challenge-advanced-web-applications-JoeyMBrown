import React, { useEffect, useState } from "react";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';
import axiosWithAuth from "../helpers/axiosWithAuth";

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchColorService()
      .then((res) => setColors(res.data))
      .catch((err) => console.log(err))
  },[])

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    const id = editColor.id;
    let itemIndex;
    const colorsCopy = [...colors]

    colors.find((color, index) =>{
      itemIndex = index;
      return color.id === id;
    });

    colorsCopy[itemIndex] = editColor;

    setColors(colorsCopy);

    axiosWithAuth().put(`http://localhost:5000/api/colors/${id}`, editColor)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
  };

  const deleteColor = (colorToDelete) => {
    const id = colorToDelete.id;
    const newColors = colors.filter((color) => color.id !== id)

    axiosWithAuth().delete(`http://localhost:5000/api/colors/${id}`)
     .then((res) => console.log(res))
     .catch((err) => console.log(err))

    setColors(newColors);
  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
