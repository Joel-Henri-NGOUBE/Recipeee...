import { ChangeEvent } from "react"
import Delete from "../Images/remove.svg"
import Cancel from "../Images/forbidden.svg"


type InputModifyProps = {
  value: string,
  onChange: (e: ChangeEvent) => void
  onStop: () => void
  onSuppress: () => void
}

export default function InputModify({ value, onChange, onStop, onSuppress }: InputModifyProps) {
  return (
    <div className="inputmodify">
        <input type="text" value={value} onChange={onChange}/>
        {/* <button onClick={onModify}>Valider</button> */}
        <img src={Delete} alt="deleter" onClick={onSuppress} width="30" height="30" />
        <img src={Cancel} alt="canceller" onClick={onStop} width="30" height="30" />
    </div>
  )
}
