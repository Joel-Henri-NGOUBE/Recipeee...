import React from 'react'
// Import des hooks de redux pour récupérer l'état (useSelector) et modifier l'état (useDispatch)
import { useDispatch, useSelector } from "react-redux"

// Import de l'ensembles des fonctions d'actions du Reducer
import { recipeClicked, removeRecipe, changeCurrentModify } from "../State/Reducers/reducers"

export default function Recipe({ thisRecipe, indexOfRecipe }) {
    // Appel de la fonction d'exécution d'actions
    const dispatch = useDispatch()

    // Récupération de la tâche de l'état à modifier  (id)
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
                {/* Afficher le détail des ingrédients et des étapes au clic */}
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
        {/* Boutons de modification et de suppression à afficher si la recette ne subit pas de modification */}
        {toModify !== indexOfRecipe 
        &&  <>
                <button onClick={(e) => modifyRecipe(e)}>Modifier</button>
                <button onClick={(e) => suppressRecipe(e)}>Supprimer</button>
            </> 
        }
    </div>
  )
}
