import { createSlice } from "@reduxjs/toolkit"

// Slice qui gère l'état de la liste des recettes
export const recipeSlice = createSlice({
    name: "recipes",
    initialState: [],
    reducers: {
        /**
         * @param state
         * @param action
         * 
         * Répérer le moment où une recette est cliquée et changer son état clicked en conséquence
         * 
         */
        recipeClicked: (state, action) => {
            return state.map((recipe,index) =>            
                action.payload === index
                ? {...recipe, clicked: !recipe.clicked} 
                : recipe
            )
        },
        // Ajouter une nouvelle recette à la liste
        addRecipe: (state, action) => {
            return [...state, action.payload]
        },
        // Modifier la valeur de toutes les modifications effectuées sur une recette, ses ingrédients et ses étapes 
        updateRecipe: (state, action) => {
            return state.map((recipe, index) => 
                index === action.payload 
                ? {...recipe, recipe: {...recipe.modify}} 
                : recipe)
        },
        // Réinitialiser les valeurs de la recette par rapport des des changements
        resetModifyOfRecipe: (state, action) => {
            return state.map((recipe, index) => 
                index === action.payload 
                ? {...recipe, modify: {...recipe.recipe}} 
                : recipe)
        },
        // Supprimer une recette de l'ensemble des recettes
        removeRecipe: (state, action) => {
            return state.filter((recipe,index) => index !== action.payload)
        },
        // Changer le titre d'une recette à la modification de la recette
        updateModifyTitle: (state, action) => {
            return state.map((recipe, index) => 
                index === action.payload.modify
                ? {...recipe, 
                    modify: {...recipe.modify, cookingTitle: action.payload.title}}
                : recipe)
        },
        // Changer un ingrédient d'une recette à la modification de la recette
        updateModifyIngredient: (state, action) => {
            return state.map((recipe, index) => 
                index === action.payload.modify 
                ? {...recipe, 
                    modify: {...recipe.modify, ingredients: recipe.modify.ingredients.map((element, index2) => 
                        index2 === action.payload.currentIndex 
                        ? action.payload.ingredient 
                        : element)}}
                : recipe)
        },
        // Changer une étape de recette à la modification de la recette
        updateModifyStep: (state, action) => {
            return state.map((recipe, index) => 
                index === action.payload.modify 
                ? {...recipe, 
                    modify: {...recipe.modify, steps: recipe.modify.steps.map((element, index2) => 
                        index2 === action.payload.currentIndex 
                        ? action.payload.step 
                        : element)}}
                : recipe)
        },
        // Suppimer un ingrédient d'une recette à la modification
        suppressIngredientFromModify: (state, action) => {
            return state.map((recipe, index) => 
                index === action.payload.modify 
                ? {...recipe, 
                    modify: {...recipe.modify, ingredients: recipe.modify.ingredients.filter((element, index2) => 
                        index2 !== action.payload.currentIndex)}}
                : recipe)
        },
        // Suppimer une étape de recette à la modification
        suppressStepFromModify: (state, action) => {
            return state.map((recipe, index) => 
                index === action.payload.modify 
                ? {...recipe, 
                    modify: {...recipe.modify, steps: recipe.modify.steps.filter((element, index2) => 
                        index2 !== action.payload.currentIndex)}}
                : recipe)
        },
        // Annuler le changement du titre d'une recette
        cancelTitleChange: (state, action) => {
            return state.map((recipe, index) => 
                index === action.payload
                ? {...recipe, modify: {...recipe.modify, cookingTitle: recipe.recipe.cookingTitle}} 
                : recipe) 
        },
        // Annuler le changement d'un ingrédient particulier de l'état des recettes
        cancelIngredientChange: (state, action) => {
            return state.map((recipe, index) => 
                index === action.payload.modify 
                ? {...recipe, modify: {...recipe.modify, ingredients: recipe.modify.ingredients.map((ingredient,index2) => 
                    index2 === action.payload.currentIndex 
                    ? recipe.recipe.ingredients[index2] 
                    : ingredient)}} 
                : recipe)
        },
        // Annuler le changement d'une étape particulière de l'état des recettes
        cancelStepChange: (state, action) => {
            return state.map((recipe, index) => 
                index === action.payload.modify 
                ? {...recipe, modify: {...recipe.modify, steps: recipe.modify.steps.map((ingredient,index2) => 
                    index2 === action.payload.currentIndex 
                    ? recipe.recipe.steps[index2] 
                    : ingredient)}} 
                : recipe)
        }
    }
})

// Slice qui gère l'état de la recette à modifier (id)
export const modifySlice = createSlice({
    name: "currentModify",
    initialState: [],
    reducers: {
        // Identifier et changer l'id de la recette à modifier
        changeCurrentModify: (state, action) => {
            return [action.payload]
        },
        // Eliminer l'id de l'état s'il n'y a rien à modifier
        cleanCurrentModify: (state, action) => {
            return []
        }
    }
})


// Export des actions à réaliser sur l'état
export const {recipeClicked, addRecipe, updateRecipe, resetModifyOfRecipe, removeRecipe, updateModifyIngredient, updateModifyStep, updateModifyTitle, suppressIngredientFromModify, suppressStepFromModify, cancelTitleChange, cancelStepChange, cancelIngredientChange } = recipeSlice.actions

export const { changeCurrentModify, cleanCurrentModify } = modifySlice.actions

