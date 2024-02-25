import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit"
import { Recipe } from "../../Components/Recipe"

// interface PayloadParams {
//     modify: number,
//     currentIndex?: number,
//     ingredient?: string,
//     step?: string,
//     title?: string
// }

interface PayloadParamsWithTitle {
    modify: number,
    title: string
}

interface PayloadParamsWithIndex {
    modify: number,
    currentIndex: number,
}

interface PayloadParamsWithIndexAndIngredient {
    modify: number,
    currentIndex: number,
    ingredient: string,
}

interface PayloadParamsWithIndexAndStep {
    modify: number,
    currentIndex: number,
    step: string,
}

// const initialState: Recipe[] = []
// TypeScript doit reconnître de type de l'état donc le précise en créant une constante du bon type (Recipe[] en l'occurence)


// Variables de test. initialState3 (à la suite de recipeSample)
// est à mettre à la place de initialState dans  recipeSlice


const recipeSample: Recipe = {
        recipe: {
                    cookingTitle: "LE GÂTEAU AU CHOCOLAT",
                    ingredients: [
                        "1 tablette de chocolat noir",
                        "3 oeufs",
                        "100 g de farine",
                        "100 g de beurre",
                        "80 g de sucre",
                        "1 sachet de levure chimique"
                    ],
                    steps: [
                        "Préchauffez votre four à 180° C. Faire fondre le chocolat avec le beurre au micro-ondes 2 minutes à 500W.",
                        "Dans un saladier, mélangez la farine, les oeufs, le sucre et la levure puis incorporez le chocolat fondu. La pâte doit avoir une consistance onctueuse.",
                        "Versez-la dans un moule beurré et fariné. Faites cuire dans votre four durant 25 minutes."
                    ]
                },
        clicked: true,
        modify: {
        cookingTitle: "LE GÂTEAU AU CHOCOLAT",
        ingredients: [
            "1 tablette de chocolat noir",
            "3 oeufs",
            "100 g de farine",
            "100 g de beurre",
            "80 g de sucre",
            "1 sachet de levure chimique"
        ],
        steps: [
            "Préchauffez votre four à 180° C. Faire fondre le chocolat avec le beurre au micro-ondes 2 minutes à 500W.",
            "Dans un saladier, mélangez la farine, les oeufs, le sucre et la levure puis incorporez le chocolat fondu. La pâte doit avoir une consistance onctueuse.",
            "Versez-la dans un moule beurré et fariné. Faites cuire dans votre four durant 25 minutes."
        ]
    }
}

const initialState: Recipe[] = [recipeSample, recipeSample, recipeSample]

