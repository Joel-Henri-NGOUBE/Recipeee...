import { RootState } from '../State/Store/store'
import Recipe from './Recipe'
import type { Recipe as RecipeItem } from './Recipe'
import { useAppSelector } from "../State/Store/hooks"


export default function Recipes() {
  // Récupération de la liste des recettes
  const recipes = useAppSelector((state: RootState) => state.recipes)
  return (
    <>
        {recipes.map((recipe: RecipeItem, index: number) => 
            <Recipe 
                thisRecipe={recipe} 
                indexOfRecipe={index} 
                key={index}
            />)}
    </>
  )
}
