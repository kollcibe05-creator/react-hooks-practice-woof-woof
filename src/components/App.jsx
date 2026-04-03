import React, { useEffect, useState } from "react";

function App() {
const [dogs, setDogs] = useState([])
const [selectedDogId, setselectedDogId]  = useState(null)
const [isFiltered, setIsFiltered] = useState(false)

const displayedDog = dogs.find(dog => dog.id === selectedDogId)
const filteredPups = dogs.filter(dog => {
  if (isFiltered === true) {
    return dog.isGoodDog === true
  }else{
    return true
  }
})

  useEffect(() => {
    fetch("http://localhost:3001/pups")
    .then(r => r.json())
    .then(data => {
      setDogs(data)
      if (data.length > 0) setselectedDogId(data[0].id)
    })
  }, []) 
  function handlePatch (id,state) {
      fetch(`http://localhost:3001/pups/${id}`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json", 
          "Accept": "application/json"
        }, 
        body: JSON.stringify({isGoodDog: state})
      })
      .then(r => r.json())
      .then(updatedDog => {
        const updatedDogs = dogs.map(dog => dog.id === updatedDog.id ? updatedDog : dog)
        setDogs(updatedDogs)
      })

  }
  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter" onClick={() => setIsFiltered(isFiltered => !isFiltered)}>{isFiltered ? "Filter good dogs: ON" : "Filter good dogs: OFF"}</button>
      </div>
      <div id="dog-bar">
        {filteredPups.map(dog => <span key={dog.id} onClick={() => setselectedDogId(dog.id)}>{dog.name}</span>)}
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        {displayedDog && 
        <div id="dog-info">
            <img src={displayedDog.image} alt={displayedDog.name}/>
            <h2>{displayedDog.name}</h2>
            <button onClick={() => handlePatch(displayedDog.id,!displayedDog.isGoodDog)}>{displayedDog.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
        </div>  
        }
      </div>
    </div>
  );
}

export default App;
