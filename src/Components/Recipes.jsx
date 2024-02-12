import React from 'react'
import Recipe from './Recipe'

export default function Recipes({ recipes }) {
  return (
    <>
        {recipes.map((recipe, index) => <Recipe recipe={recipe} key={index}/>)}
    </>
  )
}
