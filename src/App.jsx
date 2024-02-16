import { useState } from 'react';
import './App.css';
// Import des hooks de redux pour récupérer l'état (useSelector) et modifier l'état (useDispatch)
import { useDispatch, useSelector } from "react-redux"
import InputLabel from './Components/InputLabel';
import InputModify from './Components/InputModify';
import Recipes from './Components/Recipes';

// Import de l'ensembles des fonctions d'actions du Reducer
import { addRecipe, updateRecipe, updateModifyIngredient, updateModifyStep, updateModifyTitle, suppressIngredientFromModify, suppressStepFromModify, cancelStepChange, cancelIngredientChange, cancelTitleChange, cleanCurrentModify, resetModifyOfRecipe } from "./State/Reducers/reducers"

function App() {
    // 
    const [form, setForm] = useState({
      cookingTitle: "",
      currentIngredient: "",
      ingredients: [],
      currentStep: "",
      steps: []
    })

    // Appel de la fonction d'exécution d'actions
    const dispatch = useDispatch()

    // Récupération de la tâche à modifier de l'état (id)
    const toModify = useSelector((state) => state.currentModify)

    // Récupération des recettes de l'état
    const recipes = useSelector((state) => state.recipes)

    const addIngredient = (ingredient) => {
        setForm({...form, ingredients: [...form.ingredients, ingredient]})
    }

    const addStep = (step) => {
        setForm({...form, steps: [...form.steps, step]})
    }

    const handleSubmit = (e, form) => {
        e.preventDefault()
        const newRecipe = {recipe: form, clicked: false, modify: form}
        dispatch(addRecipe(newRecipe))
        setForm({
            cookingTitle: "",
            currentIngredient: "",
            ingredients: [],
            currentStep: "",
            steps: []
          })
    }

    const modifyClicked = (e, index) => {
        e.preventDefault()
        dispatch(updateRecipe(index))
        dispatch(cleanCurrentModify())
    }

    const cancelModifications = (e, index) => {
        e.preventDefault()
        dispatch(resetModifyOfRecipe(index))
        dispatch(cleanCurrentModify())
    }

    return (
        <div className="App">

            <div className="top">
              <h1>Recipes</h1>
              <p>Votre carnet virtuel pour regrouper l'ensemble de vos recettes et celles que vos amis vous auront passées 😊.</p>
            </div>
            <div className="bottom">

                <form  className="left">
                    {/* Input pour l'insertion du titire de la préparation */}
                    <InputLabel
                        id="cooking"
                        label="Préparation"
                        value={!toModify.length ? form.cookingTitle : recipes[toModify[0]].modify.cookingTitle}
                        onChange={(e) => !toModify.length ? setForm({...form, cookingTitle: e.target.value}) : dispatch(updateModifyTitle({modify: toModify[0], title: e.target.value}))}
                    />
                    {toModify.length ? <button type="button" onClick={() => dispatch(cancelTitleChange(toModify[0]))}>Annuler</button> : <></>}

                    {!toModify.length ?
                        <>
                        {/* Inputs par défaut du formlaire pour insérer les ingrédients et les étapes */}

                            <InputLabel
                                id="ingredients"
                                label="Ingrédients"
                                value={form.currentIngredient}
                                onChange={(e) => setForm({...form, currentIngredient: e.target.value})}
                            />
                            <button onClick={() => addIngredient(form.currentIngredient)} type="button">AddIngredient</button>
                            
                            <InputLabel
                                id="step"
                                label={`Etape ${form.steps.length + 1}`}
                                value={form.currentStep}
                                onChange={(e) => setForm({...form, currentStep: e.target.value})}
                            />
                            <button onClick={() => addStep(form.currentStep)} type="button">AddStep</button>

                        </>
                        :
                        <>
                        {/* Inputs à prendre en considération si l'utilisateur souhaite modifier une recette */}
                            
                            {/* Affichage des ingrédients correspondant à la recette à modifier */}
                            {recipes[toModify[0]].modify.ingredients.map((ingredient,index) => 
                                    <InputModify
                                        value={ingredient}
                                        onChange={(e) => dispatch(updateModifyIngredient({modify: toModify[0], ingredient: e.target.value, currentIndex: index}))} 
                                        onSuppress={() => dispatch(suppressIngredientFromModify({modify: toModify[0], currentIndex: index}))}
                                        onStop={() => dispatch(cancelIngredientChange({modify: toModify[0], currentIndex: index}))}
                                    />
                            )}
                            {/* Affichage des étapes correspondant à la recette à modifier */}
                            {recipes[toModify[0]].modify.steps.map((step,index) =>
                                <InputModify
                                    value={step}
                                    onChange={(e) => dispatch(updateModifyStep({modify: toModify[0], step: e.target.value, currentIndex: index}))}                              
                                    onSuppress={() => dispatch(suppressStepFromModify({modify: toModify[0], currentIndex: index}))}
                                    onStop={() => dispatch(cancelStepChange({modify: toModify[0], currentIndex: index}))}
                                />
                            )}
                        </>
                      }                       
                    {/* Affichage des ingrédients liés à la nouvelle recette */}
                    <ul>{form.ingredients.map((ingredient,index) => <li key={index}>{ingredient}</li>)}</ul>
                    
                    {/* Affichage des étapes à suivre pr rapport à la nouvelle recette */}
                    <ul>{form.steps.map((step,index) => <li key={index}>{step}</li>)}</ul>

                    <input type="submit" value={!toModify.length ? "Ajouter une recette" : "Modifier la recette"} onClick={(e) => !toModify.length ? handleSubmit(e, form) : modifyClicked(e, toModify[0])}/>
                    {toModify.length 
                        ? <input type="submit" value="Annuler la modification" onClick={(e) => cancelModifications(e,toModify[0])}/>
                        : <></>
                    }

                    {/* {`${form.cookingTitle} ${form.currentIngredient} ${form.currentStep}`} */}

                </form>

                {/* Apparition des recettes lorsque l'état est différent d'un tableau vide */}
                {recipes && 
                    <div className="right">
                        <Recipes />
                    </div>
                }
            </div>
        </div>
    );
}

export default App;
