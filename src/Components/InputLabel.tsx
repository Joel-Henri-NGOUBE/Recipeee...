import { ChangeEvent } from "react"

type InputLabelProps = {
    id: string,
    label: string,
    value: string,
    onChange: (e: ChangeEvent) => void
}

export default function InputLabel({ id, label, value, onChange }: InputLabelProps) {
  return (
    <div className="inputlabel">
        <label htmlFor={id}>{label}</label>
        <input type="text" id={id} value={value} onChange={onChange} />
    </div>
  )
}
