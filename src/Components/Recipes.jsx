import React from 'react'
import Recipe from './Recipe'
import { useSelector } from "react-redux"


export default function Recipes() {
  // Récupération de la liste des recettes
  const recipes = useSelector((state) => state.recipes)
  return (
    <>
        {recipes.map((recipe, index) => 
            <Recipe 
                thisRecipe={recipe} 
                indexOfRecipe={index} 
                key={index}
            />)}
    </>
  )
}
