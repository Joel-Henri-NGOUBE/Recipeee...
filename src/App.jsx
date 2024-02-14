import { useState, useEffect } from 'react';
import './App.css';
import InputLabel from './Components/InputLabel';
import InputModify from './Components/InputModify';
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

    const [currentModify, setCurrentModify] = useState([]) // currentIndex à envoyer depuis l'enfant changer modifyClicked

    const [recipes, setRecipes] = useState([])

    // const [modifyClicked, setModifyClicked] = useState(false)

    const addIngredient = (ingredient) => {
      setForm({...form, ingredients: [...form.ingredients, ingredient]})
    }

    const addStep = (step) => {
      setForm({...form, steps: [...form.steps, step]})
    }

    const handleSubmit = (e, form) => {
        e.preventDefault()
        setRecipes([...recipes, {recipe: form, clicked: false, modify: form}])
        // console.log()
        console.log(form)
    }

    useEffect(() => {
      if(!currentModify.length){
        setCurrentIngredient("")
        setCurrentStep("")
        setForm({
          cookingTitle: "",
          ingredients: [],
          steps: []
        })
      }
    }, [recipes,currentModify])

    // useEffect(() => {
    //   if(!currentModify.length){
    //     setCurrentIngredient("")
    //     setCurrentStep("")
    //     setForm({
    //       cookingTitle: "",
    //       ingredients: [],
    //       steps: []
    //     })
    //   }
    // }, [modifyClicked])
    

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
                {/* <form onSubmit={(e) => !currentModify.length ? handleSubmit(e, form) : setModifyClicked(true)} className="left"> */}
                  {/* Remplacer les éléments aux bons endroits */}
                    <InputLabel
                        id="cooking"
                        label="Préparation"
                        value={!currentModify.length ? form.cookingTitle : recipes[currentModify[0]].modify.cookingTitle}
                        onChange={(e) => !currentModify.length ? setForm({...form, cookingTitle: e.target.value}) : setRecipes(recipes.map((recipe, index2) => 
                            index2 === currentModify[0] ? 
                            {...recipe, 
                              modify: {...recipe.modify, cookingTitle: e.target.value}
                            }
                            :
                            recipe
                            
                            ))}
                    />
                    {!currentModify.length ?
                        <>
                            <InputLabel
                                id="ingredients"
                                label="Ingrédients"
                                value={currentIngredient}
                                onChange={(e) => setCurrentIngredient(e.target.value)}
                                // onChange={(e) => setForm({...form, ingredients: [...form.ingredients, e.target.value]})}
                            />
                            <button onClick={() => addIngredient(currentIngredient)} type="button">AddIngredient</button>

                            <InputLabel
                                id="step"
                                label={`Etape ${form.steps.length + 1}`}
                                value={currentStep}
                                onChange={(e) => setCurrentStep(e.target.value)}
                                // onChange={(e) => setForm({...form, steps: [...form.steps, e.target.value]})}
                            />
                            <button onClick={() => addStep(currentStep)} type="button">AddStep</button>

                        </>
                        :
                        <>
                        {/* {console.log(recipes[currentModify[0]].modify.ingredients)} */}
                        {recipes[currentModify[0]].modify.ingredients.map((ingredient,index) => 
                                <InputModify
                                    value={ingredient}
                                    onChange={(e) => setRecipes(recipes.map((recipe, index2) => 
                                        index2 === currentModify[0] ? 
                                        {...recipe, 
                                          modify: {...recipe.modify, ingredients: recipe.modify.ingredients.map((element, index3) => 
                                            index3 === index ? e.target.value : element)}
                                        }
                                        :
                                        recipe
                                        
                                        ))} 
                                    // onModify={setRecipes(recipes.map((recipe, index2) => {index2 === currentModify ? {...recipe, modify: {...recipe.modify}} : recipe}))}
                                    onSuppress={() => setRecipes(recipes.map((recipe, index2) => index2 === currentModify[0] ? ({...recipe, modify: {...recipe.modify, ingredients: recipe.modify.ingredients.filter((element, index3) => index3 !== index)}}) : recipe))}
                                    onStop={() => setRecipes(recipes.map((recipe, index2) => index2 === currentModify[0] ? ({...recipe, modify: {...recipe.modify, ingredients: recipe.modify.ingredients.map((ingredient,index3) => index3 === index ? recipe.recipe.ingredients[index3] : ingredient)}}) : recipe))}
                                />
                        )}

                        {recipes[currentModify[0]].modify.steps.map((step,index) =>
                                  
                          <InputModify
                              value={step}
                              onChange={(e) => setRecipes(recipes.map((recipe, index2) => 
                                  index2 === currentModify[0] ? 
                                  {...recipe, 
                                    modify: {...recipe.modify, steps: recipe.modify.steps.map((element, index3) => 
                                      index3 === index ? e.target.value : element)}
                                  }
                                  :
                                  recipe
                                  ))}
                              // onModify={setRecipes(recipes.map((recipe, index2) => {index2 === currentModify ? {...recipe, recipe: {...recipe.modify}} : recipe}))}
                              onSuppress={() => setRecipes(recipes.map((recipe, index2) => index2 === currentModify[0] ? ({...recipe, modify: {...recipe.modify, steps: recipe.modify.steps.filter((element, index3) => index3 !== index)}}) : recipe))}
                              onStop={() => setRecipes(recipes.map((recipe, index2) => index2 === currentModify[0] ? ({...recipe, modify: {...recipe.modify, steps: recipe.modify.steps.map((step,index3) => index3 === index ? recipe.recipe.steps[index3] : step)}}) : recipe))}
                          />
                        )}
                              </>
                            }
                        
                    
                    <ul>{form.ingredients.map((ingredient,index) => <li key={index}>{ingredient}</li>)}</ul>
                    <ul>{form.steps.map((step,index) => <li key={index}>{step}</li>)}</ul>


                    <input type="submit" value={!currentModify.length ? "Ajouter une recette" : "Modifier la recette"} />

                    {/* onClick={(e) => {e.preventDefault();!currentModify.length && setRecipes(recipes.map((recipe, index2) => index2 === currentModify[0] ? ({...recipe, recipe: {...recipe.modify}}) : recipe))}} */}

                    {`${form.cookingTitle} ${currentIngredient} ${currentStep}`}
                </form>

                {recipes && 
                    <div className="right">
                        <Recipes 
                          recipes={recipes}
                          setRecipeList={setRecipes}
                          setCurrentModify={setCurrentModify}
                        />
                    </div>
                }
            </div>
        </div>
    );
}

export default App;
