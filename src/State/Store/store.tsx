// Import des slices du reducer
import { recipeSlice, modifySlice} from "../Reducers/reducers"
import { configureStore } from "@reduxjs/toolkit"

// Configuration du store (magasin de ressources) à partir des slices du Reducer
export const store = configureStore({
    reducer: {
        recipes: recipeSlice.reducer,
        currentModify: modifySlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch