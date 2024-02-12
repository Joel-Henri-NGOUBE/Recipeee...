import React from 'react'
import Recipe from './Recipe'

export default function Recipes({ recipes, setClicked }) {
  return (
    <>
        {recipes.map((recipe, index) => <Recipe recipes={recipes} thisRecipe={recipe} indexOfRecipe={index} setClicked={setClicked} key={index}/>)}
    </>
  )
}
