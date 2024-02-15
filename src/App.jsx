import { useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from "react-redux"
import InputLabel from './Components/InputLabel';
import InputModify from './Components/InputModify';
import Recipes from './Components/Recipes';
import { addRecipe, updateRecipe, updateModifyIngredient, updateModifyStep, updateModifyTitle, suppressIngredientFromModify, suppressStepFromModify, cancelStepChange, cancelIngredientChange, cancelTitleChange, cleanCurrentModify, updateModifyOfRecipe } from "./State/Reducers/reducers"

function App() {
    const [form, setForm] = useState({
      cookingTitle: "",
      currentIngredient: "",
      ingredients: [],
      currentStep: "",
      steps: []
    })

    const dispatch = useDispatch()

    const toModify = useSelector((state) => state.currentModify)
    console.log(toModify)

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
        console.log(form)
    }

    const modifyClicked = (e, index) => {
        e.preventDefault()
        dispatch(updateRecipe(index))
        dispatch(cleanCurrentModify())
    }

    const cancelModifications = (e, index) => {
        e.preventDefault()
        dispatch(updateModifyOfRecipe(index))
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
                    <InputLabel
                        id="cooking"
                        label="Préparation"
                        value={!toModify.length ? form.cookingTitle : recipes[toModify[0]].modify.cookingTitle}
                        onChange={(e) => !toModify.length ? setForm({...form, cookingTitle: e.target.value}) : dispatch(updateModifyTitle({modify: toModify[0], title: e.target.value}))}
                    />
                    {toModify.length ? <button type="button" onClick={() => dispatch(cancelTitleChange(toModify[0]))}>Annuler</button> : <></>}

                    {!toModify.length ?
                        <>
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
                            {recipes[toModify[0]].modify.ingredients.map((ingredient,index) => 
                                    <InputModify
                                        value={ingredient}
                                        onChange={(e) => dispatch(updateModifyIngredient({modify: toModify[0], ingredient: e.target.value, currentIndex: index}))} 
                                        onSuppress={() => dispatch(suppressIngredientFromModify({modify: toModify[0], currentIndex: index}))}
                                        onStop={() => dispatch(cancelIngredientChange({modify: toModify[0], currentIndex: index}))}
                                    />
                            )}

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
                    
                    <ul>{form.ingredients.map((ingredient,index) => <li key={index}>{ingredient}</li>)}</ul>
                    <ul>{form.steps.map((step,index) => <li key={index}>{step}</li>)}</ul>

                    <input type="submit" value={!toModify.length ? "Ajouter une recette" : "Modifier la recette"} onClick={(e) => !toModify.length ? handleSubmit(e, form) : modifyClicked(e, toModify[0])}/>
                    {toModify.length &&
                        <input type="submit" value="Annuler la modification" onClick={(e) => cancelModifications(e,toModify[0])}/>
                    }

                    {`${form.cookingTitle} ${form.currentIngredient} ${form.currentStep}`}

                </form>

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
