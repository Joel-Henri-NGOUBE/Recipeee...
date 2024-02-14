import React from 'react'
import Recipe from './Recipe'

export default function Recipes({ recipes, setRecipeList, setCurrentModify }) {
  return (
    <>
        {recipes.map((recipe, index) => 
            <Recipe 
                recipes={recipes} 
                thisRecipe={recipe} 
                indexOfRecipe={index} 
                setRecipeList={setRecipeList} 
                key={index}
                setCurrentModify={setCurrentModify}
            />)}
    </>
  )
}