// Slice qui gère l'état de la liste des recettes
export const recipeSlice: Slice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        /**
         * @param state Désigne l'état (ou une partie de l'état) de notre application //
         * @param action Désigne le type d'action qui peut mettre à jour l'état avec ou une données reçues //
         * 
         * 
         * @public
         * Répérer le moment où une recette est cliquée et changer son état clicked en conséquence pour que 
         * la recette s'étende ou se rétracte
         */
        recipeClicked: (state: Recipe[], action: PayloadAction<number>): Recipe[] => {
            return state.map((recipe: Recipe, index: number): Recipe =>            
                action.payload === index
                ? {...recipe, clicked: !recipe.clicked} 
                : recipe
            )
        },
        /**
         * @param state Désigne l'état (ou une partie de l'état) de notre application //
         * @param action Désigne le type d'action qui peut mettre à jour l'état avec ou une données reçues //
         * 
         * @public
         *  Ajouter une nouvelle recette à la liste
         */
        addRecipe: (state: Recipe[], action: PayloadAction<Recipe>): Recipe[] => {
            return [...state, action.payload]
        },
        /**
         * @param state Désigne l'état (ou une partie de l'état) de notre application //
         * @param action Désigne le type d'action qui peut mettre à jour l'état avec ou une données reçues //
         * 
         * @public
         *  Modifier la valeur de toutes les modifications effectuées sur une recette, ses ingrédients et ses étapes 
         */
        updateRecipe: (state: Recipe[], action: PayloadAction<number>): Recipe[] => {
            return state.map((recipe: Recipe, index: number): Recipe => 
                index === action.payload 
                ? {...recipe, recipe: {...recipe.modify}} 
                : recipe)
        },
        /**
         * @param state Désigne l'état (ou une partie de l'état) de notre application //
         * @param action Désigne le type d'action qui peut mettre à jour l'état avec ou une données reçues //
         * 
         * @public
         *  Réinitialiser les valeurs de la recette par rapport des des changements
         */
        resetModifyOfRecipe: (state: Recipe[], action: PayloadAction<number>): Recipe[] => {
            return state.map((recipe: Recipe, index: number): Recipe => 
                index === action.payload 
                ? {...recipe, modify: {...recipe.recipe}} 
                : recipe)
        },
        /**
         * @param state Désigne l'état (ou une partie de l'état) de notre application //
         * @param action Désigne le type d'action qui peut mettre à jour l'état avec ou une données reçues //
         * 
         * @public
         *  Supprimer une recette de l'ensemble des recettes
         */
        // 
        removeRecipe: (state: Recipe[], action: PayloadAction<number>): Recipe[] => {
            return state.filter((recipe: Recipe, index: number): boolean => index !== action.payload)
        },
        /**
         * @param state Désigne l'état (ou une partie de l'état) de notre application //
         * @param action Désigne le type d'action qui peut mettre à jour l'état avec ou une données reçues //
         * 
         * @public
         *  Changer le titre d'une recette à la modification de la recette
         */
        updateModifyTitle: (state: Recipe[], action: PayloadAction<PayloadParamsWithTitle>): Recipe[] => {
            return state.map((recipe: Recipe, index: number): Recipe => 
                index === action.payload.modify
                ? {...recipe, 
                    modify: {...recipe.modify, cookingTitle: action.payload.title}}
                : recipe)
        },
        /**
         * @param state Désigne l'état (ou une partie de l'état) de notre application //
         * @param action Désigne le type d'action qui peut mettre à jour l'état avec ou une données reçues //
         * 
         * @public
         *  Changer un ingrédient d'une recette à la modification de la recette
         */
        updateModifyIngredient: (state: Recipe[], action: PayloadAction<PayloadParamsWithIndexAndIngredient>): Recipe[] => {
            return state.map((recipe: Recipe, index: number): Recipe => 
                index === action.payload.modify 
                ? {...recipe, 
                    modify: {...recipe.modify, ingredients: recipe.modify.ingredients.map((element: string, index2: number): string => 
                        index2 === action.payload.currentIndex 
                        ? action.payload.ingredient 
                        : element)}}
                : recipe)
        },
        /**
         * @param state Désigne l'état (ou une partie de l'état) de notre application //
         * @param action Désigne le type d'action qui peut mettre à jour l'état avec ou une données reçues //
         * 
         * @public
         *   Changer une étape de recette à la modification de la recette
         */
        updateModifyStep: (state: Recipe[], action: PayloadAction<PayloadParamsWithIndexAndStep>): Recipe[] => {
            return state.map((recipe: Recipe, index: number): Recipe => 
                index === action.payload.modify 
                ? {...recipe, 
                    modify: {...recipe.modify, steps: recipe.modify.steps.map((element: string, index2: number): string => 
                        index2 === action.payload.currentIndex 
                        ? action.payload.step 
                        : element)}}
                : recipe)
        },
        /**
         * @param state Désigne l'état (ou une partie de l'état) de notre application //
         * @param action Désigne le type d'action qui peut mettre à jour l'état avec ou une données reçues //
         * 
         * @public
         *  Suppimer un ingrédient d'une recette à la modification
         */
        suppressIngredientFromModify: (state: Recipe[], action: PayloadAction<PayloadParamsWithIndex>): Recipe[] => {
            return state.map((recipe: Recipe, index: number): Recipe => 
                index === action.payload.modify 
                ? {...recipe, 
                    modify: {...recipe.modify, ingredients: recipe.modify.ingredients.filter((element: string, index2: number): boolean => 
                        index2 !== action.payload.currentIndex)}}
                : recipe)
        },
        /**
         * @param state Désigne l'état (ou une partie de l'état) de notre application //
         * @param action Désigne le type d'action qui peut mettre à jour l'état avec ou une données reçues //
         * 
         * @public
         *  Suppimer une étape de recette à la modification
         */
        suppressStepFromModify: (state: Recipe[], action: PayloadAction<PayloadParamsWithIndex>): Recipe[] => {
            return state.map((recipe: Recipe, index: number): Recipe => 
                index === action.payload.modify 
                ? {...recipe, 
                    modify: {...recipe.modify, steps: recipe.modify.steps.filter((element: string, index2: number): boolean => 
                        index2 !== action.payload.currentIndex)}}
                : recipe)
        },
        /**
         * @param state Désigne l'état (ou une partie de l'état) de notre application //
         * @param action Désigne le type d'action qui peut mettre à jour l'état avec ou une données reçues //
         * 
         * @public
         *   Annuler le changement du titre d'une recette
         */
        cancelTitleChange: (state: Recipe[], action: PayloadAction<number>): Recipe[] => {
            return state.map((recipe: Recipe, index: number): Recipe => 
                index === action.payload
                ? {...recipe, modify: {...recipe.modify, cookingTitle: recipe.recipe.cookingTitle}} 
                : recipe) 
        },
        /**
         * @param state Désigne l'état (ou une partie de l'état) de notre application //
         * @param action Désigne le type d'action qui peut mettre à jour l'état avec ou une données reçues //
         * 
         * @public
         *   Annuler le changement d'un ingrédient particulier de l'état des recettes
         */
        cancelIngredientChange: (state: Recipe[], action: PayloadAction<PayloadParamsWithIndex>): Recipe[] => {
            return state.map((recipe: Recipe, index: number): Recipe => 
                index === action.payload.modify 
                ? {...recipe, modify: {...recipe.modify, ingredients: recipe.modify.ingredients.map((ingredient: string, index2: number): string => 
                    index2 === action.payload.currentIndex 
                    ? recipe.recipe.ingredients[index2] 
                    : ingredient)}} 
                : recipe)
        },
        /**
         * @param state Désigne l'état (ou une partie de l'état) de notre application //
         * @param action Désigne le type d'action qui peut mettre à jour l'état avec ou une données reçues //
         * 
         * @public
         *   Annuler le changement d'une étape particulière de l'état des recettes
         */
        cancelStepChange: (state: Recipe[], action: PayloadAction<PayloadParamsWithIndex>): Recipe[] => {
            return state.map((recipe: Recipe, index: number): Recipe => 
                index === action.payload.modify 
                ? {...recipe, modify: {...recipe.modify, steps: recipe.modify.steps.map((ingredient: string ,index2: number): string => 
                    index2 === action.payload.currentIndex 
                    ? recipe.recipe.steps[index2] 
                    : ingredient)}} 
                : recipe)
        }
    }
})

