
import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>{children}</button>
  )
}

export default function App() {
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);
  const [ friends, setFriends ] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null); 

  function handleAddFriend() {
    setShowAddFriendForm((show) => !show)
  }

  function handleAddNewFriend(friend) {
    setFriends((friends) => [...friends, friend ]);
    setShowAddFriendForm(false)
  }

  function handleSelectFriend(friend) {
    // setSelectedFriend(friend)
    setSelectedFriend((selected) => {
      if(selected && selected.id === friend.id) {
        return null
      }
      return friend
    })
    setShowAddFriendForm(false)
  }
  return (
    <div className="app">
        <div className="sidebar">
          <FriendList friends={friends} onSelection={handleSelectFriend} selectedFriend={selectedFriend}/>
          { showAddFriendForm && <FormAddFriend onAddNewFriend={handleAddNewFriend}/>}

          <Button onClick={handleAddFriend}>
            {
              showAddFriendForm ? 'Close' : 'Add friend' 
            }
         </Button>
        </div>
        { selectedFriend && <FormSplitBill selectedFriend={ selectedFriend }/>}
    </div>
  )
}

function FriendList({ friends, onSelection, selectedFriend}) {
  return (
    <ul>
    {
      friends.map(friend => <Friend key={friend.id} friend={friend} onSelection={onSelection} selectedFriend={selectedFriend}/>)
    }
    </ul>
  )
}

function Friend({ friend, onSelection, selectedFriend }) {
const isSelected = selectedFriend?.id === friend.id
  return(
    <li className={ isSelected ? 'selected': ''}> 
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      
        {friend.balance < 0  && (
          <p className="red">You owe {friend.name} ${Math.abs(friend.balance)}</p>
        )}
        {friend.balance > 0  && (
          <p className="green">{friend.name} owes you ${Math.abs(friend.balance)}</p>
        )}
        {friend.balance === 0  && (
          <p>You and {friend.name} are even</p>
        )}
        <Button onClick={() => onSelection(friend)}>{ isSelected ? 'Close' : 'Selected' }</Button>
    </li>
  )
}

function FormAddFriend({ onAddNewFriend}) {
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

function FormSplitBill({ selectedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>Split bill with {selectedFriend.name}</h2>
      <label>💸 Total amount</label>
      <input type="text" />

      <label>🙍‍♂️ Your expense</label>
      <input type="text" />

      <label>👬 {selectedFriend.name}'s expense</label>
      <input type="text" disabled/>


      <label>🤣 Who is paying the bill?</label>
      <select>
        <option value="you">You</option>
        <option value="friend">{ selectedFriend.name} </option>
      </select>

      <Button>Split bill</Button>
    </form>
  )
}