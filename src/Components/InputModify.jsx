import React from 'react'

export default function InputModify({ value, onChange, onStop, onSuppress }) {
  return (
    <>
        <input type="text" value={value} onChange={onChange}/>
        {/* <button onClick={onModify}>Valider</button> */}
        <button onClick={onSuppress} type="button">Supprimer</button>
        <button onClick={onStop} type="button">Annuler</button>
    </>
  )
}