const initialState2: number[] = []

// Slice qui gère l'état de la recette à modifier (id)
export const modifySlice: Slice = createSlice({
    name: "currentModify",
    initialState: initialState2,
    reducers: {
        /**
         * @param state Désigne l'état (ou une partie de l'état) de notre application //
         * @param action Désigne le type d'action qui peut mettre à jour l'état avec ou une données reçues //
         * 
         * @public
         *   Identifier l'id de la recette à modifier
         */
        changeCurrentModify: (state: number[], action: PayloadAction<number>): number[] => {
            return [action.payload]
        },
        /**
         * @param state Désigne l'état (ou une partie de l'état) de notre application //
         * @param action Désigne le type d'action qui peut mettre à jour l'état avec ou une données reçues //
         * 
         * @public
         *   Eliminer l'id de l'état s'il n'y a rien à modifier
         */
        cleanCurrentModify: (state: number[], action: PayloadAction<void>): [] => {
            return []
        }
    }
})


// Export des actions à réaliser sur l'état
export const {recipeClicked, addRecipe, updateRecipe, resetModifyOfRecipe, removeRecipe, updateModifyIngredient, updateModifyStep, updateModifyTitle, suppressIngredientFromModify, suppressStepFromModify, cancelTitleChange, cancelStepChange, cancelIngredientChange } = recipeSlice.actions

export const { changeCurrentModify, cleanCurrentModify } = modifySlice.actions

