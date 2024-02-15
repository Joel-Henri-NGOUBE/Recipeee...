import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { recipeClicked, removeRecipe, changeCurrentModify } from "../State/Reducers/reducers"

export default function Recipe({ thisRecipe, indexOfRecipe }) {

    const dispatch = useDispatch()

    const toModify = useSelector((state) => state.currentModify[0])

    const { cookingTitle, ingredients, steps } = thisRecipe.recipe

    const RecipeClicked = () => {
        dispatch(recipeClicked(indexOfRecipe))
    }

    const suppressRecipe = (e) => {
        dispatch(removeRecipe(indexOfRecipe))
        e.stopPropagation()
    }

    const modifyRecipe = (e) => {
        dispatch(changeCurrentModify(indexOfRecipe))
        e.stopPropagation()
    }

  return (
    <div className="recipe" onClick={RecipeClicked}>
        <h3>{cookingTitle}</h3>      
        { !thisRecipe.clicked ?
            <>
                <span>Ingrédients: <b>{ingredients.length}</b></span>
                <span>Etapes: <b>{steps.length}</b></span>
            </>
            :
            <>
                <span>Ingrédients: <b>{ingredients.length}</b></span>
                <ul>
                    {ingredients.map((ingredient,index) => <li key={index}>{ingredient}</li>)}
                </ul>
                <span>Etapes: <b>{steps.length}</b></span>
                <ul>
                    {steps.map((step,index) => <li key={index}>{step}</li>)}
                </ul>
            </>
        }
        {toModify !== indexOfRecipe 
        &&  <>
                <button onClick={(e) => modifyRecipe(e)}>Modifier</button>
                <button onClick={(e) => suppressRecipe(e)}>Supprimer</button>
            </> 
        }
    </div>
  )
}
