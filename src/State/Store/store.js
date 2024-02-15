import { recipeSlice, modifySlice} from "../Reducers/reducers"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer: {
        recipes: recipeSlice.reducer,
        currentModify: modifySlice.reducer
    }
})