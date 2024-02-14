import React from 'react'

export default function InputLabel({ id, label, value, onChange }) {
  return (
    <>
        <label htmlFor={id}>{label}</label>
        <input type="text" id={id} value={value} onChange={onChange} />
    </>
  )
}
