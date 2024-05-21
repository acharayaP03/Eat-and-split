import { useState } from "react";
import Button from "../resuablesUi/Button"

export default function FormSplitBill({ selectedFriend, onSplitBill }) {
    const [bill, setBill] = useState("") 
    const [yourExpense, setYourExpense] = useState('')
    const [ whoIsPaying, setWhoIsPaying ] = useState('user') 

    const friendExpense = bill ? bill - yourExpense : '';


    function handleSubmit(e) {
        e.preventDefault()
        onSplitBill( whoIsPaying === 'you' ? friendExpense : -yourExpense)
    }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split bill with {selectedFriend.name}</h2>
      <label>💸 Total amount</label>
      <input type="text" value={bill} onChange={e => setBill(Number(e.target.value))}/>

      <label>🙍‍♂️ Your expense</label>
      <input type="text" value={yourExpense} onChange={(e) => setYourExpense(Number(e.target.value) > bill ? yourExpense : Number(e.target.value))}/>

      <label>👬 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={friendExpense}/>


      <label>🤣 Who is paying the bill?</label>
      <select value={whoIsPaying} onChange={e => setWhoIsPaying(e.target.value)}>
        <option value="you">You</option>
        <option value="friend">{ selectedFriend.name} </option>
      </select>

      <Button>Split bill</Button>
    </form>
  )
}