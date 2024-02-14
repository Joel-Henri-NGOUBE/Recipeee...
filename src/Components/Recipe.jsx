import React from 'react'

export default function Recipe({ recipes, thisRecipe, indexOfRecipe, setRecipeList, setCurrentModify }) {

    const RecipeClicked = () => {
        setRecipeList(recipes.map((recipe,index) =>            
                indexOfRecipe === index ? 
                {...recipe, clicked: !recipe.clicked} 
                : 
                recipe
            ))
    }

    const suppressRecipe = (e) => {
        setRecipeList(recipes.filter((recipe,index) => index !== indexOfRecipe))
        e.stopPropagation()
    }

    const modifyRecipe = (e) => {
        // setModify({currentIndex: indexOfRecipe, recipes: recipes.map((recipe) => ({...recipe, modifyClicked: true}))})
        // setModify([!modify[0], indexOfRecipe])
        setCurrentModify([indexOfRecipe])
        e.stopPropagation()
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
        <button onClick={(e) => modifyRecipe(e)}>Modifier</button>
        <button onClick={(e) => suppressRecipe(e)}>Supprimer</button>
    </div>
  )
}
