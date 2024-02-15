import { createSlice } from "@reduxjs/toolkit"

export const recipeSlice = createSlice({
    name: "recipes",
    initialState: [],
    reducers: {
        // Répérer le moment où une recette est cliquée et changer son état clicked en conséquence
        recipeClicked: (state, action) => {
            return state.map((recipe,index) =>            
                action.payload === index
                ? {...recipe, clicked: !recipe.clicked} 
                : recipe
            )
        },
        addRecipe: (state, action) => {
            return [...state, action.payload]
        },
        updateRecipe: (state, action) => {
            return state.map((recipe, index) => 
                index === action.payload 
                ? {...recipe, recipe: {...recipe.modify}} 
                : recipe)
        },
        updateModifyOfRecipe: (state, action) => {
            return state.map((recipe, index) => 
                index === action.payload 
                ? {...recipe, modify: {...recipe.recipe}} 
                : recipe)
        },
        removeRecipe: (state, action) => {
            return state.filter((recipe,index) => index !== action.payload)
        },
        updateModifyTitle: (state, action) => {
            return state.map((recipe, index) => 
                index === action.payload.modify
                ? {...recipe, 
                    modify: {...recipe.modify, cookingTitle: action.payload.title}}
                : recipe)
        },
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
        suppressIngredientFromModify: (state, action) => {
            return state.map((recipe, index) => 
                index === action.payload.modify 
                ? {...recipe, 
                    modify: {...recipe.modify, ingredients: recipe.modify.ingredients.filter((element, index2) => 
                        index2 !== action.payload.currentIndex)}}
                : recipe)
        },
        suppressStepFromModify: (state, action) => {
            return state.map((recipe, index) => 
                index === action.payload.modify 
                ? {...recipe, 
                    modify: {...recipe.modify, steps: recipe.modify.steps.filter((element, index2) => 
                        index2 !== action.payload.currentIndex)}}
                : recipe)
        },
        cancelTitleChange: (state, action) => {
            return state.map((recipe, index) => 
                index === action.payload
                ? {...recipe, modify: {...recipe.modify, cookingTitle: recipe.recipe.cookingTitle}} 
                : recipe) 
        },
        cancelIngredientChange: (state, action) => {
            return state.map((recipe, index) => 
                index === action.payload.modify 
                ? {...recipe, modify: {...recipe.modify, ingredients: recipe.modify.ingredients.map((ingredient,index2) => 
                    index2 === action.payload.currentIndex 
                    ? recipe.recipe.ingredients[index2] 
                    : ingredient)}} 
                : recipe)
        },
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

export const modifySlice = createSlice({
    name: "currentModify",
    initialState: [],
    reducers: {
        changeCurrentModify: (state, action) => {
            return [action.payload]
        },
        cleanCurrentModify: (state, action) => {
            return []
        }
    }
})

export const {recipeClicked, addRecipe, updateRecipe, updateModifyOfRecipe, removeRecipe, updateModifyIngredient, updateModifyStep, updateModifyTitle, suppressIngredientFromModify, suppressStepFromModify, cancelTitleChange, cancelStepChange, cancelIngredientChange } = recipeSlice.actions

export const { changeCurrentModify, cleanCurrentModify } = modifySlice.actions

