import { ChangeEvent, useState } from 'react';
import './App.css';
// Import des hooks de redux pour récupérer l'état (useAppSelector) et modifier l'état (useAppDispatch)
import { useAppDispatch, useAppSelector } from './State/Store/hooks';
import InputLabel from './Components/InputLabel';
import InputModify from './Components/InputModify';
import Recipes from './Components/Recipes';

// Imports des types créés
import type { PrimaryRecipe, Recipe } from './Components/Recipe';

// Import de l'ensembles des fonctions d'actions du Reducer
import { addRecipe, updateRecipe, updateModifyIngredient, updateModifyStep, updateModifyTitle, suppressIngredientFromModify, suppressStepFromModify, cancelStepChange, cancelIngredientChange, cancelTitleChange, cleanCurrentModify, resetModifyOfRecipe } from "./State/Reducers/reducers"
import { RootState } from './State/Store/store';

// Import d'icônes
import Plus from "./Images/plus.svg"
import Cancel from "./Images/forbidden.svg"


type Form = {
    cookingTitle: string,
    currentIngredient: string,
    ingredients: string[],
    currentStep: string,
    steps: string[]
}

function App() {
    // 
    const defaultForm: Form = {
        cookingTitle: "",
        currentIngredient: "",
        ingredients: [],
        currentStep: "",
        steps: []
    }

    const [form, setForm] = useState<Form>(defaultForm)

    // Appel de la fonction d'exécution d'actions
    const dispatch = useAppDispatch()

    // Récupération de la tâche à modifier de l'état (id)
    const toModify: number[] = useAppSelector((state: RootState) => state.currentModify)

    // Récupération des recettes de l'état
    const recipes: Recipe[] = useAppSelector((state: RootState) => state.recipes)

    const addIngredient = (ingredient: string) => {
        ingredient && setForm({...form, ingredients: [...form.ingredients, ingredient], currentIngredient: ""})
    }

    const addStep = (step: string) => {
        step && setForm({...form, steps: [...form.steps, step], currentStep: ""})
    }

    const handleSubmit = (e: React.MouseEvent<HTMLInputElement, MouseEvent>, form: Form) => {
        e.preventDefault()
        if(form.cookingTitle){
            const formItems: PrimaryRecipe = {
                cookingTitle: form.cookingTitle,
                ingredients: form.ingredients,
                steps: form.steps
            }
            const newRecipe: Recipe = {
                recipe: formItems, 
                clicked: false, 
                modify: formItems
            }
            dispatch(addRecipe(newRecipe))
            setForm(defaultForm)
        }
    }

    const modifyClicked = (e: React.MouseEvent<HTMLInputElement, MouseEvent>, index: number) => {
        e.preventDefault()
        dispatch(updateRecipe(index))
        dispatch(cleanCurrentModify(""))
    }

    const cancelModifications = (e: React.MouseEvent<HTMLInputElement, MouseEvent>, index: number) => {
        e.preventDefault()
        dispatch(resetModifyOfRecipe(index))
        dispatch(cleanCurrentModify(""))
    }

    return (
        <div className="App">

            <div className="top">
              <h1>Recipes</h1>
              <p>Votre carnet virtuel pour regrouper l'ensemble de vos recettes et celles que vos amis vous auront passées 😊.</p>
            </div>
            <div className="bottom">

                <form className="left" style={!recipes.length ? {width: "100%"} : {width: "60%"}}>
                    {/* Input pour l'insertion du titire de la préparation */}
                    <div className="title">
                    <InputLabel
                        id="cooking"
                        label="Préparation"
                        value={!toModify.length ? form.cookingTitle : recipes[toModify[0]].modify.cookingTitle}
                        onChange={(e: ChangeEvent) => !toModify.length ? setForm({...form, cookingTitle: (e.target as HTMLInputElement).value}) : dispatch(updateModifyTitle({modify: toModify[0], title: (e.target as HTMLInputElement).value}))}
                    />
                    {toModify.length ? <img src={Cancel} alt="canceler" onClick={() => dispatch(cancelTitleChange(toModify[0]))} width="30px" height="30px" /> : <></>}
                    </div>

                    <div className="submit">
                        <input type="submit" value={!toModify.length ? "Ajouter une recette" : "Modifier la recette"} onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => !toModify.length ? handleSubmit(e, form) : modifyClicked(e, toModify[0])}/>
                        {toModify.length 
                            ? <input type="submit" value="Annuler la modification" onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => cancelModifications(e,toModify[0])}/>
                            : <></>
                        }
                    </div>

                    {!toModify.length ?
                        <div className="inputs">
                        {/* Inputs par défaut du formlaire pour insérer les ingrédients et les étapes */}
                            <div className="addingredients">
                                <div className="inputimage">
                                    <InputLabel
                                        id="ingredients"
                                        label="Ingrédients"
                                        value={form.currentIngredient}
                                        onChange={(e: ChangeEvent) => setForm({...form, currentIngredient: (e.target as HTMLInputElement).value})}
                                    />
                                    <img src={Plus} alt="plus" width="30" height="30" onClick={() => addIngredient(form.currentIngredient)}/>
                                </div>

                                {/* Affichage des ingrédients liés à la nouvelle recette */}
                                {form.ingredients.length ? <ul>{form.ingredients.map((ingredient,index) => <li key={index}>{ingredient}</li>)}</ul> : <></>}
                            </div>

                            <div className="addsteps">
                                <div className="inputimage">
                                    <InputLabel
                                        id="step"
                                        label={`Etape ${form.steps.length + 1}`}
                                        value={form.currentStep}
                                        onChange={(e: ChangeEvent) => setForm({...form, currentStep: (e.target as HTMLInputElement).value})}
                                    />
                                    <img src={Plus} alt="plus" onClick={() => addStep(form.currentStep)} width="30" height="30"/>
                                </div>
                                {/* Affichage des étapes à suivre pr rapport à la nouvelle recette */}
                                {form.steps.length ? <ul>{form.steps.map((step,index) => <li key={index}>{step}</li>)}</ul> : <></>}

                            </div>
                        </div>
                        :
                        <div className="modify">
                        {/* Inputs à prendre en considération si l'utilisateur souhaite modifier une recette */}
                            
                            {/* Affichage des ingrédients correspondant à la recette à modifier */}
                            <b>Ingrédients:</b>
                            {recipes[toModify[0]].modify.ingredients.map((ingredient: string, index: number) => 
                                    <InputModify
                                        value={ingredient}
                                        onChange={(e: ChangeEvent) => dispatch(updateModifyIngredient({modify: toModify[0], ingredient: (e.target as HTMLInputElement).value, currentIndex: index}))} 
                                        onSuppress={() => dispatch(suppressIngredientFromModify({modify: toModify[0], currentIndex: index}))}
                                        onStop={() => dispatch(cancelIngredientChange({modify: toModify[0], currentIndex: index}))}
                                    />
                            )}
                            {/* Affichage des étapes correspondant à la recette à modifier */}
                            <b>Etapes:</b>
                            {recipes[toModify[0]].modify.steps.map((step: string, index: number) =>
                                <InputModify
                                    value={step}
                                    onChange={(e: ChangeEvent) => dispatch(updateModifyStep({modify: toModify[0], step: (e.target as HTMLInputElement).value, currentIndex: index}))}                              
                                    onSuppress={() => dispatch(suppressStepFromModify({modify: toModify[0], currentIndex: index}))}
                                    onStop={() => dispatch(cancelStepChange({modify: toModify[0], currentIndex: index}))}
                                />
                            )}
                        </div>
                      }                       
                                        
                    

                    {/* {`${form.cookingTitle} ${form.currentIngredient} ${form.currentStep}`} */}

                </form>

                {/* Apparition des recettes lorsque l'état est différent d'un tableau vide */}
                {/* {recipes &&  */}
                    <div className="right" style={!recipes.length ? {display: "none"} :  {display: "flex"}}>
                        <Recipes />
                    </div>
                {/* // } */}
            </div>
        </div>
    );
}

export default App;
