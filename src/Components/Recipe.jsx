import React from 'react'

export default function Recipe({ recipe }) {
  return (
    <div className="recipe">
        <h3>{recipe.cookingTitle}</h3>
        <span>Ingrédients: <b>{recipe.ingredients.length}</b></span>
        <span>Etapes: <b>{recipe.steps.length}</b></span>
    </div>
  )
}
