import { useState } from 'react';
import './App.css';
import Input from './Components/Input';
import Recipes from './Components/Recipes';

function App() {

    const [form, setForm] = useState({
      cookingTitle: "",
      ingredients: [],
      steps: []
    })

    // console.log(form)

    const [currentIngredient, setCurrentIngredient] = useState("")

    const [currentStep, setCurrentStep] = useState("")

    const [recipes, setRecipes] = useState([])

    const addIngredient = (ingredient) => {
      setForm({...form, ingredients: [...form.ingredients, ingredient]})
    }

    const addStep = (step) => {
      setForm({...form, steps: [...form.steps, step]})
    }

    const handleSubmit = (e, form) => {
        e.preventDefault()
        setRecipes([...recipes, form])
        console.log(form)
    }

    return (
        <div className="App" 
        // onClick={() => alert('Bonjour')}
        >
            {/* <button onClick={(e) => {alert('Bonjour Stoppé'); e.stopPropagation()}}>Hey</button> */}
            <div className="top">
              <h1>Recipes</h1>
              <p>Votre carnet virtuel pour regrouper l'ensemble de vos recettes et celles que vos amis vous auront passées 😊.</p>
            </div>
            <div className="bottom">
                <form onSubmit={(e) => handleSubmit(e, form)} className="left">
                  
                    <Input
                        id="cooking"
                        label="Préparation"
                        value={form.cooking}
                        onChange={(e) => setForm({...form, cookingTitle: e.target.value})}
                    />

                    <Input
                        id="ingredients"
                        label="Ingrédients"
                        value={currentIngredient}
                        onChange={(e) => setCurrentIngredient(e.target.value)}
                        // onChange={(e) => setForm({...form, ingredients: [...form.ingredients, e.target.value]})}
                    />
                    <button onClick={() => addIngredient(currentIngredient)} type="button">AddIngredient</button>

                    <Input
                        id="step"
                        label={`Etape ${form.steps.length + 1}`}
                        value={currentStep}
                        onChange={(e) => setCurrentStep(e.target.value)}
                        // onChange={(e) => setForm({...form, steps: [...form.steps, e.target.value]})}
                    />
                    <button onClick={() => addStep(currentStep)} type="button">AddStep</button>

                    <input type="submit" value="Ajouter recette" />

                    {`${form.cooking} ${currentIngredient} ${currentStep}`}
                </form>

                {recipes && 
                    <div className="right">
                        <Recipes 
                          recipes={recipes}
                        />
                    </div>
                }
            </div>
        </div>
    );
}

export default App;