
import { useState } from "react";
import Button from "./resuablesUi/Button";
import FormSplitBill from "./components/FormSplitBill";
import FormAddFriend from "./components/FormAddFriend";
import FriendList from "./components/FriendList";
import { initialFriends } from "./data";

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
    setSelectedFriend((selected) => {
      if(selected && selected.id === friend.id) {
        return null
      }
      return friend
    })
    setShowAddFriendForm(false)
  }

  function handleSplitBill(splitBill) {
    setFriends((friends) => friends.map((friend) => {
      if(friend.id === selectedFriend.id) {
        return {
          ...friend,
          balance: friend.balance + splitBill
        }
      }
      setSelectedFriend(null)
    }))

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
        { selectedFriend && <FormSplitBill selectedFriend={ selectedFriend } onSplitBill={handleSplitBill}/>}
    </div>
  )
}