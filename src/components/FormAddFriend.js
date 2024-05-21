
import { useState } from "react"
import Button from "../resuablesUi/Button";

export default function FormAddFriend({ onAddNewFriend }) {

  const [name, setName] = useState('')
  const [image, setImage] = useState('https://i.pravatar.cc/48')  


  function handleSubmit(e){
    e.preventDefault()

    if(!name || !image) {
      return
    }

    const id = crypto.randomUUID();

    const newFriend = {
      id,
      name,
      image: `${image}?u=${id}`,
      balance: 0
    }
    onAddNewFriend(newFriend)
    setName('')
    setImage('https://i.pravatar.cc/48')

  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👬 Friend name</label>
      <input type="text" value={name} onChange={e => setName(e.target.value)}/>

      <label>🌆 Image url</label>
      <input type="text" value={image} onChange={e => setImage(e.target.value)}/>
      <Button>Add friend</Button>
    </form>
  )
}