// Import des hooks de redux pour récupérer l'état (useSelector) et modifier l'état (useDispatch)
import { useDispatch, useSelector } from "react-redux"
import { useAppDispatch, useAppSelector } from "../State/Store/hooks"

// Import de l'ensembles des fonctions d'actions du Reducer
import { recipeClicked, removeRecipe, changeCurrentModify } from "../State/Reducers/reducers"
import { RootState } from "../State/Store/store"

import Modify from "../Images/optimization.svg"
import Delete from "../Images/remove.svg"

export type PrimaryRecipe = {
    cookingTitle: string,
    ingredients: string[],
    steps: string[]
}

export type Recipe = {
    recipe: PrimaryRecipe,
    clicked: boolean,
    modify: PrimaryRecipe
}

type RecipeProps = {
    thisRecipe: Recipe,
    indexOfRecipe: number
}

export default function Recipe({ thisRecipe, indexOfRecipe }: RecipeProps) {
    // Appel de la fonction d'exécution d'actions
    const dispatch = useAppDispatch()

    // Récupération de la tâche de l'état à modifier  (id)
    const toModify: number = useAppSelector((state: RootState) => state.currentModify[0])

    const { cookingTitle, ingredients, steps } = thisRecipe.recipe

    const RecipeClicked = () => {
        dispatch(recipeClicked(indexOfRecipe))
    }

    const suppressRecipe = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        dispatch(removeRecipe(indexOfRecipe))
        e.stopPropagation()
    }

    const modifyRecipe = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        dispatch(changeCurrentModify(indexOfRecipe))
        e.stopPropagation()
    }

  return (
    <div className="recipe" onClick={RecipeClicked}>
        <h3>{cookingTitle.toUpperCase()}</h3>      
        { !thisRecipe.clicked ?
            <>
                <span style={{alignSelf: "center"}}>Ingrédients: <b>{ingredients.length}</b></span>
                <span style={{alignSelf: "center"}}>Etapes: <b>{steps.length}</b></span>
            </>
            :
            <>
                {/* Afficher le détail des ingrédients et des étapes au clic */}
                <span>Les ingrédients: <b>({ingredients.length})</b></span>
                <ul>
                    {ingredients.map((ingredient,index) => <li key={index}>{ingredient}</li>)}
                </ul>
                <span>La liste des étapes: <b>({steps.length})</b></span>
                <ol>
                    {steps.map((step,index) => <li key={index}>{step}</li>)}
                </ol>
            </>
        }
        {/* Boutons de modification et de suppression à afficher si la recette ne subit pas de modification */}
        {toModify !== indexOfRecipe 
        &&  <div className="recipe-buttons" style={{alignSelf: "center"}}>
                <img src={Modify} alt="modifier" width="30" height="30" onClick={(e: React.MouseEvent<HTMLImageElement, MouseEvent>) => modifyRecipe(e)} />
                <img src={Delete} alt="deleter" width="30" height="30" onClick={(e: React.MouseEvent<HTMLImageElement, MouseEvent>) => suppressRecipe(e)} />
            </div> 
        }
    </div>
  )
}
