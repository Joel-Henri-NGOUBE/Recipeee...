import React from 'react'

export default function Recipe({ recipes, thisRecipe, indexOfRecipe, setClicked }) {

    const RecipeClicked = () => {
        setClicked(recipes.map((recipe,index) =>            
                indexOfRecipe === index ? 
                {...recipe, clicked: !recipe.clicked} 
                : 
                recipe
            ))
    }

  return (
    <div className="recipe" onClick={RecipeClicked}>
        <h3>{thisRecipe.recipe.cookingTitle}</h3>      
        { !thisRecipe.clicked ?
            <>
                <span>Ingrédients: <b>{thisRecipe.recipe.ingredients.length}</b></span>
                <span>Etapes: <b>{thisRecipe.recipe.steps.length}</b></span>
            </>
            :
            <>
                <span>Ingrédients: <b>{thisRecipe.recipe.ingredients.length}</b></span>
                <ul>
                    {thisRecipe.recipe.ingredients.map((ingredient,index) => <li key={index}>{ingredient}</li>)}
                </ul>
                <span>Etapes: <b>{thisRecipe.recipe.steps.length}</b></span>
                <ul>
                    {thisRecipe.recipe.steps.map((step,index) => <li key={index}>{step}</li>)}
                </ul>
            </>
        }
    </div>
  )
}
