import { ChangeEvent } from "react"

type InputModifyProps = {
  value: string,
  onChange: (e: ChangeEvent) => void
  onStop: () => void
  onSuppress: () => void
}

export default function InputModify({ value, onChange, onStop, onSuppress }: InputModifyProps) {
  return (
    <>
        <input type="text" value={value} onChange={onChange}/>
        {/* <button onClick={onModify}>Valider</button> */}
        <button onClick={onSuppress} type="button">Supprimer</button>
        <button onClick={onStop} type="button">Annuler</button>
    </>
  )
}
